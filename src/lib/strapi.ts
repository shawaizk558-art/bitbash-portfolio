/**
 * Strapi Integration Library
 * 
 * Provides unified API for fetching projects from Strapi CMS.
 * Works differently in development vs production:
 * - Production: Always reads from static JSON files
 * - Development: Tries Strapi API first, falls back to JSON
 */

import type { Project } from '@/data/projects';
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
 * Reads from public/data/mongodb-projects.json which is generated
 * daily by the Vercel cron job.
 * 
 * Returns projects with all MongoDB fields preserved (title, description, readme, etc.)
 * 
 * @returns Promise<Project[]>
 */
export async function getMongoProjects(): Promise<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]> {
  try {
    // In Node.js (server-side), try Vercel Blob Storage first, then local file
    if (typeof window === 'undefined') {
      // Try Vercel Blob Storage (production)
      // Check for any BLOB_READ_WRITE_TOKEN variant (Vercel may name it differently)
      const hasBlobToken = process.env.VERCEL || 
        process.env.BLOB_READ_WRITE_TOKEN || 
        Object.keys(process.env).some(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'));
      
      if (hasBlobToken) {
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
        } catch (blobError: any) {
          // Blob doesn't exist or error - fall back to local file
          console.log('Could not read from Blob Storage, trying local file');
        }
      }
      
      // Fallback: Read from local file (for local development)
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
          console.log('MongoDB projects file not found, returning empty array');
          return [];
        }
        throw fileError;
      }
    }
    
    // In browser (client-side), fetch from public directory or Blob Storage URL
    // First try to get the blob URL from an API route, or fallback to local file
    try {
      // Try fetching from API route that serves from Blob Storage
      const apiUrl = '/api/mongodb-projects';
      const response = await fetch(apiUrl, {
        cache: 'no-store',
      });
      
      if (response.ok) {
        const projects = await response.json();
        if (Array.isArray(projects)) {
          return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
        }
      }
    } catch (apiError) {
      // Fallback to local file
    }
    
    // Fallback: Fetch from public directory (local file)
    const response = await fetch('/data/mongodb-projects.json', {
      // Add cache busting for development, but allow caching in production
      cache: 'no-store',
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
      return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching MongoDB projects:', error);
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
    const projects = await getMongoProjects();
    return projects.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching MongoDB project by slug:', error);
    return null;
  }
}

