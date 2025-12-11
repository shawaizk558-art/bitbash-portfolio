/**
 * API Route to serve project screenshots from Vercel Blob Storage
 * 
 * This endpoint reads screenshot files from Vercel Blob Storage
 * and serves them to the frontend with proper caching headers.
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
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

const SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'project-screenshots');

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
    // Try to get from Vercel Blob Storage first
    const hasBlobToken = process.env.VERCEL || 
      process.env.BLOB_READ_WRITE_TOKEN || 
      Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
    
    if (hasBlobToken) {
      try {
        const blobPath = `project-screenshots/${slug}.png`;
        const { blobs } = await list({ prefix: blobPath });
        const blob = blobs.find(b => b.pathname === blobPath);
        
        if (blob && blob.url) {
          // Fetch the blob content using the URL
          const response = await fetch(blob.url);
          if (response.ok) {
            const buffer = await response.arrayBuffer();
            
            // Set headers
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            
            return res.status(200).send(Buffer.from(buffer));
          }
        }
      } catch (blobError: any) {
        // Blob doesn't exist - try local file fallback
        console.log(`Screenshot not found in blob storage for ${slug}, trying local file`);
      }
    }
    
    // Fallback: Read from local file (for local development)
    try {
      const filePath = path.join(SCREENSHOT_DIR, `${slug}.png`);
      const fileContent = await fs.readFile(filePath);
      
      // Set headers
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      
      return res.status(200).send(fileContent);
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        // File doesn't exist
        return res.status(404).json({ error: 'Screenshot not found' });
      }
      throw fileError;
    }
  } catch (error: any) {
    console.error('Error serving screenshot:', error);
    return res.status(500).json({ error: 'Failed to serve screenshot' });
  }
}

