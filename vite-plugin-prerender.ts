import { type Plugin } from "vite";
import path from "path";
import fs from "fs/promises";
import { list } from "@vercel/blob";

// Import project data
import { projects as hardcodedProjects } from "./src/data/projects";

const BLOB_FILE_NAME = "mongodb-projects.json";
const SITE_URL = "https://bitbash.dev";

/**
 * Fetch MongoDB projects from Blob Storage or local file
 */
async function fetchMongoProjects(): Promise<any[]> {
  try {
    // Try Blob Storage first
    const { blobs } = await list({ prefix: BLOB_FILE_NAME });
    const blob = blobs.find((b) => b.pathname === BLOB_FILE_NAME);

    if (blob && blob.url) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(blob.url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const content = await response.text();
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (error) {
    console.warn("[Prerender] Could not fetch MongoDB projects from Blob Storage:", error);
  }

  // Fallback to local file
  try {
    const localPath = path.join(process.cwd(), "public", "data", "mongodb-projects.json");
    const content = await fs.readFile(localPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("[Prerender] Could not read local MongoDB projects file:", error);
  }

  return [];
}

/**
 * Convert string to title case
 */
function toTitleCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ")
    .trim();
}

/**
 * Get media assets for a project (simplified version)
 */
function getProjectImage(slug: string): string {
  // Use a simple mapping - in production, this would use getMediaAssets
  // For now, try common paths
  const commonImages: Record<string, string> = {
    petla: "/petla.svg",
    "actuary-list": "/actuarylist-logo.webp",
    "scraper-glass": "/scraperglass-logo.webp",
    "threads-scraper": "/avatars/threads.svg",
    ttinit: "/ttinit-logo.webp",
    purepeak: "/purepeak_ltd_logo.webp",
    "facebook-scraper": "/avatars/facebook.svg",
    "linkedin-automation": "/avatars/linkedin.svg",
    "api-scraper": "/avatars/telegram.svg",
  };
  return commonImages[slug] || "/placeholder.webp";
}

/**
 * Generate meta tags HTML for a project
 */
function generateMetaTags(project: any, slug: string): string {
  const projectName = toTitleCase(project.title || project.name);
  const description = (project.description || project.quote || "").substring(0, 160);
  const projectUrl = `${SITE_URL}/project/${slug}`;
  const ogImage = getProjectImage(slug);
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return `
  <title>${projectName} - BitBash Project</title>
  <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
  <link rel="canonical" href="${projectUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${projectUrl}" />
  <meta property="og:title" content="${projectName} - BitBash Project" />
  <meta property="og:description" content="${description.replace(/"/g, "&quot;")}" />
  <meta property="og:image" content="${fullOgImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content="BitBash" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${projectUrl}" />
  <meta name="twitter:title" content="${projectName} - BitBash Project" />
  <meta name="twitter:description" content="${description.replace(/"/g, "&quot;")}" />
  <meta name="twitter:image" content="${fullOgImage}" />
  <meta name="robots" content="index, follow" />`;
}

/**
 * Prerender plugin for project pages
 */
export function prerenderProjectPages(): Plugin {
  return {
    name: "vite-prerender-project-pages",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const outDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(outDir, "index.html");

      // Read the base index.html
      let baseHtml: string;
      try {
        baseHtml = await fs.readFile(indexPath, "utf-8");
      } catch (error) {
        console.error("[Prerender] Could not read index.html:", error);
        return;
      }

      // Fetch all projects
      console.log("[Prerender] Fetching projects...");
      const mongoProjects = await fetchMongoProjects();
      const hardcodedSlugs = new Set(hardcodedProjects.map((p) => p.slug));
      const uniqueMongoProjects = mongoProjects.filter(
        (p: any) => p.slug && !hardcodedSlugs.has(p.slug)
      );

      const allProjects = [...hardcodedProjects, ...uniqueMongoProjects];
      console.log(`[Prerender] Found ${allProjects.length} projects to prerender`);

      // Prerender each project
      for (const project of allProjects) {
        try {
          const slug = project.slug;
          if (!slug) continue;

          console.log(`[Prerender] Prerendering /project/${slug}...`);

          // Generate meta tags
          const metaTags = generateMetaTags(project, slug);

          // Build the HTML with injected meta tags
          let finalHtml = baseHtml;

          // Remove any existing title and meta tags in head, then inject new ones
          finalHtml = finalHtml.replace(/<title>.*?<\/title>/i, "");
          finalHtml = finalHtml.replace(/<meta\s+name="description".*?>/i, "");
          finalHtml = finalHtml.replace(/<link\s+rel="canonical".*?>/i, "");

          // Inject meta tags before closing </head>
          finalHtml = finalHtml.replace("</head>", `${metaTags}\n</head>`);

          // Save to dist/project/{slug}/index.html
          const projectDir = path.join(outDir, "project", slug);
          await fs.mkdir(projectDir, { recursive: true });
          const projectHtmlPath = path.join(projectDir, "index.html");
          await fs.writeFile(projectHtmlPath, finalHtml, "utf-8");

          console.log(`[Prerender] ✓ Prerendered /project/${slug}`);
        } catch (error: any) {
          console.error(`[Prerender] ✗ Failed to prerender /project/${project.slug}:`, error?.message || error);
        }
      }

      console.log(`[Prerender] ✓ Completed prerendering ${allProjects.length} project pages`);
    },
  };
}

