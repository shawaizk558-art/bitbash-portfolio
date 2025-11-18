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
    // This ensures we always get the JSON body, not just a 304 status
    response = await fetch(`/data/${filename}?v=${Date.now()}`, {
      cache: 'no-store',
    });
    
    // If we still get 304 (shouldn't happen with cache-busting, but be safe)
    if (response.status === 304) {
      throw new Error(`Received 304 Not Modified for ${filename} even with cache-busting. This should not happen.`);
    }
  }
  
  // Handle other non-ok responses
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error(`Invalid content type for ${filename}`);
  }
  
  return await response.json();
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

