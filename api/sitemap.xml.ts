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

// Use www host consistently to align with canonical tags and avoid duplicates
const SITE_URL = 'https://www.bitbash.dev';
const BLOB_FILE_NAME = 'mongodb-projects.json';

// Hardcoded project slugs (from src/data/projects.ts)
// This ensures the sitemap always works even if imports fail
const HARDCODED_PROJECT_SLUGS = [
  'petla',
  'scraper-glass',
  'actuary-list',
  'threads-scraper',
  'ttinit',
  'purepeak',
  'facebook-scraper',
  'linkedin-automation',
  'api-scraper',
  'telegram-weather-alert-bot',
];

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
  { path: '/our-work-model', priority: '0.60', changefreq: 'monthly' },
];

function formatDate(date: Date): string {
  // Ensure we're using UTC and not a future date
  const now = new Date();
  const dateToUse = date > now ? now : date;
  return dateToUse.toISOString().split('T')[0] + 'T00:00:00+00:00';
}

function getCurrentDateString(): string {
  // Get current date in UTC format (ISO 8601)
  // Note: If dates appear incorrect (e.g., showing 2025 when it should be 2024),
  // this indicates the server's system clock is misconfigured and should be fixed at the infrastructure level.
  const now = new Date();
  return now.toISOString().split('T')[0] + 'T00:00:00+00:00';
}

function generateUrlEntry(path: string, priority: string, changefreq: string, lastmod?: string): string {
  const url = `${SITE_URL}${path}`;
  const lastmodDate = lastmod || getCurrentDateString();
  
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
  // Start with hardcoded project slugs - these always work
  let allProjectSlugs: string[] = [...HARDCODED_PROJECT_SLUGS];
  console.log(`[Sitemap] Starting with ${HARDCODED_PROJECT_SLUGS.length} hardcoded project slugs`);
  
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
            
            // Extract slugs from MongoDB projects and filter out duplicates
            const mongoSlugs = mongoProjects
              .map((project: any) => project?.slug)
              .filter((slug: any): slug is string => typeof slug === 'string' && slug.length > 0);
            
            // Filter out MongoDB slugs that match hardcoded slugs (hardcoded take precedence)
            const hardcodedSlugSet = new Set(HARDCODED_PROJECT_SLUGS);
            const uniqueMongoSlugs = mongoSlugs.filter(slug => !hardcodedSlugSet.has(slug));
            
            if (uniqueMongoSlugs.length > 0) {
              console.log(`[Sitemap] Adding ${uniqueMongoSlugs.length} unique MongoDB project slugs`);
              allProjectSlugs = [...HARDCODED_PROJECT_SLUGS, ...uniqueMongoSlugs];
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
    console.log(`[Sitemap] Generating sitemap with ${allProjectSlugs.length} total project slugs`);

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
    const today = getCurrentDateString();
    let projectCount = 0;
    for (const slug of allProjectSlugs) {
      if (slug && typeof slug === 'string') {
        xml += generateUrlEntry(
          `/project/${slug}`,
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
