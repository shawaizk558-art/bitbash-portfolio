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

/**
 * Check if we're in development (local)
 */
function isDevelopment(): boolean {
  return typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
}

/**
 * Send debug log only in development
 */
function debugLog(data: any): void {
  if (isDevelopment()) {
    fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
  }
}

export async function getMongoProjects(): Promise<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]> {
  // #region agent log
  debugLog({location:'strapi.ts:169',message:'getMongoProjects called',data:{isServer:typeof window==='undefined',isProd:typeof window==='undefined'?Boolean(process.env.VERCEL):false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C'});
  // #endregion
  try {
    // In Node.js (server-side), always try Blob Storage first, fallback to local file in development
    if (typeof window === 'undefined') {
      // #region agent log
      debugLog({location:'strapi.ts:173',message:'Server-side execution path',data:{isProduction:isProduction(),vercelEnv:process.env.VERCEL},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'});
      // #endregion
      
      // Always try Blob Storage first (works in both local and production if BLOB_READ_WRITE_TOKEN is set)
      // Get blob token from environment
      const getBlobToken = (): string | undefined => {
        return process.env.BLOB_READ_WRITE_TOKEN ||
          process.env.Blob_projects_READ_WRITE_TOKEN ||
          Object.keys(process.env)
            .find(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'))
            ? process.env[Object.keys(process.env).find(key => key.includes('BLOB') && key.includes('READ_WRITE_TOKEN'))!]
            : undefined;
      };
      
      const blobToken = getBlobToken();
      const hasBlobToken = Boolean(process.env.VERCEL || blobToken);
      
      if (hasBlobToken) {
        try {
          const { list } = await import('@vercel/blob');
          
          // Strategy 1: Try list() with prefix
          const listOptions: any = { prefix: 'mongodb-projects.json' };
          if (blobToken) {
            listOptions.token = blobToken;
          }
          const { blobs } = await list(listOptions);
          console.log(`[SSR] Found ${blobs.length} blobs with prefix`);
          if (blobs.length > 0) {
            console.log(`[SSR] Available blobs:`, blobs.map(b => b.pathname).join(', '));
          }
          
          let blob = blobs.find(b => b.pathname === 'mongodb-projects.json');
          
          // If no exact match, try first blob
          if (!blob && blobs.length > 0) {
            blob = blobs[0];
          }
          
          if (blob && blob.url) {
            debugLog({location:'strapi.ts:180',message:'Fetching from blob URL (SSR)',data:{blobUrl:blob.url,blobPathname:blob.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
            const response = await fetch(blob.url);
            if (response.ok) {
              const content = await response.text();
              const projects = JSON.parse(content);
              debugLog({location:'strapi.ts:186',message:'SSR blob fetch success (list)',data:{projectCount:Array.isArray(projects)?projects.length:0,source:'blob-storage'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
              if (Array.isArray(projects)) {
                return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
              }
            }
          } else {
            // Strategy 2: Try listing all blobs
            try {
              const listAllOptions: any = {};
              if (blobToken) {
                listAllOptions.token = blobToken;
              }
              const { blobs: allBlobs } = await list(listAllOptions);
              console.log(`[SSR] Found ${allBlobs.length} total blobs`);
              const matchingBlob = allBlobs.find(b => 
                b.pathname === 'mongodb-projects.json' || 
                b.pathname.includes('mongodb-projects.json')
              );
              if (matchingBlob && matchingBlob.url) {
                const response = await fetch(matchingBlob.url);
                if (response.ok) {
                  const content = await response.text();
                  const projects = JSON.parse(content);
                  if (Array.isArray(projects)) {
                    return projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
                  }
                }
              }
            } catch (fullListError: any) {
              console.error('[SSR] Error listing all blobs:', fullListError.message);
            }
          }
        } catch (blobError: any) {
          console.error('[SSR] Error reading from Blob Storage:', blobError.message);
          console.error('[SSR] Error stack:', blobError.stack);
          // Continue to fallback if in local development
        }
      } else {
        const allBlobEnvVars = Object.keys(process.env).filter(k => k.includes('BLOB'));
        console.log('[SSR] No blob token found. Available env vars:', allBlobEnvVars.join(', ') || 'none');
        console.log('[SSR] All env vars with BLOB:', allBlobEnvVars);
      }
      
      // Fallback: In local development, try reading from local file
      if (!isProduction()) {
        const fs = await import('fs/promises');
        const path = await import('path');
        const filePath = path.join(process.cwd(), 'public', 'data', 'mongodb-projects.json');
        try {
          const content = await fs.readFile(filePath, 'utf-8');
          const projects = JSON.parse(content);
          // #region agent log
          debugLog({location:'strapi.ts:203',message:'SSR local file read success (fallback)',data:{projectCount:Array.isArray(projects)?projects.length:0,filePath,source:'local-file'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
          // #endregion
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
      
      // Production: If blob storage fails, return empty array (no local file fallback)
      return [];
    }
    
    // In browser (client-side), fetch from public directory or Blob Storage URL
    // Check cache first
    const cachedProjects = cache.get<(Project & { title?: string; description?: string; readme?: string; [key: string]: any })[]>(CACHE_KEYS.MONGO_PROJECTS);
    // #region agent log
    debugLog({location:'strapi.ts:222',message:'Client-side cache check',data:{hasCache:!!cachedProjects,cacheCount:cachedProjects?.length||0,source:'memory-cache'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    // #endregion
    if (cachedProjects) {
      return cachedProjects;
    }

    // Use request deduplication to prevent concurrent duplicate requests
    return requestDeduplicator.getOrCreate(CACHE_KEYS.MONGO_PROJECTS, async () => {
      // Try fetching from API route (handles local vs production automatically)
      try {
        // API route reads from Blob Storage (production) or local file (local)
        const apiUrl = '/api/mongodb-projects';
        // #region agent log
        debugLog({location:'strapi.ts:232',message:'Fetching from API route',data:{apiUrl,cacheStrategy:'no-cache'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'});
        // #endregion
        const response = await fetch(apiUrl, {
          // Use no-cache to avoid stale HTML error pages
          cache: 'no-cache',
        });
        
        // #region agent log
        const contentType = response.headers.get('content-type') || '';
        debugLog({location:'strapi.ts:256',message:'API response received',data:{status:response.status,statusText:response.statusText,contentType,isOk:response.ok,url:response.url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'});
        // #endregion
        
      if (response.ok) {
        // Check if response is actually JSON before parsing
        if (!contentType.includes('application/json')) {
          // #region agent log
          const responseText = await response.text().catch(() => 'Unable to read');
          debugLog({location:'strapi.ts:262',message:'API returned non-JSON',data:{contentType,responsePreview:responseText.substring(0,300)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'});
          // #endregion
          throw new Error(`API returned ${contentType} instead of JSON`);
        }
        
        // Safely parse JSON with error handling
        let data: any;
        try {
          const responseText = await response.text();
          data = JSON.parse(responseText);
        } catch (parseError: any) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'strapi.ts:275',message:'JSON parse error',data:{error:parseError?.message,contentType},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'})}).catch(()=>{});
          // #endregion
          throw new Error(`Failed to parse JSON response: ${parseError?.message}`);
        }
        // #region agent log
        debugLog({location:'strapi.ts:239',message:'API route response received',data:{hasProjects:!!data.projects,projectsCount:data.projects?.length||0,isArray:Array.isArray(data),total:data.pagination?.total||0,responseStatus:response.status,responseHeaders:Object.fromEntries(response.headers.entries())},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'});
        // #endregion
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
          // #region agent log
          debugLog({location:'strapi.ts:255',message:'Caching API response',data:{projectCount:typedProjects.length,ttl:3600000,source:'api-route'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
          // #endregion
          // Cache the results (1 hour TTL)
          cache.set(CACHE_KEYS.MONGO_PROJECTS, typedProjects, 3600000);
          return typedProjects;
        }
      }
      } catch (apiError: any) {
        // #region agent log
        debugLog({location:'strapi.ts:300',message:'API route error - falling back',data:{error:apiError?.message||'Unknown error',errorName:apiError?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B,C'});
        // #endregion
        // API route failed - fallback to local file
        // Don't re-throw, continue to fallback
      }
      
      // Fallback: Fetch from public directory (local file)
      // #region agent log
      debugLog({location:'strapi.ts:264',message:'Fallback to public file',data:{url:'/data/mongodb-projects.json',cacheStrategy:'force-cache'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
      // #endregion
      const response = await fetch('/data/mongodb-projects.json', {
        // OPTIMIZED: Use force-cache with revalidation instead of no-store
        cache: 'force-cache',
      });

      if (!response.ok) {
        // #region agent log
        debugLog({location:'strapi.ts:271',message:'Public file fetch failed',data:{status:response.status,statusText:response.statusText},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
        // #endregion
        // File doesn't exist yet or error - return empty array
        if (response.status === 404) {
          return [];
        }
        throw new Error(`Failed to fetch MongoDB projects: ${response.statusText}`);
      }

      const projects = await response.json();
      // #region agent log
      debugLog({location:'strapi.ts:277',message:'Public file fetch success',data:{projectCount:Array.isArray(projects)?projects.length:0,source:'public-file'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
      // #endregion
      
      // Validate and return projects with all fields preserved
      if (Array.isArray(projects)) {
        const typedProjects = projects as (Project & { title?: string; description?: string; readme?: string; [key: string]: any })[];
        // #region agent log
        debugLog({location:'strapi.ts:283',message:'Caching public file response',data:{projectCount:typedProjects.length,ttl:3600000,source:'public-file'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
        // #endregion
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

