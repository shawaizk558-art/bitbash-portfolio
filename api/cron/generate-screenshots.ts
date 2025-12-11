/**
 * Vercel Cron Job: Generate Screenshots for MongoDB Projects
 * 
 * This API route runs after MongoDB sync to:
 * 1. Read mongodb-projects.json
 * 2. Identify projects that need screenshots
 * 3. Generate screenshots for new/updated projects
 * 
 * Note: This requires a deployed site URL to generate screenshots
 * For local development, use: npm run screenshots
 */

import { promises as fs } from 'fs';
import path from 'path';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { put, list } from '@vercel/blob';
import crypto from 'crypto';

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

const SCREENSHOT_BLOB_PREFIX = 'project-screenshots/';
const MANIFEST_BLOB_NAME = 'screenshot-manifest.json';
const PROJECTS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');
const LOCAL_SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'project-screenshots');
const LOCAL_MANIFEST_PATH = path.join(process.cwd(), 'scripts', 'screenshot-manifest.json');

// Use production URL or fallback to localhost for testing
const BASE_URL = process.env.VERCEL 
  ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.SITE_URL || 'http://localhost:8080')
  : process.env.SITE_URL || 'http://localhost:8080';

const SKIP_TOP_N = 9; // Skip first 9 projects (hardcoded)

// Hardcoded project slugs (top 9 projects that take precedence)
const HARDCODED_PROJECT_SLUGS = new Set([
  'petla',
  'scraper-glass',
  'actuary-list',
  'twitter-data-scraper-tweet-logger-scraper',
  'telegram-weather-alert-bot',
  'linkedin-scraper',
  'instagram-scraper',
  'reddit-scraper',
  'youtube-scraper'
]);

interface ScreenshotManifest {
  [slug: string]: {
    hash: string;
    generatedAt: string;
  };
}

interface Project {
  slug: string;
  name: string;
  role: string;
  quote: string;
  description: string;
  technologies: string[];
  videoPlaceholder: string;
  youtubeVideoId?: string;
  rating: number;
  mongoId?: string;
  [key: string]: any;
}

async function loadManifest(): Promise<ScreenshotManifest> {
  try {
    const hasBlobToken = process.env.VERCEL || 
      process.env.BLOB_READ_WRITE_TOKEN || 
      Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
    
    if (hasBlobToken) {
      try {
        const { blobs } = await list({ prefix: MANIFEST_BLOB_NAME });
        const blob = blobs.find(b => b.pathname === MANIFEST_BLOB_NAME);
        if (blob && blob.url) {
          const response = await fetch(blob.url);
          if (response.ok) {
            const content = await response.text();
            return JSON.parse(content);
          }
        }
      } catch (blobError: any) {
        console.log('Could not read manifest from Blob Storage, trying local file');
      }
    }
    
    // Fallback: Read from local file
    try {
      const content = await fs.readFile(LOCAL_MANIFEST_PATH, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  } catch {
    return {};
  }
}

async function saveManifest(manifest: ScreenshotManifest) {
  const jsonContent = JSON.stringify(manifest, null, 2);
  
  const hasBlobToken = process.env.VERCEL || 
    process.env.BLOB_READ_WRITE_TOKEN || 
    Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
  
  if (hasBlobToken) {
    try {
      await put(MANIFEST_BLOB_NAME, jsonContent, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      console.log('✅ Manifest saved to Blob Storage');
    } catch (blobError) {
      console.error('⚠️  Error writing manifest to Blob Storage:', blobError);
    }
  }
  
  // Also save locally for backup
  try {
    await fs.mkdir(path.dirname(LOCAL_MANIFEST_PATH), { recursive: true });
    await fs.writeFile(LOCAL_MANIFEST_PATH, jsonContent, 'utf-8');
  } catch (fileError) {
    // Ignore local file errors in production
  }
}

async function readMongoProjects(): Promise<Project[]> {
  try {
    // Try to read from local file first (for Vercel, this might not exist)
    const content = await fs.readFile(PROJECTS_FILE_PATH, 'utf-8');
    const projects = JSON.parse(content);
    return Array.isArray(projects) ? projects : [];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('No MongoDB projects file found, trying to fetch from API...');
      // Try to fetch from the deployed site's API
      try {
        const apiUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}/api/mongodb-projects`
          : 'http://localhost:3000/api/mongodb-projects';
        const response = await fetch(apiUrl);
        if (response.ok) {
          const projects = await response.json();
          return Array.isArray(projects) ? projects : [];
        }
      } catch (apiError) {
        console.log('Could not fetch from API either');
      }
      return [];
    }
    throw error;
  }
}

function generateContentHash(project: Project & { mongoId?: string; [key: string]: any }): string {
  // Hash based on key content fields (same as utils/content-hash.ts)
  const content = [
    project.name,
    project.description,
    project.role,
    project.quote,
    (project.technologies || []).join(','),
    (project.keyFeatures || []).join(','),
    (project.targetAudience || []).join(','),
    (project.architectureHighlights || []).join(','),
    project.mongoId || '',
  ].join('|');
  
  // Use crypto for hash
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
}

async function generateScreenshot(
  browser: Awaited<ReturnType<typeof puppeteerCore.launch>>,
  projectSlug: string
): Promise<{ success: boolean; url?: string }> {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    const url = `${BASE_URL}/project/${projectSlug}`;
    console.log(`  Navigating to ${url}...`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.waitForSelector('[data-project-hero-core="true"]', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1500));

    const heroCore = await page.evaluate(() => {
      const core = document.querySelector('[data-project-hero-core="true"]') as HTMLElement | null;
      if (!core) return null;

      const rect = core.getBoundingClientRect();
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

    const horizontalPadding = 8;
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

    // Upload to Blob Storage
    const blobName = `${SCREENSHOT_BLOB_PREFIX}${projectSlug}.png`;
    const { url: blobUrl } = await put(blobName, buffer, {
      access: 'public',
      contentType: 'image/png',
    });

    console.log(`  ✓ Screenshot uploaded: ${blobUrl}`);
    return { success: true, url: blobUrl };
  } catch (error) {
    console.error(`  ✗ Failed to generate screenshot for ${projectSlug}:`, error);
    return { success: false };
  } finally {
    await page.close();
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests (cron jobs use GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel cron jobs are protected by default - no additional authentication needed

  try {
    console.log('🚀 Starting screenshot generation for MongoDB projects...');

    // Load manifest
    const manifest = await loadManifest();
    console.log(`📋 Loaded manifest with ${Object.keys(manifest).length} entries`);

    // Read MongoDB projects from file or API
    const mongoProjects = await readMongoProjects();
    console.log(`📊 Found ${mongoProjects.length} MongoDB projects`);
    
    // Filter out MongoDB projects that have same slug as hardcoded (hardcoded take precedence)
    const filteredMongoProjects = mongoProjects.filter(
      project => !HARDCODED_PROJECT_SLUGS.has(project.slug)
    );

    // For screenshot generation, we only process MongoDB projects (hardcoded top 9 are skipped)
    // All MongoDB projects are below the top 9, so we process all of them
    const allProjectsToProcess = filteredMongoProjects;
    console.log(`📊 Total MongoDB projects (after filtering duplicates): ${filteredMongoProjects.length}`);
    console.log(`📊 Processing all MongoDB projects below top ${SKIP_TOP_N}`);

    // Filter projects that need screenshots (skip those with videos)
    const projectsToProcess = allProjectsToProcess.filter(
      project => !project.youtubeVideoId
    );

    console.log(`📊 Processing ${projectsToProcess.length} projects (excluding videos)`);

    if (projectsToProcess.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No projects to process',
        stats: { generated: 0, skipped: 0, failed: 0 },
      });
    }

    // Launch browser with Vercel-compatible chromium
    const browser = await puppeteerCore.launch({
      args: process.env.VERCEL ? chromium.args : [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.VERCEL 
        ? await chromium.executablePath() 
        : undefined,
      headless: chromium.headless,
    });

    let generated = 0;
    let skipped = 0;
    let failed = 0;

    // Process projects
    for (const project of projectsToProcess) {
      const currentHash = generateContentHash(project);
      const existingEntry = manifest[project.slug];

      // Check if screenshot exists and hash matches
      if (existingEntry?.hash === currentHash) {
        // Check if screenshot exists in Blob Storage
        try {
          const { blobs } = await list({ prefix: `${SCREENSHOT_BLOB_PREFIX}${project.slug}.png` });
          if (blobs.length > 0) {
            console.log(`⏭️  Skipping ${project.slug} (no changes detected)`);
            skipped++;
            continue;
          }
        } catch {
          // Screenshot doesn't exist, regenerate
        }
      }

      console.log(`📸 Generating screenshot for ${project.slug}...`);
      const result = await generateScreenshot(browser, project.slug);

      if (result.success) {
        manifest[project.slug] = {
          hash: currentHash,
          generatedAt: new Date().toISOString(),
        };
        generated++;
      } else {
        failed++;
      }
    }

    // Save manifest
    await saveManifest(manifest);
    console.log('💾 Manifest saved');

    // Close browser
    await browser.close();

    console.log('✅ Screenshot generation completed');

    return res.status(200).json({
      success: true,
      message: 'Screenshots generated successfully',
      stats: {
        generated,
        skipped,
        failed,
        total: projectsToProcess.length,
      },
    });
  } catch (error: any) {
    console.error('❌ Error generating screenshots:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate screenshots',
      message: error.message || 'Unknown error',
    });
  }
}

