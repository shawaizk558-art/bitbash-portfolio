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
const IS_DEV = import.meta.env.DEV;
const IS_PROD = import.meta.env.PROD;

// Strapi API configuration
const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api';

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
 */
async function loadStaticData(filename: string): Promise<any> {
  const response = await fetch(`/data/${filename}`);
  
  if (!response.ok) {
    throw new Error(`Failed to load ${filename}: ${response.statusText}`);
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
  // Production: Always use static files
  if (IS_PROD) {
    const { projects } = await loadProjectsData();
    return applyFiltersAndSort(projects, params);
  }

  // Development: Try API first, fallback to JSON
  if (IS_DEV) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      const response = await fetch(
        `${STRAPI_API_URL}/projects?populate=*&sort=${params.sort || 'displayOrder:asc,publishedAt:desc'}`,
        {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          // Filter out featured projects
          const nonFeatured = data.data.filter((project: any) => {
            const isV4Format = project.attributes !== undefined;
            const projectData = isV4Format ? project.attributes : project;
            return !projectData.isFeatured;
          });
          
          const projects = nonFeatured.map(transformStrapiProject);
          return applyFiltersAndSort(projects, params);
        }
      }
    } catch (error) {
      // API failed, fallback to static files
      console.log('Strapi API unavailable, using static files');
    }
  }

  // Fallback to static files
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
  // Production: Use static index
  if (IS_PROD) {
    const { projects } = await loadProjectsData();
    return projects.find((p) => p.slug === slug) || null;
  }

  // Development: Try API first
  if (IS_DEV) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);

      const response = await fetch(
        `${STRAPI_API_URL}/projects?filters[slug][$eq]=${slug}&populate=*`,
        {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          const project = data.data[0];
          // Check if featured (shouldn't be, but just in case)
          const isV4Format = project.attributes !== undefined;
          const projectData = isV4Format ? project.attributes : project;
          if (projectData.isFeatured) {
            return null; // Featured projects are hardcoded
          }
          return transformStrapiProject(project);
        }
      }
    } catch (error) {
      // API failed, fallback to static files
      console.log('Strapi API unavailable, using static files');
    }
  }

  // Fallback to static files
  const { projects } = await loadProjectsData();
  return projects.find((p) => p.slug === slug) || null;
}

