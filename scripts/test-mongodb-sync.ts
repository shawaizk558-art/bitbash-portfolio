/**
 * Test script to manually run MongoDB sync
 * 
 * Fetches from multiple databases (github_automation, github_automation_UTP)
 * in parallel for maximum speed with detailed per-database logging.
 * 
 * Usage: tsx scripts/test-mongodb-sync.ts
 */

import { promises as fs } from 'fs';
import path from 'path';
import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Inline Project type
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

interface MongoProject extends Project {
  mongoId?: string;
  sourceDatabase?: string; // Track which database this project came from
  // Preserve all original MongoDB fields
  _id?: any;
  campaignId?: string;
  createdAt?: string;
  readme?: string;
  category?: string;
  // Allow any additional fields from MongoDB
  [key: string]: any;
}

// Target databases configuration
const TARGET_DATABASES = ['github_automation', 'github_automation_UTP'];
const COLLECTION_NAME = 'dataToExport';

const PROJECTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');

let client: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }
  console.log('🔌 Connecting to MongoDB...');
  client = new MongoClient(uri);
  await client.connect();
  console.log('✅ Connected to MongoDB');
  return client;
}

/**
 * Fetch documents from a specific database
 */
async function fetchFromDatabase(dbName: string): Promise<{ documents: any[]; count: number }> {
  try {
    const mongoClient = await getMongoClient();
    const database = mongoClient.db(dbName);
    const collection: Collection = database.collection(COLLECTION_NAME);
    
    console.log(`   [${dbName}] 📥 Fetching documents from ${COLLECTION_NAME} collection...`);
    const startTime = Date.now();
    
    const documents = await collection.find({}).toArray();
    
    const duration = Date.now() - startTime;
    console.log(`   [${dbName}] ✅ Fetched ${documents.length} documents in ${duration}ms`);
    
    return { documents, count: documents.length };
  } catch (error: any) {
    console.error(`   [${dbName}] ❌ Error fetching:`, error.message);
    throw error;
  }
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
    console.log('🔌 MongoDB connection closed');
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

  // Create base Project object
  const project: MongoProject = {
    slug,
    name,
    role,
    quote: quote || 'A powerful automation solution built with precision.',
    description: fullDescription || quote || 'No description available.',
    technologies,
    videoPlaceholder,
    rating: 5,
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

async function readExistingProjects(): Promise<MongoProject[]> {
  try {
    const fileContent = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
    const projects = JSON.parse(fileContent);
    return Array.isArray(projects) ? projects : [];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('📄 No existing projects file found (this is normal for first run)');
      return [];
    }
    console.error('⚠️  Error reading existing projects:', error.message);
    return [];
  }
}

async function writeProjects(projects: MongoProject[]): Promise<void> {
  const dir = path.dirname(PROJECTS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    PROJECTS_FILE_PATH,
    JSON.stringify(projects, null, 2),
    'utf-8'
  );
}

async function main() {
  console.log('🚀 Starting MongoDB projects sync...\n');

  try {
    // Read existing projects
    console.log('📖 Reading existing projects...');
    const existingProjects = await readExistingProjects();
    const existingIds = new Set(
      existingProjects
        .map(p => p.mongoId)
        .filter((id): id is string => Boolean(id))
    );
    console.log(`   Found ${existingProjects.length} existing projects`);
    console.log(`   Existing IDs: ${existingIds.size}\n`);

    // Fetch all documents from MongoDB (both databases)
    const mongoDocumentsWithSource = await fetchMongoProjects();
    console.log(`✅ Fetched ${mongoDocumentsWithSource.length} documents from MongoDB (after deduplication)\n`);

    // Transform and filter new documents
    const newProjects: MongoProject[] = [];
    let skippedCount = 0;
    
    // Track stats per database
    const dbStats: Record<string, { total: number; new: number; skipped: number }> = {};
    TARGET_DATABASES.forEach(db => {
      dbStats[db] = { total: 0, new: 0, skipped: 0 };
    });

    console.log('🔄 Processing documents...');
    const processStartTime = Date.now();
    
    for (let i = 0; i < mongoDocumentsWithSource.length; i++) {
      const item = mongoDocumentsWithSource[i];
      const doc = item.doc;
      const mongoId = doc.id;
      const dbName = item.sourceDatabase;
      
      // Update stats
      if (dbStats[dbName]) {
        dbStats[dbName].total++;
      }

      // Skip if already processed
      if (mongoId && existingIds.has(mongoId)) {
        skippedCount++;
        if (dbStats[dbName]) {
          dbStats[dbName].skipped++;
        }
        continue;
      }

      try {
        const transformed = transformMongoDocument(doc, dbName, i) as MongoProject;
        transformed.mongoId = mongoId;
        newProjects.push(transformed);
        
        if (dbStats[dbName]) {
          dbStats[dbName].new++;
        }
        
        console.log(`   [${dbName}] ✓ Processed: ${transformed.name} (${transformed.slug})`);
      } catch (error: any) {
        console.warn(`   [${dbName}] ⚠️  Error transforming document ${mongoId}:`, error.message);
      }
    }
    
    const processDuration = Date.now() - processStartTime;
    console.log(`\n📊 Processing Summary (${processDuration}ms):`);
    console.log(`   New projects: ${newProjects.length}`);
    console.log(`   Skipped (duplicates): ${skippedCount}`);
    console.log(`   Per database breakdown:`);
    TARGET_DATABASES.forEach(db => {
      const stats = dbStats[db];
      console.log(`   [${db}]: ${stats.total} total, ${stats.new} new, ${stats.skipped} skipped`);
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

    // Sort by MongoDB id
    finalProjects.sort((a, b) => {
      return (a.mongoId || '').localeCompare(b.mongoId || '');
    });

    // Write to file
    console.log(`\n💾 Writing ${finalProjects.length} projects to file...`);
    await writeProjects(finalProjects);
    console.log(`✅ Successfully saved to ${PROJECTS_FILE_PATH}\n`);

    // Close MongoDB connection
    await closeMongoConnection();

    // Calculate per-database final stats
    const perDatabaseFinal: Record<string, number> = {};
    TARGET_DATABASES.forEach(db => {
      perDatabaseFinal[db] = finalProjects.filter(p => p.sourceDatabase === db).length;
    });
    
    console.log('🎉 Sync completed successfully!');
    console.log(`\n📈 Final Stats:`);
    console.log(`   Total projects: ${finalProjects.length}`);
    console.log(`   Existing: ${existingProjects.length}`);
    console.log(`   New: ${newProjects.length}`);
    console.log(`   Skipped: ${skippedCount}`);
    console.log(`   Per database final count:`);
    TARGET_DATABASES.forEach(db => {
      console.log(`   [${db}]: ${perDatabaseFinal[db]} projects`);
    });

  } catch (error: any) {
    console.error('\n❌ Error syncing MongoDB projects:', error);
    console.error('   Message:', error.message);
    if (error.stack) {
      console.error('\n   Stack trace:');
      console.error(error.stack);
    }
    
    // Close connection on error
    try {
      await closeMongoConnection();
    } catch (closeError) {
      console.error('   Error closing MongoDB connection:', closeError);
    }

    process.exit(1);
  }
}

// Run the script
main();

