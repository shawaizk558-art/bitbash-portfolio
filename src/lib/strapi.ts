/**
 * Strapi Integration Library
 * 
 * Provides unified API for fetching projects from Strapi CMS.
 * Works differently in development vs production:
 * - Production: Always reads from static JSON files
 * - Development: Tries Strapi API first, falls back to JSON
 */

import type { Project } from '@/data/projects';
import { cache, CACHE_KEYS, requestDeduplicator } from './cache';
// Use import attribute for NodeNext compatibility (Vercel type checking)
// Vite bundler mode will handle this correctly
import projectsJson from '@/data/strapi-projects.json' with { type: 'json' };

const STATIC_PROJECTS: Project[] = Array.isArray(projectsJson)
  ? (projectsJson as Project[])
  : [];

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
    pricing: projectData.pricing || projectData.priceRange || undefined,
    timeline: projectData.timeline || projectData.deliveryTimeline || undefined,
    postDeliverySupport: projectData.postDeliverySupport || projectData.support || undefined,
    paymentMethods: projectData.paymentMethods || projectData.payments || undefined,
    moreDetails: projectData.moreDetails || projectData.details || undefined,
    developer: projectData.developer || projectData.owner || undefined,
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
  return applyFiltersAndSort(STATIC_PROJECTS, params);
}

/**
 * Get a single project by slug
 * 
 * @param slug - Project slug
 * @returns Promise<Project | null>
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return STATIC_PROJECTS.find((p) => p.slug === slug) || null;
}

/**
 * Get all projects from MongoDB (synced via cron job)
 * 
 * - Production: Reads from Vercel Blob Storage (via API route or direct blob access)
 * - Local: Reads from public/data/mongodb-projects.json (via API route or direct file access)
 * 
 * Returns projects with all MongoDB fields preserved (title, description, readme, etc.)
 * 
 * @returns Promise<Project[]>
 */
/**
 * Check if we're running in production (Vercel)
 */
function isProduction(): boolean {
  return Boolean(process.env.VERCEL);
}

export async function getMongoProjects(): Promise<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]> {
  try {
    // In Node.js (server-side), read from appropriate source based on environment
    if (typeof window === 'undefined') {
      if (isProduction()) {
        // Production: Read from Vercel Blob Storage only
        try {
          const { list } = await import('@vercel/blob');
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
          // Blob doesn't exist yet (first run)
          return [];
        } catch (blobError: any) {
          console.error('[Production] Error reading from Blob Storage:', blobError.message);
          return [];
        }
      } else {
        // Local: Read from local file only
        const fs = await import('fs/promises');
        const path = await import('path');
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
            // MongoDB projects file not found, returning empty array
            return [];
          }
          throw fileError;
        }
      }
    }
    
    // In browser (client-side), fetch from public directory or Blob Storage URL
    // Check cache first
    const cachedProjects = cache.get<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]>(CACHE_KEYS.MONGO_PROJECTS);
    if (cachedProjects) {
      return cachedProjects;
    }

    // Use request deduplication to prevent concurrent duplicate requests
    return requestDeduplicator.getOrCreate(CACHE_KEYS.MONGO_PROJECTS, async () => {
      // Try fetching from API route (handles local vs production automatically)
      try {
        // API route reads from Blob Storage (production) or local file (local)
        const apiUrl = '/api/mongodb-projects';
        const response = await fetch(apiUrl, {
          // OPTIMIZED: Use force-cache with revalidation instead of no-store
          // This enables browser caching while still allowing revalidation
          cache: 'force-cache',
        });
        
      if (response.ok) {
        const data = await response.json();
        // Handle paginated response (new format) or array response (old format)
        let projects: any[];
        if (data.projects && Array.isArray(data.projects)) {
          // New paginated format
          projects = data.projects;
        } else if (Array.isArray(data)) {
          // Old format (backward compatibility)
          projects = data;
        } else {
          projects = [];
        }
        
        if (Array.isArray(projects)) {
          const typedProjects = projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
          // Cache the results (1 hour TTL)
          cache.set(CACHE_KEYS.MONGO_PROJECTS, typedProjects, 3600000);
          return typedProjects;
        }
      }
      } catch (apiError) {
        // Fallback to local file
      }
      
      // Fallback: Fetch from public directory (local file)
      const response = await fetch('/data/mongodb-projects.json', {
        // OPTIMIZED: Use force-cache with revalidation instead of no-store
        cache: 'force-cache',
      });

      if (!response.ok) {
        // File doesn't exist yet or error - return empty array
        if (response.status === 404) {
          return [];
        }
        throw new Error(`Failed to fetch MongoDB projects: ${response.statusText}`);
      }

      const projects = await response.json();
      
      // Validate and return projects with all fields preserved
      if (Array.isArray(projects)) {
        const typedProjects = projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
        // Cache the results (1 hour TTL)
        cache.set(CACHE_KEYS.MONGO_PROJECTS, typedProjects, 3600000);
        return typedProjects;
      }
      
      return [];
    });
  } catch (error) {
    // Silently handle error
    // Return empty array on error (graceful degradation)
    return [];
  }
}

/**
 * Get a single MongoDB project by slug
 * 
 * @param slug - Project slug
 * @returns Promise<Project | null> with MongoDB fields (title, description, readme)
 */
export async function getMongoProjectBySlug(slug: string): Promise<(Project & { title?: string; description?: string; readme?: string; [key: string]: any }) | null> {
  try {
    // Check cache first
    const cacheKey = CACHE_KEYS.MONGO_PROJECT(slug);
    const cachedProject = cache.get<(Project & { title?: string; description?: string; readme?: string; [key: string]: any }) | null>(cacheKey);
    if (cachedProject !== null) {
      return cachedProject;
    }

    // Try optimized single project API route first (client-side only)
    if (typeof window !== 'undefined') {
      // Use request deduplication
      try {
        const project = await requestDeduplicator.getOrCreate(cacheKey, async () => {
          const apiUrl = `/api/mongodb-projects/${slug}`;
          const response = await fetch(apiUrl, {
            // OPTIMIZED: Use force-cache with revalidation instead of no-store
            cache: 'force-cache',
          });
          
          if (response.ok) {
            const projectData = await response.json();
            const typedProject = projectData as (Project & { title?: string; description?: string; readme?: string; [key: string]: any });
            // Cache the result (1 hour TTL)
            cache.set(cacheKey, typedProject, 3600000);
            return typedProject;
          }
          
          if (response.status === 404) {
            // Cache null result to avoid repeated 404 requests (shorter TTL: 5 minutes)
            cache.set(cacheKey, null, 300000);
            return null;
          }
          
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        });
        
        return project;
      } catch (apiError) {
        // Fallback to loading all projects if API route fails
        // Single project API route failed, falling back to loading all projects
      }
    }
    
    // Fallback: Load all projects and find by slug
    const projects = await getMongoProjects();
    const project = projects.find((p) => p.slug === slug) || null;
    // Cache the result
    cache.set(cacheKey, project, project ? 3600000 : 300000);
    return project;
  } catch (error) {
    // Silently handle error
    return null;
  }
}

