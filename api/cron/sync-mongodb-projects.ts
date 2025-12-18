/**
 * Vercel Cron Job: Sync MongoDB Projects
 * 
 * This API route runs daily via Vercel cron to:
 * 1. Fetch projects from multiple MongoDB databases (github_automation, github_automation_UTP)
 * 2. Both databases use the same collection: dataToExport
 * 3. Fetch from all databases in parallel for maximum speed
 * 4. Handle duplicates by preferring github_automation over github_automation_UTP
 * 5. Transform them to Project interface format with sourceDatabase tracking
 * 6. Check for duplicates using MongoDB id field
 * 7. Save to public/data/mongodb-projects.json
 */

import { promises as fs } from 'fs';
import path from 'path';
import { MongoClient, Db, Collection, MongoClientOptions } from 'mongodb';
import { put, list } from '@vercel/blob';

// Inline types for Vercel request/response
type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query: Record<string, string | string[] | undefined>;
  body?: any;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  send: (data: any) => void;
  end: () => void;
};

// Inline Project type (simplified for API route)
interface Project {
  slug: string;
  name: string;
  role: string;
  quote: string;
  description: string;
  technologies: string[];
  videoPlaceholder: "purple" | "blue" | "green" | "orange" | "pink" | "teal";
  youtubeVideoId?: string;
  rating: number;
  targetAudience?: string[];
  keyFeatures?: string[];
  architectureHighlights?: string[];
  pricing?: string;
  timeline?: string;
  postDeliverySupport?: string;
  paymentMethods?: string;
  moreDetails?: string;
  developer?: string;
}

// Target databases configuration
const TARGET_DATABASES = ['github_automation', 'github_automation_UTP'];
const COLLECTION_NAME = 'dataToExport';

// MongoDB utilities (inline to avoid import issues in serverless)
let client: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    // Check if connection is still alive
    try {
      await client.db('admin').command({ ping: 1 });
      return client;
    } catch (error) {
      // Connection is dead, reset it
      console.log('⚠️  Existing MongoDB connection is dead, creating new one...');
      client = null;
    }
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Debug: Log all environment variables that start with MONGO
    const mongoVars = Object.keys(process.env)
      .filter(key => key.toUpperCase().includes('MONGO'))
      .map(key => `${key}=${process.env[key] ? '***set***' : 'NOT SET'}`);
    console.error('MongoDB environment variables:', mongoVars);
    console.error('All env vars starting with MONGO:', JSON.stringify(mongoVars, null, 2));
    throw new Error('MONGODB_URI environment variable is not set');
  }
  
  // Connection options optimized for serverless environments
  // Using very high timeouts to allow queries to take as long as needed
  const options: MongoClientOptions = {
    connectTimeoutMS: 60000, // 60 seconds to establish connection
    serverSelectionTimeoutMS: 60000, // 60 seconds to select server
    socketTimeoutMS: 0, // 0 = no timeout - allow operations to take as long as needed
    maxPoolSize: 1, // Single connection for serverless
    minPoolSize: 1,
    maxIdleTimeMS: 60000, // Close idle connections after 60 seconds
    retryWrites: true,
    retryReads: true,
    // Heartbeat frequency to keep connection alive
    heartbeatFrequencyMS: 10000,
  };
  
  client = new MongoClient(uri, options);
  await client.connect();
  return client;
}

/**
 * Fetch documents from a specific database
 */
async function fetchFromDatabase(dbName: string): Promise<{ documents: any[]; count: number }> {
  const maxRetries = 3;
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Reset connection on retry to get a fresh connection
      if (attempt > 1) {
        console.log(`   [${dbName}] 🔄 Retry attempt ${attempt}/${maxRetries}...`);
        await closeMongoConnection();
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
      
      const mongoClient = await getMongoClient();
      const database = mongoClient.db(dbName);
      const collection: Collection = database.collection(COLLECTION_NAME);
      
      console.log(`   [${dbName}] 📥 Fetching documents from ${COLLECTION_NAME} collection...`);
      const startTime = Date.now();
      
      // Fetch all documents - no timeout, let it take as long as needed
      const documents = await collection.find({}).toArray();
      
      const duration = Date.now() - startTime;
      console.log(`   [${dbName}] ✅ Fetched ${documents.length} documents in ${duration}ms`);
      
      return { documents, count: documents.length };
    } catch (error: any) {
      lastError = error;
      console.error(`   [${dbName}] ❌ Error fetching (attempt ${attempt}/${maxRetries}):`, error.message);
      
      // If it's a network error and we have retries left, continue
      if (attempt < maxRetries && (
        error.name === 'MongoNetworkTimeoutError' ||
        error.name === 'PoolClearedOnNetworkError' ||
        error.message?.includes('timeout') ||
        error.message?.includes('timed out')
      )) {
        continue;
      }
      
      // If it's not a retryable error or we're out of retries, throw
      throw error;
    }
  }
  
  throw lastError;
}

/**
 * Fetch documents from all target databases in parallel
 */
async function fetchMongoProjects(): Promise<Array<{ doc: any; sourceDatabase: string }>> {
  console.log(`\n📊 Fetching from ${TARGET_DATABASES.length} databases in parallel...`);
  const startTime = Date.now();
  
  try {
    // Fetch from all databases in parallel for maximum speed
    const fetchPromises = TARGET_DATABASES.map(async (dbName) => {
      try {
        const result = await fetchFromDatabase(dbName);
        return {
          dbName,
          documents: result.documents,
          success: true,
          count: result.count,
        };
      } catch (error: any) {
        console.error(`   [${dbName}] ❌ Failed to fetch:`, error.message);
        return {
          dbName,
          documents: [],
          success: false,
          count: 0,
          error: error.message,
        };
      }
    });
    
    const results = await Promise.all(fetchPromises);
    
    const totalDuration = Date.now() - startTime;
    let totalDocuments = 0;
    let successCount = 0;
    
    // Process results and add source database tracking
    const allDocuments: Array<{ doc: any; sourceDatabase: string }> = [];
    const seenIds = new Set<string>(); // Track duplicates across databases
    
    for (const result of results) {
      if (result.success) {
        successCount++;
        totalDocuments += result.count;
        console.log(`   [${result.dbName}] ✅ Success: ${result.count} documents`);
        
        // Add documents with source tracking, handling duplicates
        for (const doc of result.documents) {
          const docId = doc.id;
          
          // If duplicate ID exists, prefer github_automation over github_automation_UTP
          if (docId && seenIds.has(docId)) {
            // Check if we already have this from a preferred database
            const existingDoc = allDocuments.find(d => d.doc.id === docId);
            if (existingDoc) {
              // If existing is from github_automation, skip this one
              if (existingDoc.sourceDatabase === 'github_automation' && result.dbName === 'github_automation_UTP') {
                console.log(`   [${result.dbName}] ⏭️  Skipped duplicate ID: ${docId} (preferring github_automation)`);
                continue;
              }
              // If existing is from UTP and current is from github_automation, replace it
              if (existingDoc.sourceDatabase === 'github_automation_UTP' && result.dbName === 'github_automation') {
                const index = allDocuments.findIndex(d => d.doc.id === docId);
                if (index !== -1) {
                  allDocuments[index] = { doc, sourceDatabase: result.dbName };
                  console.log(`   [${result.dbName}] 🔄 Replaced duplicate ID: ${docId} (preferring github_automation)`);
                  continue;
                }
              }
            }
          }
          
          if (docId) {
            seenIds.add(docId);
          }
          allDocuments.push({ doc, sourceDatabase: result.dbName });
        }
      } else {
        console.error(`   [${result.dbName}] ❌ Failed: ${result.error}`);
      }
    }
    
    console.log(`\n📈 Fetch Summary:`);
    console.log(`   Databases: ${successCount}/${TARGET_DATABASES.length} successful`);
    console.log(`   Total documents: ${totalDocuments}`);
    console.log(`   After deduplication: ${allDocuments.length}`);
    console.log(`   Duration: ${totalDuration}ms\n`);
    
    return allDocuments;
  } catch (error: any) {
    console.error(`\n❌ Error fetching from databases:`, error);
    throw error;
  }
}

async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatName(title: string): string {
  return title
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}

function extractFirstParagraph(text: string, maxLength: number = 200): string {
  if (!text) return '';
  let cleaned = text
    .replace(/^#+\s+/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();
  const paragraphs = cleaned.split(/\n\n+/).filter(p => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || cleaned.split('\n')[0] || cleaned;
  if (firstParagraph.length > maxLength) {
    return firstParagraph.substring(0, maxLength).trim() + '...';
  }
  return firstParagraph.trim();
}

function extractOpeningParagraph(text: string, maxLength: number = 200): string {
  if (!text) return '';
  // Extract content between title (with or without #) and ## Introduction
  // Handles both markdown headings (# Title) and plain text titles
  const openingMatch = text.match(/^(?:#\s+)?[^\n]+\n\n([\s\S]*?)(?=\n##\s+Introduction)/i);
  if (openingMatch && openingMatch[1]) {
    let extracted = openingMatch[1].trim();
    // Clean up markdown formatting
    extracted = extracted
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();
    if (extracted.length > maxLength) {
      return extracted.substring(0, maxLength).trim() + '...';
    }
    return extracted;
  }
  // Fallback to extractFirstParagraph if no Introduction section found
  return extractFirstParagraph(text, maxLength);
}

/**
 * Generate a deterministic rating between 4.5-5.0 based on mongoId
 */
function generateRating(mongoId: string): number {
  if (!mongoId) return 4.75; // Default if no ID
  
  // Use mongoId as seed for consistent rating per project
  const seed = mongoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (seed % 50) / 100; // 0.00 to 0.49
  return Math.round((4.5 + random) * 10) / 10; // Round to 1 decimal: 4.5 to 4.9
}

function getVideoPlaceholder(category?: string, index: number = 0): Project['videoPlaceholder'] {
  const colors: Project['videoPlaceholder'][] = ['purple', 'blue', 'green', 'orange', 'pink', 'teal'];
  if (category) {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('scraper') || categoryLower.includes('automation')) {
      return 'blue';
    }
    if (categoryLower.includes('ai') || categoryLower.includes('ml')) {
      return 'purple';
    }
    if (categoryLower.includes('web') || categoryLower.includes('frontend')) {
      return 'green';
    }
  }
  return colors[index % colors.length];
}

function transformMongoDocument(doc: any, sourceDatabase: string, index: number = 0): MongoProject {
  const title = doc.title || '';
  const description = doc.description || '';
  const readme = doc.readme || '';
  const topics = Array.isArray(doc.topics) ? doc.topics : [];
  const category = doc.category || '';
  const slug = slugify(title) || slugify(doc.id || '') || `project-${index}`;
  const name = formatName(title) || 'Untitled Project';
  const role = category 
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : name.split(' ').slice(0, 2).join(' ');
  // Extract opening paragraph (between title and ## Introduction) for quote
  const quote = description || extractOpeningParagraph(readme, 150);
  // For full description, use opening paragraph if readme is long, otherwise use full readme
  const fullDescription = readme 
    ? (readme.length > 500 ? extractOpeningParagraph(readme, 500) : readme)
    : description || quote;
  const technologies = topics.length > 0 ? topics : ['Automation', 'Data Processing'];
  const videoPlaceholder = getVideoPlaceholder(category, index);

  // Generate dynamic rating (4.5-5.0)
  const rating = generateRating(doc.id || '');

  // Create base Project object
  const project: MongoProject = {
    slug,
    name,
    role,
    quote: quote || 'A powerful automation solution built with precision.',
    description: fullDescription || quote || 'No description available.',
    technologies,
    videoPlaceholder,
    rating,
    // Store MongoDB id for uniqueness tracking
    mongoId: doc.id,
    // Track source database
    sourceDatabase,
  };

  // Preserve all original MongoDB fields
  // Convert ObjectId to string for JSON serialization
  if (doc._id) {
    project._id = doc._id.toString ? doc._id.toString() : doc._id;
  }
  
  // Explicitly preserve readme and category (even though we use them for transformation)
  if (doc.readme !== undefined) {
    project.readme = doc.readme;
  }
  if (doc.category !== undefined) {
    project.category = doc.category;
  }
  
  // Preserve all other MongoDB fields
  Object.keys(doc).forEach(key => {
    // Skip fields we've already mapped or transformed, but NOT readme/category (we want both original and transformed)
    if (!['slug', 'name', 'role', 'quote', 'description', 'technologies', 'videoPlaceholder', 'rating', 'readme', 'category'].includes(key)) {
      // Skip _id and id as we handle them separately
      if (key === '_id' || key === 'id') {
        return;
      }
      // Convert ObjectId to string if needed
      if (doc[key] && typeof doc[key] === 'object' && doc[key].toString && doc[key].constructor?.name === 'ObjectId') {
        project[key] = doc[key].toString();
      } else {
        project[key] = doc[key];
      }
    }
  });

  return project;
}

// Extended Project type with MongoDB id and all original fields
interface MongoProject extends Project {
  mongoId?: string;
  sourceDatabase?: string; // Track which database this project came from
  // Preserve all original MongoDB fields
  _id?: any;
  campaignId?: string;
  createdAt?: string;
  // Allow any additional fields from MongoDB
  [key: string]: any;
}

const BLOB_FILE_NAME = 'mongodb-projects.json';
const PROJECTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');

/**
 * Check if we're running in production (Vercel)
 */
function isProduction(): boolean {
  return Boolean(process.env.VERCEL);
}

/**
 * Read existing MongoDB projects
 * - Production: Read from Vercel Blob Storage
 * - Local: Read from local JSON file
 */
async function readExistingProjects(): Promise<MongoProject[]> {
  try {
    if (isProduction()) {
      // Production: Read from Vercel Blob Storage only
      try {
        // List blobs and find the one we need
        const { blobs } = await list({ prefix: BLOB_FILE_NAME });
        const blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
        
        if (blob && blob.url) {
          // Fetch the blob content using the URL
          const response = await fetch(blob.url);
          if (response.ok) {
            const content = await response.text();
            const projects = JSON.parse(content);
            console.log(`📥 [Production] Read ${projects.length} projects from Vercel Blob Storage`);
            return Array.isArray(projects) ? projects : [];
          }
        }
        // Blob doesn't exist yet (first run)
        console.log('📄 [Production] No existing blob found (this is normal for first run)');
        return [];
      } catch (blobError: any) {
        console.error('❌ [Production] Error reading from Blob Storage:', blobError.message);
        return [];
      }
    } else {
      // Local: Read from local file only
      try {
        const fileContent = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
        const projects = JSON.parse(fileContent);
        console.log(`📥 [Local] Read ${projects.length} projects from local file: ${PROJECTS_FILE_PATH}`);
        return Array.isArray(projects) ? projects : [];
      } catch (fileError: any) {
        if (fileError.code === 'ENOENT') {
          console.log('📄 [Local] No existing projects file found (this is normal for first run)');
          return [];
        }
        throw fileError;
      }
    }
  } catch (error: any) {
    console.error('Error reading existing projects:', error);
    return [];
  }
}

/**
 * Write projects
 * - Production: Write to Vercel Blob Storage only
 * - Local: Write to local JSON file only
 */
async function writeProjects(projects: MongoProject[]): Promise<void> {
  const jsonContent = JSON.stringify(projects, null, 2);
  
  if (isProduction()) {
    // Production: Write to Vercel Blob Storage only
    try {
      await put(BLOB_FILE_NAME, jsonContent, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      console.log(`✅ [Production] Uploaded ${projects.length} projects to Vercel Blob Storage`);
    } catch (blobError: any) {
      console.error('❌ [Production] Error writing to Blob Storage:', blobError.message);
      throw blobError; // Re-throw in production since this is critical
    }
  } else {
    // Local: Write to local file only
    try {
      const dir = path.dirname(PROJECTS_FILE_PATH);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(PROJECTS_FILE_PATH, jsonContent, 'utf-8');
      console.log(`✅ [Local] Written ${projects.length} projects to local file: ${PROJECTS_FILE_PATH}`);
    } catch (fileError: any) {
      console.error('❌ [Local] Error writing to local file:', fileError.message);
      throw fileError; // Re-throw in local since this is critical
    }
  }
}

/**
 * Main handler for the cron job
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests (Vercel cron sends GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel cron jobs are protected by default - no additional authentication needed

  try {
    console.log('Starting MongoDB projects sync...');

    // Read existing projects
    const existingProjects = await readExistingProjects();
    const existingIds = new Set(
      existingProjects
        .map(p => p.mongoId)
        .filter((id): id is string => Boolean(id))
    );

    console.log(`Found ${existingProjects.length} existing projects`);

    // Fetch all documents from MongoDB (both databases)
    const mongoDocumentsWithSource = await fetchMongoProjects();
    console.log(`Fetched ${mongoDocumentsWithSource.length} documents from MongoDB (after deduplication)`);

    // OPTIMIZED: Transform and filter new documents in batches for parallel processing
    const newProjects: MongoProject[] = [];
    let skippedCount = 0;
    
    // Track stats per database
    const dbStats: Record<string, { total: number; new: number; skipped: number }> = {};
    TARGET_DATABASES.forEach(db => {
      dbStats[db] = { total: 0, new: 0, skipped: 0 };
    });

    // Filter out documents that are already processed first (more efficient)
    const documentsToProcess = mongoDocumentsWithSource.filter((item) => {
      const mongoId = item.doc.id;
      const dbName = item.sourceDatabase;
      
      // Update stats
      if (dbStats[dbName]) {
        dbStats[dbName].total++;
      }
      
      if (mongoId && existingIds.has(mongoId)) {
        skippedCount++;
        if (dbStats[dbName]) {
          dbStats[dbName].skipped++;
        }
        return false;
      }
      return true;
    });

    console.log(`\n🔄 Processing ${documentsToProcess.length} new documents (skipped ${skippedCount} duplicates)`);
    console.log(`   Per database breakdown:`);
    TARGET_DATABASES.forEach(db => {
      const stats = dbStats[db];
      console.log(`   [${db}]: ${stats.total} total, ${stats.total - stats.skipped} new, ${stats.skipped} skipped`);
    });

    // Process documents in batches of 15 for parallel execution
    const BATCH_SIZE = 15;
    const processStartTime = Date.now();
    
    for (let i = 0; i < documentsToProcess.length; i += BATCH_SIZE) {
      const batch = documentsToProcess.slice(i, i + BATCH_SIZE);
      
      // Process batch in parallel
      const batchResults = await Promise.all(
        batch.map(async (item, batchIndex) => {
          try {
            const globalIndex = i + batchIndex;
            const transformed = transformMongoDocument(item.doc, item.sourceDatabase, globalIndex);
            return { success: true, project: transformed };
          } catch (error) {
            const mongoId = item.doc.id || 'unknown';
            console.warn(`   ⚠️  Error transforming document ${mongoId} from ${item.sourceDatabase}:`, error);
            return { success: false, project: null };
          }
        })
      );

      // Collect successful transformations
      for (const result of batchResults) {
        if (result.success && result.project) {
          newProjects.push(result.project);
          const dbName = result.project.sourceDatabase || 'unknown';
          if (dbStats[dbName]) {
            dbStats[dbName].new++;
          }
        }
      }

      // Log progress for large batches
      if (documentsToProcess.length > 50 && (i + BATCH_SIZE) % 50 === 0) {
        console.log(`   ⏳ Processed ${Math.min(i + BATCH_SIZE, documentsToProcess.length)}/${documentsToProcess.length} documents...`);
      }
    }
    
    const processDuration = Date.now() - processStartTime;
    console.log(`\n✅ Transformation complete in ${processDuration}ms`);
    console.log(`   Found ${newProjects.length} new projects, skipped ${skippedCount} duplicates`);
    console.log(`   Per database new projects:`);
    TARGET_DATABASES.forEach(db => {
      console.log(`   [${db}]: ${dbStats[db].new} new projects`);
    });

    // Merge with existing projects
    const allProjects = [...existingProjects, ...newProjects];

    // Remove duplicates by slug (keep first occurrence)
    const uniqueProjects = new Map<string, MongoProject>();
    for (const project of allProjects) {
      if (!uniqueProjects.has(project.slug)) {
        uniqueProjects.set(project.slug, project);
      }
    }

    const finalProjects = Array.from(uniqueProjects.values());

    // Sort by MongoDB id or createdAt if available (optional)
    finalProjects.sort((a, b) => {
      // Try to maintain some order - could be improved with createdAt field
      return (a.mongoId || '').localeCompare(b.mongoId || '');
    });

    // Write to file
    await writeProjects(finalProjects);
    console.log(`Successfully saved ${finalProjects.length} projects to ${PROJECTS_FILE_PATH}`);

    // Close MongoDB connection
    await closeMongoConnection();

    // Calculate per-database stats for response
    const perDatabaseStats: Record<string, number> = {};
    TARGET_DATABASES.forEach(db => {
      perDatabaseStats[db] = finalProjects.filter(p => p.sourceDatabase === db).length;
    });

    return res.status(200).json({
      success: true,
      message: 'MongoDB projects synced successfully',
      stats: {
        total: finalProjects.length,
        existing: existingProjects.length,
        new: newProjects.length,
        skipped: skippedCount,
        perDatabase: perDatabaseStats,
      },
    });
  } catch (error: any) {
    console.error('Error syncing MongoDB projects:', error);
    
    // Close connection on error
    try {
      await closeMongoConnection();
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to sync MongoDB projects',
      message: error.message || 'Unknown error',
    });
  }
}

