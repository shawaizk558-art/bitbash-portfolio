/**
 * API Route to serve MongoDB projects from Vercel Blob Storage
 * 
 * This endpoint reads the mongodb-projects.json file from Vercel Blob Storage
 * and serves it to the frontend.
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
};

const BLOB_FILE_NAME = 'mongodb-projects.json';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to get from Vercel Blob Storage
    try {
      const { blobs } = await list({ prefix: BLOB_FILE_NAME });
      const blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
      
      if (blob && blob.url) {
        // Fetch the blob content using the URL
        const response = await fetch(blob.url);
        if (response.ok) {
          const content = await response.text();
          const projects = JSON.parse(content);
          
          // Set cache headers (1 hour cache for production, revalidate)
          res.status(200)
            .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
            .json(projects);
          return;
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
        return res.status(200)
          .setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
          .json(projects);
      } catch (fileError: any) {
        // File doesn't exist either
        return res.status(200).json([]);
      }
    }
    
    // If we get here, blob exists but content is empty
    return res.status(200).json([]);
  } catch (error: any) {
    console.error('Error fetching MongoDB projects:', error);
    // Return empty array on error (graceful degradation)
    return res.status(200).json([]);
  }
}

