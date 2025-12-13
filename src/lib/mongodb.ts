/**
 * MongoDB Integration Library
 * 
 * Provides utilities for connecting to MongoDB and transforming
 * documents from the dataToExport collection to the Project interface.
 */

import { MongoClient, Db, Collection } from 'mongodb';
import type { Project } from '@/data/projects';
import { formatName } from './utils';

// MongoDB connection cache
let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Get MongoDB client connection
 */
async function getMongoClient(): Promise<MongoClient> {
  if (client) {
    return client;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  client = new MongoClient(uri);
  await client.connect();
  return client;
}

/**
 * Get MongoDB database instance
 */
async function getDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  const mongoClient = await getMongoClient();
  db = mongoClient.db('github_automation_UTP');
  return db;
}

/**
 * Slugify a string (convert to URL-friendly slug)
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Extract first paragraph from markdown/plain text
 */
function extractFirstParagraph(text: string, maxLength: number = 200): string {
  if (!text) return '';
  
  // Remove markdown headers, code blocks, etc.
  let cleaned = text
    .replace(/^#+\s+/gm, '') // Remove markdown headers
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .trim();

  // Split by newlines and get first paragraph
  const paragraphs = cleaned.split(/\n\n+/).filter(p => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || cleaned.split('\n')[0] || cleaned;
  
  // Truncate if too long
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

/**
 * Get video placeholder color based on category or rotate
 */
function getVideoPlaceholder(category?: string, index: number = 0): Project['videoPlaceholder'] {
  const colors: Project['videoPlaceholder'][] = ['purple', 'blue', 'green', 'orange', 'pink', 'teal'];
  
  // Map category to color if possible
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
  
  // Rotate through colors based on index
  return colors[index % colors.length];
}

/**
 * Transform MongoDB document to Project interface
 */
export function transformMongoDocument(doc: any, index: number = 0): Project {
  const title = doc.title || '';
  const description = doc.description || '';
  const readme = doc.readme || '';
  const topics = Array.isArray(doc.topics) ? doc.topics : [];
  const category = doc.category || '';
  const mongoId = doc.id || '';

  // Generate slug from title
  const slug = slugify(title) || slugify(mongoId) || `project-${index}`;

  // Format name from title
  const name = formatName(title) || 'Untitled Project';

  // Use category as role, or generate from title
  const role = category 
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : name.split(' ').slice(0, 2).join(' ');

  // Use description as quote, or extract from readme
  const quote = description || extractFirstParagraph(readme, 150);

  // Use readme as description, or fallback to description
  const fullDescription = readme 
    ? (readme.length > 500 ? extractFirstParagraph(readme, 500) : readme)
    : description || quote;

  // Use topics as technologies
  const technologies = topics.length > 0 ? topics : ['Automation', 'Data Processing'];

  // Get video placeholder
  const videoPlaceholder = getVideoPlaceholder(category, index);

  // Generate dynamic rating (4.5-5.0)
  const rating = generateRating(mongoId);

  // Create base Project object
  const project: Project & { mongoId?: string; [key: string]: any } = {
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

/**
 * Fetch all documents from MongoDB dataToExport collection
 */
export async function fetchMongoProjects(): Promise<any[]> {
  try {
    const database = await getDatabase();
    const collection: Collection = database.collection('dataToExport');
    
    // Fetch all documents
    const documents = await collection.find({}).toArray();
    return documents;
  } catch (error) {
    console.error('Error fetching MongoDB projects:', error);
    throw error;
  }
}

/**
 * Close MongoDB connection
 */
export async function closeMongoConnection(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

