/**
 * Strapi Integration Library
 * 
 * Provides unified API for fetching projects from Strapi CMS.
 * Works differently in development vs production:
 * - Production: Always reads from static JSON files
 * - Development: Tries Strapi API first, falls back to JSON
 */

import type { Project } from '@/data/projects';

// Environment detection
// Cache for static data
let staticDataCache: {
  projects: Project[] | null;
  projectsIndex: Record<string, string | number> | null;
} = {
  projects: null,
  projectsIndex: null,
};

/**
 * Load static JSON data from public/data/
 * 
 * ROOT CAUSE: 304 responses have empty bodies by design. The fetch API doesn't
 * automatically populate the response body from cache for 304 responses.
 * 
 * SOLUTION: Always use cache-busting for JSON files to prevent 304 responses.
 * This ensures we always get the actual data, not just a 304 status.
 * 
 * Performance impact is minimal since JSON files are small and we have
 * in-memory caching (staticDataCache) to avoid repeated fetches.
 */
async function loadStaticData(filename: string): Promise<any> {
  console.log(`[loadStaticData] Starting to load: ${filename}`);
  
  // Always use cache-busting to prevent 304 responses with empty bodies
  // Use a timestamp to ensure we get fresh data, but the query param
  // changes on each page load, preventing 304 responses
  // The unique query param makes each request unique, preventing 304
  const cacheBuster = `?v=${Date.now()}&_=${Math.random().toString(36).substring(7)}`;
  const url = `/data/${filename}${cacheBuster}`;
  
  console.log(`[loadStaticData] Fetching URL: ${url}`);
  console.log(`[loadStaticData] Cache-buster: ${cacheBuster}`);
  
  // Fetch with reload to bypass cache and ensure we get actual data
  // This prevents 304 responses which have empty bodies
  const fetchStartTime = performance.now();
  const response = await fetch(url, {
    cache: 'reload', // Bypass cache and reload from server
  });
  const fetchEndTime = performance.now();
  
  console.log(`[loadStaticData] Response received for ${filename}:`, {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok,
    contentType: response.headers.get('content-type'),
    fetchTime: `${(fetchEndTime - fetchStartTime).toFixed(2)}ms`,
  });
  
  // 304 should not happen with cache-busting, but handle it just in case
  if (response.status === 304) {
    console.warn(`[loadStaticData] ⚠️ Received 304 for ${filename} despite cache-busting! Attempting bypass...`);
    
    // If we still get 304 (shouldn't happen), force a complete bypass
    const bypassUrl = `/data/${filename}?nocache=${Date.now()}-${Math.random()}`;
    console.log(`[loadStaticData] Bypass URL: ${bypassUrl}`);
    
    const bypassResponse = await fetch(bypassUrl, {
      cache: 'no-store', // Completely bypass cache
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    console.log(`[loadStaticData] Bypass response for ${filename}:`, {
      status: bypassResponse.status,
      statusText: bypassResponse.statusText,
      ok: bypassResponse.ok,
    });
    
    if (!bypassResponse.ok) {
      console.error(`[loadStaticData] ❌ Bypass failed for ${filename}: ${bypassResponse.status} ${bypassResponse.statusText}`);
      throw new Error(`Failed to load ${filename}: ${bypassResponse.status} ${bypassResponse.statusText}`);
    }
    
    const text = await bypassResponse.text();
    console.log(`[loadStaticData] Bypass response body length: ${text?.length || 0} characters`);
    
    if (!text || text.trim().length === 0) {
      console.error(`[loadStaticData] ❌ Empty response body after bypass for ${filename}`);
      throw new Error(`Failed to load ${filename}: Response body is empty after bypass`);
    }
    
    try {
      const parsed = JSON.parse(text);
      console.log(`[loadStaticData] ✅ Successfully parsed ${filename} (via bypass), items: ${Array.isArray(parsed) ? parsed.length : 'object'}`);
      return parsed;
    } catch (parseError) {
      console.error(`[loadStaticData] ❌ JSON parse error for ${filename}:`, parseError);
      throw new Error(`Failed to parse JSON from ${filename}: ${parseError}`);
    }
  }
  
  // Handle other non-ok responses
  if (!response.ok) {
    console.error(`[loadStaticData] ❌ Non-OK response for ${filename}: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
  }
  
  // Read and verify response body
  console.log(`[loadStaticData] Reading response body for ${filename}...`);
  const textStartTime = performance.now();
  const text = await response.text();
  const textEndTime = performance.now();
  
  console.log(`[loadStaticData] Response body read for ${filename}:`, {
    length: text?.length || 0,
    isEmpty: !text || text.trim().length === 0,
    readTime: `${(textEndTime - textStartTime).toFixed(2)}ms`,
  });
  
  if (!text || text.trim().length === 0) {
    console.error(`[loadStaticData] ❌ Empty response body for ${filename}`);
    throw new Error(`Failed to load ${filename}: Response body is empty`);
  }
  
  // Parse JSON
  console.log(`[loadStaticData] Parsing JSON for ${filename}...`);
  const parseStartTime = performance.now();
  try {
    const parsed = JSON.parse(text);
    const parseEndTime = performance.now();
    console.log(`[loadStaticData] ✅ Successfully loaded and parsed ${filename}:`, {
      type: Array.isArray(parsed) ? 'array' : typeof parsed,
      items: Array.isArray(parsed) ? parsed.length : 'N/A',
      parseTime: `${(parseEndTime - parseStartTime).toFixed(2)}ms`,
      totalTime: `${(parseEndTime - fetchStartTime).toFixed(2)}ms`,
    });
    return parsed;
  } catch (parseError) {
    console.error(`[loadStaticData] ❌ JSON parse error for ${filename}:`, parseError);
    console.error(`[loadStaticData] First 200 chars of response:`, text.substring(0, 200));
    throw new Error(`Failed to parse JSON from ${filename}: ${parseError}`);
  }
}

/**
 * Load projects data (cached)
 */
async function loadProjectsData(): Promise<{
  projects: Project[];
  projectsIndex: Record<string, string | number>;
}> {
  console.log('[loadProjectsData] Starting to load projects data...');
  
  // Check if we have cached data
  if (staticDataCache.projects && staticDataCache.projectsIndex) {
    console.log('[loadProjectsData] ✅ Using cached data:', {
      projectsCount: staticDataCache.projects.length,
      indexKeys: Object.keys(staticDataCache.projectsIndex).length,
    });
    return {
      projects: staticDataCache.projects,
      projectsIndex: staticDataCache.projectsIndex,
    };
  }

  console.log('[loadProjectsData] Cache miss - fetching from files...');
  const loadStartTime = performance.now();

  try {
    console.log('[loadProjectsData] Fetching projects.json and projects-index.json in parallel...');
    const [projects, projectsIndex] = await Promise.all([
      loadStaticData('projects.json'),
      loadStaticData('projects-index.json'),
    ]);

    const loadEndTime = performance.now();
    
    console.log('[loadProjectsData] Files loaded, processing data...', {
      projectsType: Array.isArray(projects) ? 'array' : typeof projects,
      projectsLength: Array.isArray(projects) ? projects.length : 'N/A',
      indexType: typeof projectsIndex,
      indexKeys: projectsIndex ? Object.keys(projectsIndex).length : 0,
      loadTime: `${(loadEndTime - loadStartTime).toFixed(2)}ms`,
    });

    staticDataCache.projects = Array.isArray(projects) ? projects : [];
    staticDataCache.projectsIndex = projectsIndex || {};

    console.log('[loadProjectsData] ✅ Successfully loaded and cached projects data:', {
      cachedProjectsCount: staticDataCache.projects.length,
      cachedIndexKeys: Object.keys(staticDataCache.projectsIndex).length,
    });

    return {
      projects: staticDataCache.projects,
      projectsIndex: staticDataCache.projectsIndex,
    };
  } catch (error) {
    const loadEndTime = performance.now();
    console.error('[loadProjectsData] ❌ Error loading static projects data:', error);
    console.error('[loadProjectsData] Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      loadTime: `${(loadEndTime - loadStartTime).toFixed(2)}ms`,
    });
    return { projects: [], projectsIndex: {} };
  }
}

/**
 * Transform Strapi project to frontend Project interface
 */
function transformStrapiProject(strapiProject: any): Project {
  const isV4Format = strapiProject.attributes !== undefined;
  const projectData = isV4Format ? strapiProject.attributes : strapiProject;

  // Extract description (handle rich text)
  let description = '';
  if (projectData.description) {
    if (typeof projectData.description === 'string') {
      description = projectData.description;
    } else if (Array.isArray(projectData.description)) {
      description = projectData.description
        .map((block: any) => {
          if (block.children) {
            return block.children.map((child: any) => child.text || '').join(' ');
          }
          return block.text || '';
        })
        .join(' ');
    }
  }

  // Extract technologies
  let technologies: string[] = [];
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

  return {
    slug: projectData.slug || '',
    name: projectData.name || '',
    role: projectData.role || '',
    quote: projectData.quote || '',
    description: description,
    technologies: technologies,
    videoPlaceholder: (projectData.videoPlaceholder as Project['videoPlaceholder']) || 'purple',
    youtubeVideoId: projectData.youtubeVideoId || undefined,
    rating: projectData.rating || 5,
    targetAudience: projectData.targetAudience || undefined,
    keyFeatures: projectData.keyFeatures || undefined,
    architectureHighlights: projectData.architectureHighlights || undefined,
  };
}

/**
 * Apply filters and sorting to projects
 */
function applyFiltersAndSort(
  projects: Project[],
  params: {
    filters?: Record<string, any>;
    sort?: string;
    pagination?: { page: number; pageSize: number };
  } = {}
): Project[] {
  let result = [...projects];

  // Apply filters
  if (params.filters) {
    result = result.filter((project) => {
      return Object.entries(params.filters).every(([key, value]) => {
        if (key === 'technologies' && Array.isArray(value)) {
          return value.some((tech: string) => project.technologies.includes(tech));
        }
        return (project as any)[key] === value;
      });
    });
  }

  // Apply sorting
  if (params.sort) {
    const [field, direction] = params.sort.split(':');
    result.sort((a, b) => {
      const aVal = (a as any)[field];
      const bVal = (b as any)[field];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Apply pagination
  if (params.pagination) {
    const { page, pageSize } = params.pagination;
    const start = (page - 1) * pageSize;
    result = result.slice(start, start + pageSize);
  }

  return result;
}

/**
 * Get all projects from Strapi
 * 
 * @param params - Optional filters, sorting, and pagination
 * @returns Promise<Project[]>
 */
export async function getProjects(params: {
  filters?: Record<string, any>;
  sort?: string;
  pagination?: { page: number; pageSize: number };
} = {}): Promise<Project[]> {
  console.log('[getProjects] Called with params:', params);
  const startTime = performance.now();
  
  const { projects } = await loadProjectsData();
  console.log('[getProjects] Loaded projects data, applying filters/sort...', {
    totalProjects: projects.length,
  });
  
  const filtered = applyFiltersAndSort(projects, params);
  const endTime = performance.now();
  
  console.log('[getProjects] ✅ Returning projects:', {
    totalProjects: projects.length,
    filteredCount: filtered.length,
    hasFilters: !!params.filters,
    hasSort: !!params.sort,
    hasPagination: !!params.pagination,
    executionTime: `${(endTime - startTime).toFixed(2)}ms`,
  });
  
  return filtered;
}

/**
 * Get a single project by slug
 * 
 * @param slug - Project slug
 * @returns Promise<Project | null>
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  console.log(`[getProjectBySlug] Called with slug: ${slug}`);
  const startTime = performance.now();
  
  const { projects } = await loadProjectsData();
  console.log(`[getProjectBySlug] Loaded projects data, searching for slug: ${slug}`, {
    totalProjects: projects.length,
  });
  
  const project = projects.find((p) => p.slug === slug) || null;
  const endTime = performance.now();
  
  if (project) {
    console.log(`[getProjectBySlug] ✅ Found project:`, {
      slug: project.slug,
      name: project.name,
      executionTime: `${(endTime - startTime).toFixed(2)}ms`,
    });
  } else {
    console.warn(`[getProjectBySlug] ⚠️ Project not found for slug: ${slug}`, {
      availableSlugs: projects.slice(0, 5).map(p => p.slug),
      totalProjects: projects.length,
      executionTime: `${(endTime - startTime).toFixed(2)}ms`,
    });
  }
  
  return project;
}

