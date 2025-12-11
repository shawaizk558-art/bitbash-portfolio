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

import puppeteer from 'puppeteer-core';
// @ts-ignore - @sparticuz/chromium may not have type definitions
import chromium from '@sparticuz/chromium';
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
 * Generate screenshot and return buffer
 * Reuses logic from generate-project-screenshots.ts
 */
async function generateScreenshotBuffer(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  projectSlug: string,
  baseUrl: string
): Promise<Buffer | null> {
  const page = await browser.newPage();
  
  try {
    // Set viewport size (wide enough to capture hero section)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Retina quality
    });

    const url = `${baseUrl}/project/${projectSlug}`;
    console.log(`  Navigating to ${url}...`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for core project hero content (title + description) to load
    await page.waitForSelector('[data-project-hero-core="true"]', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for animations and content to render

    // Find the core hero content element (title + description only)
    const heroCore = await page.evaluate(() => {
      const core = document.querySelector('[data-project-hero-core="true"]') as HTMLElement | null;
      if (!core) return null;

      const rect = core.getBoundingClientRect();

      // Only return if it's visible and has reasonable dimensions
      if (rect.height < 40 || rect.width < 200) {
        return null;
      }

      return {
        x: Math.max(0, rect.x),
        y: Math.max(0, rect.y),
        width: rect.width,
        height: rect.height,
      };
    });

    if (!heroCore) {
      throw new Error('Core project hero content not found');
    }

    // Take a tight screenshot around the core content only
    const horizontalPadding = 8; // small padding to avoid cutting off glyphs
    const verticalPadding = 4;

    const clipX = Math.max(0, Math.round(heroCore.x - horizontalPadding));
    const clipY = Math.max(0, Math.round(heroCore.y - verticalPadding));
    const clipWidth = Math.round(heroCore.width + horizontalPadding * 2);
    const clipHeight = Math.round(heroCore.height + verticalPadding * 2);

    const buffer = await page.screenshot({
      type: 'png',
      clip: {
        x: clipX,
        y: clipY,
        width: clipWidth,
        height: clipHeight,
      },
    }) as Buffer;

    return buffer;
  } catch (error) {
    console.error(`  ✗ Failed to generate screenshot for ${projectSlug}:`, error);
    return null;
  } finally {
    await page.close();
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

    // Launch browser with Chromium for serverless
    console.log('Launching browser...');
    
    const browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--single-process',
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    console.log('Browser launched');

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
      const buffer = await generateScreenshotBuffer(browser, project.slug, baseUrl);

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

    // Close browser
    await browser.close();

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

