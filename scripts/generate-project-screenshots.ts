import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { projects as hardcodedProjects } from '../src/data/projects';
import { getProjects } from '../src/lib/strapi';
import { generateContentHash } from './utils/content-hash';
import type { Project } from '../src/data/projects';

const SCREENSHOT_DIR = path.join(process.cwd(), 'public', 'project-screenshots');
const MANIFEST_PATH = path.join(process.cwd(), 'scripts', 'screenshot-manifest.json');
const BASE_URL = 'http://localhost:8080';
const SKIP_TOP_N = 9; // Skip first 9 projects

interface ScreenshotManifest {
  [slug: string]: {
    hash: string;
    generatedAt: string;
  };
}

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function loadManifest(): Promise<ScreenshotManifest> {
  try {
    const content = await fs.readFile(MANIFEST_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function saveManifest(manifest: ScreenshotManifest) {
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
}

async function waitForServer(url: string, maxAttempts = 30): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return false;
}

async function generateScreenshot(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  projectSlug: string,
  outputPath: string
): Promise<boolean> {
  const page = await browser.newPage();
  
  try {
    // Set viewport size (wide enough to capture hero section)
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Retina quality
    });

    const url = `${BASE_URL}/project/${projectSlug}`;
    console.log(`  Navigating to ${url}...`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for hero section to load
    // The hero section is the section containing the project title (h1) in the Hero component
    await page.waitForSelector('section h1', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for animations and content to render

    // Find the hero section element
    // Look for the section that contains the project title and is after the back button
    const heroSection = await page.evaluate(() => {
      // Find all sections
      const sections = Array.from(document.querySelectorAll('section'));
      
      // Find the section that contains the hero (has h1 with project name and hero background)
      // It should be after the back button container
      for (const section of sections) {
        const h1 = section.querySelector('h1');
        const hasHeroBackground = section.querySelector('[class*="HeroBackground"]') || 
                                  section.querySelector('[class*="hero"]');
        
        // Check if this is the hero section (has title and hero styling)
        if (h1 && (hasHeroBackground || section.querySelector('[class*="container-responsive"]'))) {
          const rect = section.getBoundingClientRect();
          // Only return if it's visible and has reasonable dimensions
          if (rect.height > 200 && rect.width > 300) {
            return {
              x: Math.max(0, rect.x),
              y: Math.max(0, rect.y),
              width: rect.width,
              height: rect.height,
            };
          }
        }
      }
      
      // Fallback: find first section after back button
      const backButton = document.querySelector('a[href="/"]');
      if (backButton) {
        const backButtonRect = backButton.closest('div')?.getBoundingClientRect();
        if (backButtonRect) {
          for (const section of sections) {
            const rect = section.getBoundingClientRect();
            // Section should be below the back button
            if (rect.y > backButtonRect.bottom && rect.height > 200) {
              return {
                x: Math.max(0, rect.x),
                y: Math.max(0, rect.y),
                width: rect.width,
                height: rect.height,
              };
            }
          }
        }
      }
      
      return null;
    });

    if (!heroSection) {
      throw new Error('Hero section not found');
    }

    // Take screenshot of only the hero section
    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: {
        x: Math.round(heroSection.x),
        y: Math.round(heroSection.y),
        width: Math.round(heroSection.width),
        height: Math.round(heroSection.height),
      },
    });

    console.log(`  ✓ Screenshot saved: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to generate screenshot for ${projectSlug}:`, error);
    return false;
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🚀 Starting project screenshot generation...\n');

  // Ensure directories exist
  await ensureDirectoryExists(SCREENSHOT_DIR);

  // Load manifest
  const manifest = await loadManifest();
  console.log(`📋 Loaded manifest with ${Object.keys(manifest).length} entries\n`);

  // Get all projects (hardcoded + Strapi) - same logic as Projects.tsx
  const strapiProjects = await getProjects({
    sort: 'displayOrder:asc,publishedAt:desc'
  });
  
  // Filter out Strapi projects that have same slug as hardcoded (hardcoded take precedence)
  const hardcodedSlugs = new Set(hardcodedProjects.map(p => p.slug));
  const filteredStrapiProjects = strapiProjects.filter(
    project => !hardcodedSlugs.has(project.slug)
  );

  // Combine all projects: hardcoded first, then Strapi (same as Projects.tsx)
  const allProjects: Project[] = [...hardcodedProjects, ...filteredStrapiProjects];
  
  // Filter projects (skip top 9)
  const projectsToProcess = allProjects.slice(SKIP_TOP_N);
  console.log(`📊 Total projects: ${allProjects.length}`);
  console.log(`📊 Processing ${projectsToProcess.length} projects (skipped top ${SKIP_TOP_N})\n`);

  if (projectsToProcess.length === 0) {
    console.log('✅ No projects to process. Exiting.');
    return;
  }

  // Check if dev server is running
  console.log('🔍 Checking if dev server is running...');
  const serverReady = await waitForServer(BASE_URL);
  
  if (!serverReady) {
    console.error('❌ Dev server is not running!');
    console.error(`   Please start it with: npm run dev`);
    console.error(`   Then run this script in another terminal.`);
    process.exit(1);
  }
  console.log('✅ Dev server is running\n');

  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('✅ Browser launched\n');

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  // Process projects
  for (const project of projectsToProcess) {
    // Skip projects with YouTube videos or preview videos (same logic as Projects.tsx)
    // Only generate screenshots for projects without videos
    if (project.youtubeVideoId) {
      console.log(`⏭️  Skipping ${project.slug} (has YouTube video)`);
      skipped++;
      continue;
    }

    const currentHash = generateContentHash(project);
    const existingEntry = manifest[project.slug];
    const screenshotPath = path.join(SCREENSHOT_DIR, `${project.slug}.png`);

    // Check if screenshot exists and hash matches
    if (existingEntry?.hash === currentHash) {
      try {
        await fs.access(screenshotPath);
        console.log(`⏭️  Skipping ${project.slug} (no changes detected)`);
        skipped++;
        continue;
      } catch {
        // Screenshot file doesn't exist, regenerate
      }
    }

    console.log(`📸 Generating screenshot for ${project.slug}...`);
    const success = await generateScreenshot(browser, project.slug, screenshotPath);

    if (success) {
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
  console.log('\n💾 Manifest saved');

  // Close browser
  await browser.close();

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n✅ Done!`);
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

