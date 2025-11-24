/**
 * Export Strapi Data to Static JSON Files
 * 
 * This script fetches all projects from Strapi API (running locally)
 * and exports it to static JSON files in public/data/
 * 
 * Usage: node scripts/export-strapi-data.js
 * 
 * Make sure Strapi is running on localhost:1337 before running this script
 */

/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const STRAPI_API_URL = process.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';
const DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const SRC_DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const SRC_PROJECTS_FILENAME = 'strapi-projects.json';
const SRC_PROJECTS_PATH = path.join(SRC_DATA_DIR, SRC_PROJECTS_FILENAME);

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created directory: ${DATA_DIR}`);
}

/**
 * Fetch data from Strapi API
 */
async function fetchStrapiData(endpoint) {
  const url = `${STRAPI_API_URL}/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw error;
  }
}

/**
 * Extract plain text from rich text/JSON description
 */
function extractTextFromRichText(richText) {
  if (!richText) return '';
  
  if (typeof richText === 'string') {
    return richText;
  }
  
  if (typeof richText === 'object') {
    // Handle Strapi rich text blocks format
    if (Array.isArray(richText)) {
      return richText
        .map(block => {
          if (block.children) {
            return block.children.map(child => child.text || '').join(' ');
          }
          return block.text || '';
        })
        .join(' ');
    }
    
    // Handle other object formats
    if (richText.text) return richText.text;
    if (richText.content) return richText.content;
  }
  
  return '';
}

/**
 * Transform Strapi project data to frontend Project interface
 */
function transformStrapiProject(strapiProject) {
  // Handle both Strapi v4 (with attributes) and v5 (direct fields) formats
  const isV4Format = strapiProject.attributes !== undefined;
  const projectData = isV4Format ? strapiProject.attributes : strapiProject;
  const id = strapiProject.id || strapiProject.documentId;

  // Extract description (handle rich text)
  const description = extractTextFromRichText(projectData.description || '');
  
  // Extract technologies array from JSON
  let technologies = [];
  if (projectData.technologies) {
    if (Array.isArray(projectData.technologies)) {
      technologies = projectData.technologies;
    } else if (typeof projectData.technologies === 'string') {
      try {
        technologies = JSON.parse(projectData.technologies);
      } catch {
        technologies = [];
      }
    }
  }

  // Extract optional JSON arrays
  const extractJSONArray = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Handle image URLs (if previewImage exists)
  let imageUrl = null;
  if (projectData.previewImage) {
    const imageData = projectData.previewImage.data || projectData.previewImage;
    if (imageData) {
      if (typeof imageData === 'object' && imageData.attributes) {
        imageUrl = imageData.attributes.url;
      } else if (typeof imageData === 'object' && imageData.url) {
        imageUrl = imageData.url;
      } else if (typeof imageData === 'string') {
        imageUrl = imageData;
      }
      
      // Convert localhost URLs to relative paths for production
      if (imageUrl && imageUrl.includes('localhost:1337')) {
        imageUrl = imageUrl.replace(STRAPI_URL, '');
      } else if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        imageUrl = `/${imageUrl}`;
      }
    }
  }

  // Use slug directly from API
  const slug = projectData.slug || '';
  
  // Generate pageRoute from slug
  const routeSlug = slug
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const pageRoute = `/project/${routeSlug}`;

  return {
    id: id || projectData.documentId || '',
    slug: slug || id?.toString() || '',
    name: projectData.name || '',
    role: projectData.role || '',
    quote: projectData.quote || '',
    description: description,
    technologies: technologies,
    // Default videoPlaceholder to "purple" since field doesn't exist
    videoPlaceholder: 'purple',
    // youtubeVideoId is optional - default to undefined
    youtubeVideoId: projectData.youtubeVideoId || undefined,
    rating: projectData.rating || 5,
    // Optional fields
    targetAudience: extractJSONArray(projectData.targetAudience),
    keyFeatures: extractJSONArray(projectData.keyFeatures),
    architectureHighlights: extractJSONArray(projectData.architectureHighlights),
    // Image URL if previewImage exists
    imageUrl: imageUrl || undefined,
    // Metadata
    displayOrder: projectData.displayOrder || 0,
    publishedAt: projectData.publishedAt || projectData.createdAt || null,
    createdAt: projectData.createdAt || null,
    updatedAt: projectData.updatedAt || null,
  };
}

/**
 * Export projects
 */
async function exportProjects() {
  try {
    console.log('Fetching projects from Strapi...');
    const response = await fetchStrapiData('projects?populate=*&sort=displayOrder:asc,publishedAt:desc');
    
    if (!response.data || !Array.isArray(response.data)) {
      console.warn('No projects found or invalid response format');
      return { projects: [], index: {} };
    }
    
    // Filter out featured projects (isFeatured = true) - these stay hardcoded
    const nonFeaturedProjects = response.data.filter(project => {
      const isV4Format = project.attributes !== undefined;
      const projectData = isV4Format ? project.attributes : project;
      return !projectData.isFeatured;
    });
    
    const projects = nonFeaturedProjects.map(transformStrapiProject);
    const index = {};
    
    // Create slug -> project mapping for quick lookup
    projects.forEach(project => {
      index[project.slug] = project.id;
    });
    
    console.log(`✓ Exported ${projects.length} projects (${response.data.length - projects.length} featured projects excluded)`);
    return { projects, index };
  } catch (error) {
    console.error('Error exporting projects:', error.message);
    // Return empty data if Strapi is unavailable
    return { projects: [], index: {} };
  }
}

/**
 * Read existing JSON file if it exists
 */
function readExistingJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`⚠️  Could not read existing ${filename}:`, error.message);
      return null;
    }
  }
  return null;
}

/**
 * Write JSON file (only if we have data, or if file doesn't exist)
 */
function writeJSONFile(filename, data, preserveExisting = true) {
  const filePath = path.join(DATA_DIR, filename);
  
  // If we should preserve existing files and the new data is empty
  if (preserveExisting) {
    const isEmpty = Array.isArray(data) ? data.length === 0 : Object.keys(data || {}).length === 0;
    
    if (isEmpty) {
      const existing = readExistingJSONFile(filename);
      if (existing) {
        const existingIsEmpty = Array.isArray(existing) ? existing.length === 0 : Object.keys(existing).length === 0;
        if (!existingIsEmpty) {
          console.log(`⚠️  Skipping write for ${filename} - new data is empty, preserving existing file with data`);
          return;
        }
      }
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  const dataInfo = Array.isArray(data) ? `${data.length} items` : `${Object.keys(data || {}).length} keys`;
  console.log(`✓ Written ${filename} (${dataInfo})`);
}

function mirrorProjectsToSrc(data) {
  try {
    fs.mkdirSync(SRC_DATA_DIR, { recursive: true });
    fs.writeFileSync(SRC_PROJECTS_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✓ Mirrored projects to src/data/${SRC_PROJECTS_FILENAME}`);
  } catch (error) {
    console.warn(`⚠️  Could not mirror projects to src/data: ${error.message}`);
  }
}

/**
 * Main export function
 */
async function exportData() {
  console.log('Starting Strapi data export...');
  console.log(`Strapi API URL: ${STRAPI_API_URL}`);
  console.log(`Output directory: ${DATA_DIR}\n`);
  
  // Check if projects.json already exists and has data
  const projectsJsonPath = path.join(DATA_DIR, 'projects.json');
  const existingProjects = readExistingJSONFile('projects.json');
  const hasExistingData = existingProjects && 
    (Array.isArray(existingProjects) ? existingProjects.length > 0 : Object.keys(existingProjects).length > 0);
  
  if (hasExistingData) {
    console.log(`✓ Found existing projects.json with ${Array.isArray(existingProjects) ? existingProjects.length : 'data'} projects`);
  }
  
  // Check if Strapi is available
  let strapiAvailable = false;
  try {
    const healthCheck = await fetch(`${STRAPI_API_URL.replace('/api', '')}/api`, {
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    if (healthCheck.ok) {
      strapiAvailable = true;
      console.log('✓ Strapi API is available');
    }
  } catch (error) {
    console.warn('⚠️  Warning: Could not connect to Strapi API.');
    console.warn(`   Error: ${error.message}`);
    console.warn('   This is normal in production builds if Strapi is not deployed.\n');
  }
  
  // If Strapi is not available AND we have existing data, skip export entirely
  if (!strapiAvailable && hasExistingData) {
    console.log('\n✅ Skipping export - Strapi unavailable but existing data found.');
    console.log('   Using existing projects.json file.');
    console.log('   To update: Run export locally with Strapi running, then commit and push.\n');
    mirrorProjectsToSrc(existingProjects || []);
    return;
  }
  
  // Export projects
  const { projects, index: projectsIndex } = await exportProjects();
  
  // CRITICAL: Only write if we have actual data
  // Never overwrite existing files with empty data
  const hasProjects = Array.isArray(projects) && projects.length > 0;
  const hasIndex = projectsIndex && Object.keys(projectsIndex || {}).length > 0;
  
  if (hasProjects) {
    // We have data from Strapi - write it
    writeJSONFile('projects.json', projects, false); // Don't preserve when we have new data
    console.log(`✓ Updated projects.json with ${projects.length} projects from Strapi`);
  } else if (hasExistingData) {
    // No data from Strapi but we have existing data - preserve it
    console.log('⚠️  No projects from Strapi, preserving existing projects.json');
  } else {
    // No data and no existing file - write empty array (so frontend doesn't error)
    writeJSONFile('projects.json', projects, false);
    console.warn('⚠️  Wrote empty projects.json - no data available and no existing file');
  }
  
  // Only write index if we have data (we don't use it anymore, but keep for compatibility)
  if (hasIndex) {
    writeJSONFile('projects-index.json', projectsIndex, false);
  }

  const projectsForSrc = hasProjects
    ? projects
    : (readExistingJSONFile('projects.json') || []);

  mirrorProjectsToSrc(projectsForSrc);
  
  if (projects.length === 0 && !strapiAvailable && !hasExistingData) {
    console.warn('\n⚠️  WARNING: No projects exported and no existing data found!');
    console.warn('   The projects.json file will be empty.');
    console.warn('   To fix: Run export locally with Strapi running, then commit and push.');
  } else if (projects.length === 0 && !strapiAvailable && hasExistingData) {
    console.log('\n✅ Export complete - using existing data');
  } else if (projects.length === 0) {
    console.warn('⚠️  No projects exported. Check if Strapi is running and has content.');
  } else {
    console.log(`\n✅ Export complete! Exported ${projects.length} projects.`);
  }
  
  console.log(`   Files location: ${DATA_DIR}`);
  console.log('   Remember to commit these files to Git before deploying.');
}

// Run export
exportData().catch(err => {
  console.error('Fatal error during export:', err);
  process.exit(1);
});

