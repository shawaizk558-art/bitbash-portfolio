/**
 * API Route to serve MongoDB projects
 * 
 * - Production: Reads from Vercel Blob Storage
 * - Local: Reads from local JSON file
 */

import { list } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

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
  setHeader: (name: string, value: string) => VercelResponse;
};

const BLOB_FILE_NAME = 'mongodb-projects.json';
const PROJECTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');

/**
 * Check if we're running in production (Vercel)
 */
function isProduction(): boolean {
  return Boolean(process.env.VERCEL);
}

/**
 * Read projects from the appropriate source
 */
async function readProjects(): Promise<any[]> {
  if (isProduction()) {
    // Production: Read from Vercel Blob Storage only
    try {
      // Try to list blobs with the exact filename
      const { blobs } = await list({ prefix: BLOB_FILE_NAME });
      
      // Log for debugging
      console.log(`[Production] Found ${blobs.length} blobs with prefix "${BLOB_FILE_NAME}"`);
      
      // Try to find exact match first
      let blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
      
      // If no exact match, try to find any blob that contains the filename
      if (!blob && blobs.length > 0) {
        console.log(`[Production] No exact match, trying first blob. Available blobs:`, blobs.map(b => b.pathname));
        blob = blobs[0]; // Use first blob if exact match not found
      }
      
      if (blob && blob.url) {
        console.log(`[Production] Fetching blob from URL: ${blob.url}`);
        const response = await fetch(blob.url, {
          // Don't cache the fetch to get fresh data
          cache: 'no-store',
        });
        
        if (response.ok) {
          const content = await response.text();
          const projects = JSON.parse(content);
          console.log(`[Production] Successfully loaded ${Array.isArray(projects) ? projects.length : 0} projects from Blob Storage`);
          return Array.isArray(projects) ? projects : [];
        } else {
          console.error(`[Production] Failed to fetch blob: ${response.status} ${response.statusText}`);
        }
      } else {
        console.error(`[Production] Blob not found. Searched for: "${BLOB_FILE_NAME}"`);
      }
      return [];
    } catch (error: any) {
      console.error('[Production] Error reading from Blob Storage:', error.message);
      console.error('[Production] Error stack:', error.stack);
      return [];
    }
  } else {
    // Local: Read from local file only
    try {
      const content = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
      const projects = JSON.parse(content);
      console.log(`[Local] Successfully loaded ${Array.isArray(projects) ? projects.length : 0} projects from local file`);
      return Array.isArray(projects) ? projects : [];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log('[Local] No projects file found');
        return [];
      }
      throw error;
    }
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse pagination parameters
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '100', 10);
    const pageSize = Math.min(Math.max(limit, 1), 100); // Clamp between 1 and 100
    const pageNumber = Math.max(page, 1); // Ensure page >= 1

    // Read projects from appropriate source (production = blob, local = file)
    const allProjects = await readProjects();
    
    // Apply pagination if requested
    let projects = allProjects;
    let total = allProjects.length;
    let hasMore = false;
    
    if (pageSize < 100 || pageNumber > 1) {
      // Only paginate if limit is less than 100 or page > 1
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      projects = allProjects.slice(start, end);
      hasMore = end < total;
    }
    
    // Set cache headers
    // Reduced cache time for blob storage to ensure fresh data after cron updates
    return res.status(200)
      .setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      .json({
        projects,
        pagination: {
          page: pageNumber,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
          hasMore,
        },
      });
  } catch (error: any) {
    console.error('Error fetching MongoDB projects:', error);
    // Return empty array on error (graceful degradation)
    return res.status(200).json({
      projects: [],
      pagination: {
        page: 1,
        pageSize: 100,
        total: 0,
        totalPages: 0,
        hasMore: false,
      },
    });
  }
}

