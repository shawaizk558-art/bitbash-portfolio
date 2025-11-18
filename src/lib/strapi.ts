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
} = {
  projects: null,
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
  // Always use cache-busting to prevent 304 responses with empty bodies
  // Use a timestamp to ensure we get fresh data, but the query param
  // changes on each page load, preventing 304 responses
  // The unique query param makes each request unique, preventing 304
  const cacheBuster = `?v=${Date.now()}&_=${Math.random().toString(36).substring(7)}`;
  const url = `/data/${filename}${cacheBuster}`;
  
  // Fetch with reload to bypass cache and ensure we get actual data
  // This prevents 304 responses which have empty bodies
  const response = await fetch(url, {
    cache: 'reload', // Bypass cache and reload from server
  });
  
  // 304 should not happen with cache-busting, but handle it just in case
  if (response.status === 304) {
    // If we still get 304 (shouldn't happen), force a complete bypass
    const bypassUrl = `/data/${filename}?nocache=${Date.now()}-${Math.random()}`;
    
    const bypassResponse = await fetch(bypassUrl, {
      cache: 'no-store', // Completely bypass cache
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    if (!bypassResponse.ok) {
      throw new Error(`Failed to load ${filename}: ${bypassResponse.status} ${bypassResponse.statusText}`);
    }
    
    const text = await bypassResponse.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error(`Failed to load ${filename}: Response body is empty after bypass`);
    }
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON from ${filename}: ${parseError}`);
    }
  }
  
  // Handle other non-ok responses
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
  }
  
  // Read and verify response body
  const text = await response.text();
  
  if (!text || text.trim().length === 0) {
    throw new Error(`Failed to load ${filename}: Response body is empty`);
  }
  
  // Parse JSON
  try {
    return JSON.parse(text);
  } catch (parseError) {
    throw new Error(`Failed to parse JSON from ${filename}: ${parseError}`);
  }
}

/**
 * Load projects data (cached)
 * Only loads from projects.json - no index file needed
 */
async function loadProjectsData(): Promise<{
  projects: Project[];
}> {
  // Check if we have cached data
  if (staticDataCache.projects) {
    return {
      projects: staticDataCache.projects,
    };
  }

  try {
    const projects = await loadStaticData('projects.json');
    staticDataCache.projects = Array.isArray(projects) ? projects : [];

    return {
      projects: staticDataCache.projects,
    };
  } catch (error) {
    console.error('Error loading static projects data:', error);
    return { projects: [] };
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
  const { projects } = await loadProjectsData();
  return applyFiltersAndSort(projects, params);
}

/**
 * Get a single project by slug
 * 
 * @param slug - Project slug
 * @returns Promise<Project | null>
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { projects } = await loadProjectsData();
  return projects.find((p) => p.slug === slug) || null;
}

