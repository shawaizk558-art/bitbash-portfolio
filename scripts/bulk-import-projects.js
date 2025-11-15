/**
 * Bulk Import Projects to Strapi
 * 
 * This script reads a JSON file containing projects and imports them into Strapi CMS
 * via the API. It handles batching, rate limiting, errors, and progress tracking.
 * 
 * Usage: node scripts/bulk-import-projects.js [path-to-projects.json]
 * 
 * Example: node scripts/bulk-import-projects.js scripts/projects-data.json
 * 
 * Make sure Strapi is running on localhost:1337 before running this script
 */

/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Configuration
const STRAPI_API_URL = process.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_ADMIN_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''; // API token for authentication
const BATCH_SIZE = 10; // Number of projects to import per batch
const DELAY_BETWEEN_BATCHES = 1000; // Milliseconds to wait between batches
const MAX_RETRIES = 3; // Maximum retry attempts for failed requests

// Get JSON file path from command line or use default
const projectsFile = process.argv[2] || path.join(__dirname, 'projects-data.json');

/**
 * Load projects from JSON file
 */
function loadProjectsFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const projects = JSON.parse(fileContent);
    
    if (!Array.isArray(projects)) {
      throw new Error('JSON file must contain an array of projects');
    }
    
    console.log(`✓ Loaded ${projects.length} projects from ${filePath}`);
    return projects;
  } catch (error) {
    console.error(`Error loading projects file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Validate a single project
 */
function validateProject(project, index) {
  const errors = [];
  
  if (!project.name || typeof project.name !== 'string') {
    errors.push(`Project ${index}: Missing or invalid 'name' field`);
  }
  
  if (!project.slug || typeof project.slug !== 'string') {
    errors.push(`Project ${index}: Missing or invalid 'slug' field`);
  }
  
  if (!project.role || typeof project.role !== 'string') {
    errors.push(`Project ${index}: Missing or invalid 'role' field`);
  }
  
  if (!project.quote || typeof project.quote !== 'string') {
    errors.push(`Project ${index}: Missing or invalid 'quote' field`);
  }
  
  if (!project.description || typeof project.description !== 'string') {
    errors.push(`Project ${index}: Missing or invalid 'description' field`);
  }
  
  // Validate technologies array
  if (project.technologies && !Array.isArray(project.technologies)) {
    errors.push(`Project ${index}: 'technologies' must be an array`);
  }
  
  // Validate rating
  if (project.rating !== undefined && (typeof project.rating !== 'number' || project.rating < 1 || project.rating > 5)) {
    errors.push(`Project ${index}: 'rating' must be a number between 1 and 5`);
  }
  
  return errors;
}

/**
 * Validate all projects
 */
function validateProjects(projects) {
  console.log('Validating projects...');
  const allErrors = [];
  
  projects.forEach((project, index) => {
    const errors = validateProject(project, index + 1);
    if (errors.length > 0) {
      allErrors.push(...errors);
    }
  });
  
  if (allErrors.length > 0) {
    console.error('\n❌ Validation errors found:');
    allErrors.forEach(error => console.error(`  - ${error}`));
    console.error('\nPlease fix these errors before importing.');
    process.exit(1);
  }
  
  console.log(`✓ All ${projects.length} projects are valid\n`);
}

/**
 * Transform project data to Strapi format
 */
function transformProjectForStrapi(project) {
  const data = {
    name: project.name,
    slug: project.slug,
    role: project.role,
    quote: project.quote,
    description: project.description,
    technologies: project.technologies || [],
    rating: project.rating || 5,
    isFeatured: project.isFeatured || false,
    displayOrder: project.displayOrder || 0,
    publishedAt: project.publishedAt || new Date().toISOString(),
  };
  
  // Only add optional fields if they exist in your Strapi schema
  // Comment out fields that don't exist in your Strapi content type
  
  // Optional fields (uncomment if they exist in Strapi):
  // if (project.targetAudience && Array.isArray(project.targetAudience) && project.targetAudience.length > 0) {
  //   data.targetAudience = project.targetAudience;
  // }
  // if (project.keyFeatures && Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0) {
  //   data.keyFeatures = project.keyFeatures;
  // }
  // if (project.architectureHighlights && Array.isArray(project.architectureHighlights) && project.architectureHighlights.length > 0) {
  //   data.architectureHighlights = project.architectureHighlights;
  // }
  // if (project.youtubeVideoId) {
  //   data.youtubeVideoId = project.youtubeVideoId;
  // }
  // if (project.seoTitle) {
  //   data.seoTitle = project.seoTitle;
  // }
  // if (project.seoDescription) {
  //   data.seoDescription = project.seoDescription;
  // }
  
  return { data };
}

/**
 * Create a single project in Strapi
 */
async function createProject(project, retryCount = 0) {
  const url = `${STRAPI_API_URL}/projects`;
  const payload = transformProjectForStrapi(project);
  
  // Prepare headers with authentication if token is provided
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle duplicate slug error
      if (response.status === 400 && errorData.error?.message?.includes('slug')) {
        return { success: false, skipped: true, reason: 'Duplicate slug' };
      }
      
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`  ⚠️  Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
      return createProject(project, retryCount + 1);
    }
    
    return { 
      success: false, 
      error: error.message,
      skipped: false 
    };
  }
}

/**
 * Check if Strapi is accessible
 */
async function checkStrapiConnection() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/projects?pagination[limit]=1`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get existing projects from Strapi (to check for duplicates)
 */
async function getExistingProjects() {
  try {
    const response = await fetch(`${STRAPI_API_URL}/projects?pagination[limit]=10000`);
    if (response.ok) {
      const data = await response.json();
      return new Set((data.data || []).map(p => {
        const isV4Format = p.attributes !== undefined;
        return isV4Format ? p.attributes.slug : p.slug;
      }));
    }
  } catch (error) {
    console.warn('⚠️  Could not fetch existing projects for duplicate check');
  }
  return new Set();
}

/**
 * Process projects in batches
 */
async function importProjects(projects) {
  console.log('Starting bulk import...\n');
  
  // Check for API token
  if (!STRAPI_API_TOKEN) {
    console.warn('⚠️  Warning: No API token found.');
    console.warn('   Creating projects requires authentication.');
    console.warn('   Set STRAPI_API_TOKEN environment variable or create .env file.');
    console.warn('   See scripts/GET-API-TOKEN.md for instructions.\n');
  } else {
    console.log('✓ API token found\n');
  }
  
  // Check Strapi connection
  const isConnected = await checkStrapiConnection();
  if (!isConnected) {
    console.error('❌ Cannot connect to Strapi API.');
    console.error(`   Make sure Strapi is running on ${STRAPI_ADMIN_URL}`);
    process.exit(1);
  }
  
  console.log('✓ Connected to Strapi API\n');
  
  // Get existing projects to skip duplicates
  console.log('Checking for existing projects...');
  const existingSlugs = await getExistingProjects();
  console.log(`✓ Found ${existingSlugs.size} existing projects\n`);
  
  // Filter out projects that already exist
  const projectsToImport = projects.filter(p => !existingSlugs.has(p.slug));
  const skippedCount = projects.length - projectsToImport.length;
  
  if (skippedCount > 0) {
    console.log(`⚠️  Skipping ${skippedCount} projects that already exist\n`);
  }
  
  if (projectsToImport.length === 0) {
    console.log('✅ All projects already exist in Strapi. Nothing to import.');
    return;
  }
  
  console.log(`Importing ${projectsToImport.length} projects in batches of ${BATCH_SIZE}...\n`);
  
  const results = {
    success: 0,
    failed: 0,
    skipped: skippedCount,
    errors: []
  };
  
  // Process in batches
  for (let i = 0; i < projectsToImport.length; i += BATCH_SIZE) {
    const batch = projectsToImport.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(projectsToImport.length / BATCH_SIZE);
    
    console.log(`Batch ${batchNumber}/${totalBatches} (${batch.length} projects)...`);
    
    // Process batch concurrently
    const batchPromises = batch.map(async (project, index) => {
      const projectNumber = i + index + 1;
      const result = await createProject(project);
      
      if (result.success) {
        console.log(`  ✓ [${projectNumber}/${projectsToImport.length}] ${project.name}`);
        results.success++;
      } else if (result.skipped) {
        console.log(`  ⊘ [${projectNumber}/${projectsToImport.length}] ${project.name} (skipped: ${result.reason})`);
        results.skipped++;
      } else {
        console.log(`  ✗ [${projectNumber}/${projectsToImport.length}] ${project.name} - ${result.error}`);
        results.failed++;
        results.errors.push({
          project: project.name,
          slug: project.slug,
          error: result.error
        });
      }
      
      return result;
    });
    
    await Promise.all(batchPromises);
    
    // Wait between batches (except for the last one)
    if (i + BATCH_SIZE < projectsToImport.length) {
      console.log(`  Waiting ${DELAY_BETWEEN_BATCHES}ms before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('Import Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully imported: ${results.success}`);
  console.log(`✗ Failed: ${results.failed}`);
  console.log(`⊘ Skipped: ${results.skipped}`);
  console.log(`📊 Total processed: ${projects.length}`);
  console.log('='.repeat(50));
  
  if (results.errors.length > 0) {
    console.log('\n❌ Errors:');
    results.errors.forEach(({ project, slug, error }) => {
      console.log(`  - ${project} (${slug}): ${error}`);
    });
  }
  
  if (results.failed > 0) {
    console.log('\n⚠️  Some projects failed to import. Check the errors above.');
    process.exit(1);
  } else {
    console.log('\n✅ All projects imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run export-data');
    console.log('2. Verify projects appear on your website');
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Strapi Bulk Project Import');
  console.log('='.repeat(50));
  console.log(`Strapi API: ${STRAPI_API_URL}`);
  console.log(`Projects file: ${projectsFile}`);
  console.log('='.repeat(50) + '\n');
  
  // Load projects
  const projects = loadProjectsFromFile(projectsFile);
  
  // Validate projects
  validateProjects(projects);
  
  // Import projects
  await importProjects(projects);
}

// Run import
main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});

