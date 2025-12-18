/**
 * API Route to serve a single MongoDB project by slug
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
      
      // Try to find exact match first
      let blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
      
      // If no exact match, try to find any blob that contains the filename
      if (!blob && blobs.length > 0) {
        blob = blobs[0]; // Use first blob if exact match not found
      }
      
      if (blob && blob.url) {
        const response = await fetch(blob.url, {
          // Don't cache the fetch to get fresh data
          cache: 'no-store',
        });
        
        if (response.ok) {
          const content = await response.text();
          return JSON.parse(content);
        }
      }
      return [];
    } catch (error: any) {
      console.error('[Production] Error reading from Blob Storage:', error.message);
      return [];
    }
  } else {
    // Local: Read from local file only
    try {
      const content = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
      return JSON.parse(content);
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

  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  if (!slug) {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  try {
    // Read projects from appropriate source (production = blob, local = file)
    const projects = await readProjects();
    
    // Find project by slug
    const project = Array.isArray(projects) 
      ? projects.find((p: any) => p.slug === slug)
      : null;
    
    if (project) {
      // Set cache headers
      // Reduced cache time for blob storage to ensure fresh data after cron updates
      return res.status(200)
        .setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
        .json(project);
    }
    
    // Project not found
    return res.status(404).json({ error: 'Project not found' });
  } catch (error: any) {
    console.error('Error fetching MongoDB project by slug:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

