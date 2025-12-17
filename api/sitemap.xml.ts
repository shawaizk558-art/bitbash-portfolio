import { projects as hardcodedProjects } from '../src/data/projects';
import { list } from '@vercel/blob';

type VercelRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => VercelResponse;
  send: (body: string | Buffer) => void;
  json: (obj: any) => void;
  end: () => void;
};

const SITE_URL = 'https://bitbash.dev';
const BLOB_FILE_NAME = 'mongodb-projects.json';

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: '/', priority: '1.00', changefreq: 'weekly' },
  { path: '/services', priority: '0.90', changefreq: 'monthly' },
  { path: '/services/automation', priority: '0.85', changefreq: 'monthly' },
  { path: '/services/scraping', priority: '0.85', changefreq: 'monthly' },
  { path: '/services/full-stack', priority: '0.85', changefreq: 'monthly' },
  { path: '/services/ai-solutions', priority: '0.85', changefreq: 'monthly' },
  { path: '/services/saas-mvp', priority: '0.85', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.75', changefreq: 'monthly' },
  { path: '/contact', priority: '0.75', changefreq: 'monthly' },
  { path: '/blog', priority: '0.70', changefreq: 'weekly' },
  { path: '/projects', priority: '0.70', changefreq: 'monthly' },
  { path: '/how-we-work', priority: '0.60', changefreq: 'monthly' },
];

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0] + 'T00:00:00+00:00';
}

function generateUrlEntry(path: string, priority: string, changefreq: string, lastmod?: string): string {
  const url = `${SITE_URL}${path}`;
  const lastmodDate = lastmod || formatDate(new Date());
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmodDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${url}" />
  </url>`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Initialize with hardcoded projects - these should always work
  let allProjects: any[] = [];
  
  try {
    // Load hardcoded projects first (these must always work)
    if (Array.isArray(hardcodedProjects) && hardcodedProjects.length > 0) {
      allProjects = [...hardcodedProjects];
      console.log(`[Sitemap] Loaded ${hardcodedProjects.length} hardcoded projects`);
    } else {
      console.error('[Sitemap] Hardcoded projects array is invalid');
      // Still continue - we'll generate sitemap with static pages only
    }
  } catch (error: any) {
    console.error('[Sitemap] Error loading hardcoded projects:', error?.message || error);
    // Continue anyway - we can still generate sitemap with static pages
  }
  
  // Try to add MongoDB projects from Blob Storage (completely optional)
  // If this fails, we continue with just hardcoded projects
  try {
    const { blobs } = await list({ prefix: BLOB_FILE_NAME });
    const blob = blobs.find(b => b.pathname === BLOB_FILE_NAME);
    
    if (blob && blob.url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(blob.url, {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const content = await response.text();
          
          // Safely parse JSON
          let mongoProjects: any[] = [];
          try {
            const parsed = JSON.parse(content);
            if (Array.isArray(parsed)) {
              mongoProjects = parsed;
            }
          } catch (parseError: any) {
            console.warn('[Sitemap] Failed to parse MongoDB projects JSON:', parseError?.message);
            // Continue without MongoDB projects
          }
          
          if (mongoProjects.length > 0) {
            console.log(`[Sitemap] Fetched ${mongoProjects.length} MongoDB projects from Blob Storage`);
            
            // Filter out MongoDB projects that have same slug as hardcoded (hardcoded take precedence)
            const hardcodedSlugs = new Set(allProjects.map((p: any) => p?.slug).filter(Boolean));
            const filteredMongoProjects = mongoProjects.filter(
              (project: any) => project && project.slug && typeof project.slug === 'string' && !hardcodedSlugs.has(project.slug)
            );
            
            if (filteredMongoProjects.length > 0) {
              console.log(`[Sitemap] Adding ${filteredMongoProjects.length} unique MongoDB projects`);
              allProjects = [...allProjects, ...filteredMongoProjects];
            }
          }
        } else {
          console.warn(`[Sitemap] Failed to fetch blob content: ${response.status} ${response.statusText}`);
        }
      } catch (fetchError: any) {
        if (fetchError.name === 'AbortError') {
          console.warn('[Sitemap] Blob fetch timeout');
        } else {
          console.warn('[Sitemap] Error fetching blob URL:', fetchError?.message || String(fetchError));
        }
        // Continue without MongoDB projects
      }
    } else {
      console.log(`[Sitemap] Blob not found in storage, using hardcoded projects only`);
    }
  } catch (blobError: any) {
    // Blob storage errors are completely fine - we continue with hardcoded projects
    console.warn('[Sitemap] Blob storage unavailable (this is OK):', blobError?.message || String(blobError));
  }

  // Generate XML - this should always work
  try {
    console.log(`[Sitemap] Generating sitemap with ${allProjects.length} total projects`);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

    // Add static pages
    for (const page of staticPages) {
      xml += generateUrlEntry(page.path, page.priority, page.changefreq) + '\n';
    }

    // Add project detail pages
    const today = formatDate(new Date());
    let projectCount = 0;
    for (const project of allProjects) {
      // Ensure project has a valid slug
      if (project && project.slug && typeof project.slug === 'string') {
        xml += generateUrlEntry(
          `/project/${project.slug}`,
          '0.80',
          'monthly',
          today
        ) + '\n';
        projectCount++;
      }
    }

    console.log(`[Sitemap] Added ${projectCount} project URLs to sitemap`);

    xml += `</urlset>`;

    // Send XML response with proper headers
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
    return;
  } catch (xmlError: any) {
    // This should never happen, but if it does, return error
    console.error('[Sitemap] Error generating XML:', xmlError);
    res.status(500).json({ error: 'Failed to generate sitemap XML', details: xmlError?.message });
    return;
  }
}
