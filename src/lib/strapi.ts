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
 * Handles 304 (Not Modified) responses gracefully. A 304 status means the cached
 * version is still valid, but the response body is empty. We handle this by
 * retrying with cache-busting when needed.
 */
async function loadStaticData(filename: string): Promise<any> {
  // First attempt: try normal fetch (allows browser/CDN caching)
  let response = await fetch(`/data/${filename}`);
  
  // If we get 304, the response body is empty, so we need to force a fresh fetch
  // This is more common in production (Vercel CDN) than local dev
  if (response.status === 304) {
    // Retry with cache-busting parameter to get the actual data
    // Use both query param and headers to ensure we bypass all caches
    const cacheBuster = `?v=${Date.now()}&_=${Math.random()}`;
    response = await fetch(`/data/${filename}${cacheBuster}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
    // If we still get 304 (shouldn't happen with cache-busting, but be safe)
    if (response.status === 304) {
      // Last resort: try with a completely different approach
      // Use a unique path that won't be cached
      const finalUrl = `/data/${filename}?nocache=${Date.now()}-${Math.random().toString(36).substring(7)}`;
      response = await fetch(finalUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      
      if (response.status === 304 || !response.ok) {
        throw new Error(`Failed to load ${filename}: Received ${response.status} ${response.statusText} even after cache-busting attempts`);
      }
    }
  }
  
  // Handle other non-ok responses
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
  }
  
  // Verify we have a response body before parsing
  const text = await response.text();
  if (!text || text.trim().length === 0) {
    // If body is empty, retry with cache-busting
    const retryUrl = `/data/${filename}?retry=${Date.now()}`;
    const retryResponse = await fetch(retryUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
    
    if (!retryResponse.ok) {
      throw new Error(`Failed to load ${filename}: Empty response body and retry failed with ${retryResponse.status}`);
    }
    
    const retryText = await retryResponse.text();
    if (!retryText || retryText.trim().length === 0) {
      throw new Error(`Failed to load ${filename}: Response body is empty`);
    }
    
    try {
      return JSON.parse(retryText);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON from ${filename}: ${parseError}`);
    }
  }
  
  // Parse the JSON
  try {
    return JSON.parse(text);
  } catch (parseError) {
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
  if (staticDataCache.projects && staticDataCache.projectsIndex) {
    return {
      projects: staticDataCache.projects,
      projectsIndex: staticDataCache.projectsIndex,
    };
  }

  try {
    const [projects, projectsIndex] = await Promise.all([
      loadStaticData('projects.json'),
      loadStaticData('projects-index.json'),
    ]);

    staticDataCache.projects = Array.isArray(projects) ? projects : [];
    staticDataCache.projectsIndex = projectsIndex || {};

    return {
      projects: staticDataCache.projects,
      projectsIndex: staticDataCache.projectsIndex,
    };
  } catch (error) {
    console.error('Error loading static projects data:', error);
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

