/**
 * API Route to serve MongoDB projects
 * 
 * - Production: Reads from Vercel Blob Storage
 * - Local: Reads from local JSON file
 */

import { list } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

// Note: Environment variables are loaded by Vite middleware in development
// Create a .env.local file in the project root with: BLOB_READ_WRITE_TOKEN=your_token_here

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
 * Get blob storage token from environment
 */
function getBlobToken(): string | undefined {
  // Check common token names
  return process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.Blob_projects_READ_WRITE_TOKEN ||
    Object.keys(process.env)
      .find(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'))
      ? process.env[Object.keys(process.env).find(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'))!]
      : undefined;
}

/**
 * Check if blob storage token is available
 */
function hasBlobToken(): boolean {
  return Boolean(process.env.VERCEL || getBlobToken());
}

/**
 * Read projects from the appropriate source
 * Always tries Blob Storage first, falls back to local file in development
 */
async function readProjects(): Promise<any[]> {
  const env = isProduction() ? 'Production' : 'Local';
  
  // Check if blob token is available
  const blobToken = getBlobToken();
  const allBlobEnvVars = Object.keys(process.env).filter(k => k.includes('BLOB'));
  
  if (!hasBlobToken()) {
    console.log(`[${env}] ⚠️  No blob token found. Available env vars:`, allBlobEnvVars.join(', ') || 'none');
    console.log(`[${env}] All env vars with 'BLOB':`, allBlobEnvVars);
    // Continue to fallback
  } else {
    console.log(`[${env}] ✅ Blob token found (${blobToken ? 'token length: ' + blobToken.length : 'VERCEL env detected'}), attempting to read from Blob Storage...`);
    console.log(`[${env}] Blob token env var name:`, Object.keys(process.env).find(k => k.includes('BLOB') && k.includes('READ_WRITE_TOKEN')) || 'VERCEL');
    
    // Strategy 1: Try to list blobs with prefix
    try {
      // Explicitly pass token if available
      const listOptions: any = { prefix: BLOB_FILE_NAME };
      if (blobToken) {
        listOptions.token = blobToken;
      }
      const { blobs } = await list(listOptions);
      
      console.log(`[${env}] Found ${blobs.length} blobs with prefix "${BLOB_FILE_NAME}"`);
      if (blobs.length > 0) {
        console.log(`[${env}] Available blob pathnames:`, blobs.map(b => b.pathname).join(', '));
      }
      
      // Try to find exact match first
      let blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
      
      // If no exact match, try to find any blob that contains the filename
      if (!blob && blobs.length > 0) {
        console.log(`[${env}] No exact match, trying first blob. Available blobs:`, blobs.map(b => b.pathname));
        blob = blobs[0]; // Use first blob if exact match not found
      }
      
      if (blob && blob.url) {
        console.log(`[${env}] Fetching blob from URL: ${blob.url}`);
        const response = await fetch(blob.url, {
          cache: 'no-store',
        });
        
        if (response.ok) {
          const content = await response.text();
          const projects = JSON.parse(content);
          const projectCount = Array.isArray(projects) ? projects.length : 0;
          console.log(`[${env}] ✅ Successfully loaded ${projectCount} projects from Blob Storage (via list())`);
          return Array.isArray(projects) ? projects : [];
        } else {
          console.error(`[${env}] Failed to fetch blob: ${response.status} ${response.statusText}`);
        }
      } else {
        console.log(`[${env}] Blob not found in list results. Searched for: "${BLOB_FILE_NAME}"`);
      }
    } catch (listError: any) {
      console.error(`[${env}] Error with list() method:`, listError.message);
      console.error(`[${env}] Full error:`, JSON.stringify(listError, null, 2));
      
      // Strategy 2: Try listing all blobs (no prefix) to see what's available
      try {
        console.log(`[${env}] Attempting to list all blobs to find the file...`);
        const listAllOptions: any = {};
        if (blobToken) {
          listAllOptions.token = blobToken;
        }
        const { blobs } = await list(listAllOptions);
        console.log(`[${env}] Found ${blobs.length} total blobs in storage`);
        if (blobs.length > 0) {
          console.log(`[${env}] All blob pathnames:`, blobs.map(b => b.pathname).join(', '));
          
          // Try to find any blob that matches our filename
          const matchingBlob = blobs.find(b => 
            b.pathname === BLOB_FILE_NAME || 
            b.pathname.includes(BLOB_FILE_NAME) ||
            b.pathname.endsWith(BLOB_FILE_NAME)
          );
          
          if (matchingBlob && matchingBlob.url) {
            console.log(`[${env}] Found matching blob: ${matchingBlob.pathname}`);
            const response = await fetch(matchingBlob.url, { cache: 'no-store' });
            if (response.ok) {
              const content = await response.text();
              const projects = JSON.parse(content);
              const projectCount = Array.isArray(projects) ? projects.length : 0;
              console.log(`[${env}] ✅ Successfully loaded ${projectCount} projects from Blob Storage (via full list)`);
              return Array.isArray(projects) ? projects : [];
            }
          }
        }
      } catch (fullListError: any) {
        console.error(`[${env}] Error listing all blobs:`, fullListError.message);
      }
    }
  }
  
  // Fallback: In local development, try reading from local file
  if (!isProduction()) {
    try {
      const content = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
      const projects = JSON.parse(content);
      const projectCount = Array.isArray(projects) ? projects.length : 0;
      console.log(`[Local] ✅ Fallback: Successfully loaded ${projectCount} projects from local file`);
      return Array.isArray(projects) ? projects : [];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log('[Local] No projects file found (blob storage also failed)');
        return [];
      }
      throw error;
    }
  }
  
  // Production: If blob storage fails, return empty array (no local file fallback)
  return [];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const env = isProduction() ? 'Production' : 'Local';
  console.log(`[${env}] 📥 API /api/mongodb-projects called`);
  console.log(`[${env}] Request method: ${req.method}`);
  console.log(`[${env}] Query params:`, req.query);
  
  if (req.method !== 'GET') {
    console.log(`[${env}] ❌ Method not allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse pagination parameters
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '100', 10);
    const pageSize = Math.min(Math.max(limit, 1), 100); // Clamp between 1 and 100
    const pageNumber = Math.max(page, 1); // Ensure page >= 1

    console.log(`[${env}] Pagination: page=${pageNumber}, pageSize=${pageSize}`);

    // Read projects from appropriate source (always tries blob storage first)
    console.log(`[${env}] 📖 Reading projects from blob storage...`);
    const allProjects = await readProjects();
    console.log(`[${env}] ✅ Read ${allProjects.length} projects from source`);
    
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
    console.log(`[${env}] ✅ Returning ${projects.length} projects (page ${pageNumber} of ${Math.ceil(total / pageSize)})`);
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
    const env = isProduction() ? 'Production' : 'Local';
    console.error(`[${env}] ❌ Error fetching MongoDB projects:`, error?.message || String(error));
    console.error(`[${env}] Error stack:`, error?.stack);
    // Always return JSON, even on error (graceful degradation)
    console.log(`[${env}] ⚠️  Returning empty array due to error`);
    return res.status(200).setHeader('Content-Type', 'application/json').json({
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

