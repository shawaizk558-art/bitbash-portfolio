/**
 * Test script to manually run MongoDB sync
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
  // Preserve all original MongoDB fields
  _id?: any;
  campaignId?: string;
  createdAt?: string;
  readme?: string;
  category?: string;
  // Allow any additional fields from MongoDB
  [key: string]: any;
}

const PROJECTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');

let client: MongoClient | null = null;
let db: Db | null = null;

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

async function getDatabase(): Promise<Db> {
  if (db) {
    return db;
  }
  const mongoClient = await getMongoClient();
  db = mongoClient.db('github_automation');
  return db;
}

async function fetchMongoProjects(): Promise<any[]> {
  try {
    const database = await getDatabase();
    const collection: Collection = database.collection('dataToExport');
    console.log('📥 Fetching documents from dataToExport collection...');
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('❌ Error fetching MongoDB projects:', error);
    throw error;
  }
}

async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
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

    // Fetch all documents from MongoDB
    const mongoDocuments = await fetchMongoProjects();
    console.log(`✅ Fetched ${mongoDocuments.length} documents from MongoDB\n`);

    // Transform and filter new documents
    const newProjects: MongoProject[] = [];
    let skippedCount = 0;

    console.log('🔄 Processing documents...');
    for (let i = 0; i < mongoDocuments.length; i++) {
      const doc = mongoDocuments[i];
      const mongoId = doc.id;

      // Skip if already processed
      if (mongoId && existingIds.has(mongoId)) {
        skippedCount++;
        continue;
      }

      try {
        const transformed = transformMongoDocument(doc, i) as MongoProject;
        transformed.mongoId = mongoId;
        newProjects.push(transformed);
        console.log(`   ✓ Processed: ${transformed.name} (${transformed.slug})`);
      } catch (error: any) {
        console.warn(`   ⚠️  Error transforming document ${mongoId}:`, error.message);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   New projects: ${newProjects.length}`);
    console.log(`   Skipped (duplicates): ${skippedCount}`);

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

    console.log('🎉 Sync completed successfully!');
    console.log(`\n📈 Final Stats:`);
    console.log(`   Total projects: ${finalProjects.length}`);
    console.log(`   Existing: ${existingProjects.length}`);
    console.log(`   New: ${newProjects.length}`);
    console.log(`   Skipped: ${skippedCount}`);

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

