/**
 * API Route to serve a single MongoDB project by slug from Vercel Blob Storage
 * 
 * This endpoint reads the mongodb-projects.json file from Vercel Blob Storage,
 * finds the project by slug, and returns only that project.
 * This is more efficient than loading all projects.
 */

import { list } from '@vercel/blob';

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
    // Try to get from Vercel Blob Storage
    try {
      const { blobs } = await list({ prefix: BLOB_FILE_NAME });
      const blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
      
      if (blob && blob.url) {
        // Fetch the blob content using the URL
        const response = await fetch(blob.url, {
          cache: 'force-cache',
        });
        if (response.ok) {
          const content = await response.text();
          const projects = JSON.parse(content);
          
          // Find project by slug
          const project = Array.isArray(projects) 
            ? projects.find((p: any) => p.slug === slug)
            : null;
          
          if (project) {
            // Set cache headers (1 hour cache for production, revalidate)
            return res.status(200)
              .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
              .json(project);
          }
        }
      }
    } catch (blobError: any) {
      // Blob doesn't exist - try local file fallback
      try {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');
        const content = await fs.readFile(filePath, 'utf-8');
        const projects = JSON.parse(content);
        
        // Find project by slug
        const project = Array.isArray(projects) 
          ? projects.find((p: any) => p.slug === slug)
          : null;
        
        if (project) {
          return res.status(200)
            .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
            .json(project);
        }
      } catch (fileError: any) {
        // File doesn't exist either
      }
    }
    
    // Project not found
    return res.status(404).json({ error: 'Project not found' });
  } catch (error: any) {
    console.error('Error fetching MongoDB project by slug:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

