/**
 * Vercel Cron Job: Sync MongoDB Projects
 * 
 * This API route runs daily via Vercel cron to:
 * 1. Fetch projects from MongoDB dataToExport collection
 * 2. Transform them to Project interface format
 * 3. Check for duplicates using MongoDB id field
 * 4. Save to public/data/mongodb-projects.json
 */

import { promises as fs } from 'fs';
import path from 'path';
import { MongoClient, Db, Collection } from 'mongodb';
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

// MongoDB utilities (inline to avoid import issues in serverless)
let client: MongoClient | null = null;
let db: Db | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
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
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

async function getDatabase(): Promise<Db> {
  if (db) {
    return db;
  }
  const mongoClient = await getMongoClient();
  db = mongoClient.db('github_automation_UTP');
  return db;
}

async function fetchMongoProjects(): Promise<any[]> {
  try {
    const database = await getDatabase();
    const collection: Collection = database.collection('dataToExport');
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error fetching MongoDB projects:', error);
    throw error;
  }
}

async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
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

function transformMongoDocument(doc: any, index: number = 0): MongoProject {
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
  const quote = description || extractFirstParagraph(readme, 150);
  const fullDescription = readme 
    ? (readme.length > 500 ? extractFirstParagraph(readme, 500) : readme)
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
 * Read existing MongoDB projects from Vercel Blob Storage
 * Falls back to local file for local development
 */
async function readExistingProjects(): Promise<MongoProject[]> {
  try {
    // Try Vercel Blob Storage first (production)
    // Check for any BLOB_READ_WRITE_TOKEN variant (Vercel may name it differently)
    const hasBlobToken = process.env.VERCEL || 
      process.env.BLOB_READ_WRITE_TOKEN || 
      Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
    
    if (hasBlobToken) {
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
            console.log(`📥 Read ${projects.length} projects from Vercel Blob Storage`);
            return Array.isArray(projects) ? projects : [];
          }
        }
      } catch (blobError: any) {
        // Blob doesn't exist yet (first run) - continue to local file fallback
        console.log('⚠️  Blob not found or error reading from Blob Storage, trying local file');
      }
    }
    
    // Fallback: Read from local file (for local development)
    try {
      const fileContent = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
      const projects = JSON.parse(fileContent);
      console.log(`📥 Read ${projects.length} projects from local file`);
      return Array.isArray(projects) ? projects : [];
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        console.log('📄 No existing projects file found (this is normal for first run)');
        return [];
      }
      throw fileError;
    }
  } catch (error: any) {
    console.error('Error reading existing projects:', error);
    return [];
  }
}

/**
 * Write projects to Vercel Blob Storage
 * Also writes to local file for local development
 */
async function writeProjects(projects: MongoProject[]): Promise<void> {
  const jsonContent = JSON.stringify(projects, null, 2);
  
  // Write to Vercel Blob Storage (production)
  // Check for any BLOB_READ_WRITE_TOKEN variant
  const hasBlobToken = process.env.VERCEL || 
    process.env.BLOB_READ_WRITE_TOKEN || 
    Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
  
  if (hasBlobToken) {
    try {
      await put(BLOB_FILE_NAME, jsonContent, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      console.log(`✅ Uploaded ${projects.length} projects to Vercel Blob Storage`);
    } catch (blobError) {
      console.error('⚠️  Error writing to Blob Storage:', blobError);
      // Continue to local file write as fallback
    }
  }
  
  // Also write to local file (for local development and backup)
  try {
    const dir = path.dirname(PROJECTS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(PROJECTS_FILE_PATH, jsonContent, 'utf-8');
    console.log(`✅ Written ${projects.length} projects to local file: ${PROJECTS_FILE_PATH}`);
  } catch (fileError) {
    // Local file write is optional (for development only)
    console.log('⚠️  Could not write to local file (this is OK in production):', fileError);
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

    // Fetch all documents from MongoDB
    const mongoDocuments = await fetchMongoProjects();
    console.log(`Fetched ${mongoDocuments.length} documents from MongoDB`);

    // Transform and filter new documents
    const newProjects: MongoProject[] = [];
    let skippedCount = 0;

    for (let i = 0; i < mongoDocuments.length; i++) {
      const doc = mongoDocuments[i];
      const mongoId = doc.id;

      // Skip if already processed
      if (mongoId && existingIds.has(mongoId)) {
        skippedCount++;
        continue;
      }

      try {
        const transformed = transformMongoDocument(doc, i);
        newProjects.push(transformed);
      } catch (error) {
        console.warn(`Error transforming document ${mongoId}:`, error);
        // Continue with next document
      }
    }

    console.log(`Found ${newProjects.length} new projects, skipped ${skippedCount} duplicates`);

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

    return res.status(200).json({
      success: true,
      message: 'MongoDB projects synced successfully',
      stats: {
        total: finalProjects.length,
        existing: existingProjects.length,
        new: newProjects.length,
        skipped: skippedCount,
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

