/**
 * Vercel Cron Job: Generate Project Screenshots
 * 
 * This API route runs daily via Vercel cron to:
 * 1. Fetch all projects (hardcoded + MongoDB)
 * 2. Generate screenshots for projects that need them (skip top 9, skip videos)
 * 3. Upload screenshots to Vercel Blob Storage
 * 4. Update manifest with blob URLs
 * 
 * Schedule: 9:00 AM UTC (2:00 PM PKT) daily
 */

import { put, head, list } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import { projects as hardcodedProjects } from '../../src/data/projects.js';
import { generateContentHash } from '../../scripts/utils/content-hash.js';
import type { Project } from '../../src/data/projects.js';

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

const SKIP_TOP_N = 9; // Skip first 9 projects

/**
 * Get MongoDB projects from blob storage or local file
 * Inlined here to avoid path alias issues in serverless
 */
async function getMongoProjects(): Promise<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]> {
  try {
    // Try Vercel Blob Storage first (production)
    const hasBlobToken = process.env.VERCEL || 
      process.env.BLOB_READ_WRITE_TOKEN || 
      Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
    
    if (hasBlobToken) {
      try {
        const { blobs } = await list({ prefix: 'mongodb-projects.json' });
        const blob = blobs.find(b => b.pathname === 'mongodb-projects.json');
        
        if (blob && blob.url) {
          // Fetch the blob content using the URL
          const response = await fetch(blob.url);
          if (response.ok) {
            const content = await response.text();
            const projects = JSON.parse(content);
            if (Array.isArray(projects)) {
              return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
            }
          }
        }
      } catch (blobError: any) {
        // Blob doesn't exist or error - fall back to local file
        console.log('Could not read from Blob Storage, trying local file');
      }
    }
    
    // Fallback: Read from local file (for local development)
    const filePath = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const projects = JSON.parse(content);
      if (Array.isArray(projects)) {
        return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
      }
      return [];
    } catch (fileError: any) {
      if (fileError.code === 'ENOENT') {
        console.log('MongoDB projects file not found, returning empty array');
        return [];
      }
      throw fileError;
    }
  } catch (error) {
    console.error('Error fetching MongoDB projects:', error);
    // Return empty array on error (graceful degradation)
    return [];
  }
}

/**
 * Get production URL for rendering pages
 */
function getProductionUrl(): string {
  // Primary: Use Vercel URL (automatically set in production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback: Use custom environment variable
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Last resort: Try to construct from VERCEL_URL (shouldn't happen in production)
  throw new Error('Production URL not configured. Set VERCEL_URL or NEXT_PUBLIC_SITE_URL');
}

/**
 * Upload screenshot to Vercel Blob Storage
 */
async function uploadScreenshotToBlob(buffer: Buffer, slug: string): Promise<string | null> {
  try {
    const blobPath = `project-screenshots/${slug}.png`;
    const blob = await put(blobPath, buffer, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
    });

    console.log(`  ✓ Uploaded to blob storage: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`  ⚠️  Error uploading to blob storage for ${slug}:`, error);
    return null;
  }
}

/**
 * Check if screenshot exists in blob storage
 */
async function checkBlobExists(slug: string): Promise<boolean> {
  try {
    const blobPath = `project-screenshots/${slug}.png`;
    await head(blobPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate screenshot using external screenshot API service
 * This avoids Chromium dependency issues in Vercel Lambda
 */
async function generateScreenshotBuffer(
  projectSlug: string,
  baseUrl: string
): Promise<Buffer | null> {
  try {
    const url = `${baseUrl}/project/${projectSlug}`;
    console.log(`  Generating screenshot for ${url}...`);
    
    // Use htmlcsstoimage.com API (free tier available)
    // Alternative: You can use other services like urlbox.io, screenshotapi.net, etc.
    const screenshotApiUrl = process.env.SCREENSHOT_API_URL || 'https://hcti.io/v1/image';
    const apiId = process.env.SCREENSHOT_API_ID;
    const apiKey = process.env.SCREENSHOT_API_KEY;
    
    // If no API credentials, use a simple fetch-based approach with a public service
    if (!apiId || !apiKey) {
      // Fallback: Use a public screenshot service (you may need to sign up for free)
      // For now, we'll use a simple approach - fetch the page and use a service
      console.log('  ⚠️  No screenshot API credentials found, skipping...');
      console.log('  💡 To enable screenshots, set SCREENSHOT_API_URL, SCREENSHOT_API_ID, and SCREENSHOT_API_KEY');
      return null;
    }
    
    // Use htmlcsstoimage API
    const response = await fetch(screenshotApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiId}:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        url: url,
        selector: '[data-project-hero-core="true"]',
        device_scale_factor: 2,
        viewport_width: 1920,
        viewport_height: 1080,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Screenshot API returned ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.url) {
      throw new Error('Screenshot API did not return image URL');
    }
    
    // Fetch the generated screenshot
    const imageResponse = await fetch(data.url);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch generated screenshot');
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error(`  ✗ Failed to generate screenshot for ${projectSlug}:`, error);
    return null;
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
    console.log('Starting screenshot generation...');

    // Get production URL
    const baseUrl = getProductionUrl();
    console.log(`Using production URL: ${baseUrl}`);

    // Get all projects (hardcoded + MongoDB)
    const mongoProjects = await getMongoProjects();
    
    // Filter out MongoDB projects that have same slug as hardcoded (hardcoded take precedence)
    const hardcodedSlugs = new Set(hardcodedProjects.map(p => p.slug));
    const filteredMongoProjects = mongoProjects.filter(
      project => !hardcodedSlugs.has(project.slug)
    );

    // Combine all projects: hardcoded first, then MongoDB
    const allProjects: (Project & { mongoId?: string; [key: string]: any })[] = [
      ...hardcodedProjects, 
      ...filteredMongoProjects
    ];
    
    // Filter projects (skip top 9)
    const projectsToProcess = allProjects.slice(SKIP_TOP_N);
    console.log(`Total projects: ${allProjects.length}`);
    console.log(`Processing ${projectsToProcess.length} projects (skipped top ${SKIP_TOP_N})`);

    if (projectsToProcess.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No projects to process',
        stats: {
          total: allProjects.length,
          processed: 0,
          generated: 0,
          skipped: 0,
          failed: 0,
        },
      });
    }

    let generated = 0;
    let skipped = 0;
    let failed = 0;

    // Process projects
    for (const project of projectsToProcess) {
      // Skip projects with YouTube videos
      if (project.youtubeVideoId) {
        console.log(`⏭️  Skipping ${project.slug} (has YouTube video)`);
        skipped++;
        continue;
      }

      const currentHash = generateContentHash(project);
      
      // Check if screenshot exists in blob storage and hash matches
      const blobExists = await checkBlobExists(project.slug);
      
      // TODO: We could store manifest in blob storage too, but for now just check blob existence
      // In a more sophisticated version, we'd check the hash stored in a manifest
      if (blobExists) {
        console.log(`⏭️  Skipping ${project.slug} (already exists in blob storage)`);
        skipped++;
        continue;
      }

      console.log(`📸 Generating screenshot for ${project.slug}...`);
      const buffer = await generateScreenshotBuffer(project.slug, baseUrl);

      if (buffer) {
        // Upload to blob storage
        const blobUrl = await uploadScreenshotToBlob(buffer, project.slug);
        
        if (blobUrl) {
          generated++;
        } else {
          failed++;
        }
      } else {
        failed++;
      }
    }

    console.log(`Successfully processed screenshots. Generated: ${generated}, Skipped: ${skipped}, Failed: ${failed}`);

    return res.status(200).json({
      success: true,
      message: 'Screenshots generated successfully',
      stats: {
        total: allProjects.length,
        processed: projectsToProcess.length,
        generated,
        skipped,
        failed,
      },
    });
  } catch (error: any) {
    console.error('Error generating screenshots:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Failed to generate screenshots',
      message: error.message || 'Unknown error',
    });
  }
}

