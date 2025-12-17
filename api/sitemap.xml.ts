import { projects as hardcodedProjects } from '../src/data/projects';
import { getMongoProjects } from '../src/lib/strapi';

type VercelRequest = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  send: (body: string) => void;
  json: (obj: any) => void;
};

const SITE_URL = 'https://bitbash.dev';

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
  try {
    // Set proper headers for XML
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    // Get all projects (hardcoded + MongoDB)
    let allProjects = [...hardcodedProjects];
    console.log(`[Sitemap] Starting with ${hardcodedProjects.length} hardcoded projects`);
    
    try {
      const mongoProjects = await getMongoProjects();
      console.log(`[Sitemap] Fetched ${mongoProjects.length} MongoDB projects`);
      
      // Filter out MongoDB projects that have same slug as hardcoded (hardcoded take precedence)
      const hardcodedSlugs = new Set(hardcodedProjects.map(p => p.slug));
      const filteredMongoProjects = mongoProjects.filter(
        project => project.slug && !hardcodedSlugs.has(project.slug)
      );
      
      console.log(`[Sitemap] Adding ${filteredMongoProjects.length} unique MongoDB projects`);
      allProjects = [...hardcodedProjects, ...filteredMongoProjects];
    } catch (error) {
      console.error('[Sitemap] Error fetching MongoDB projects:', error);
      // Continue with just hardcoded projects if MongoDB fetch fails
    }

    console.log(`[Sitemap] Total projects: ${allProjects.length}`);

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
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
      if (project && project.slug) {
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

    return res.status(200).send(xml);
  } catch (error) {
    console.error('[Sitemap] Error generating sitemap:', error);
    return res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

