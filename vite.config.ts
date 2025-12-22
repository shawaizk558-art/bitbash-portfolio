import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { componentTagger } from "lovable-tagger";
import { reactGrab } from "react-grab/plugins/vite";
import Critters from "critters";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    reactGrab(),
    mode === "development" && componentTagger(),
    mode === "development" && sitemapDevMiddleware(),
    mode === "development" && apiRoutesDevMiddleware(),
    mode === "production" && inlineCriticalCss(),
    mode === "production" && addModulePreload(),
    mode === "production" && visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,

    // Use terser for better minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Manual chunk splitting - aggressively optimized to reduce critical path depth
        manualChunks: (id) => {
          // React core - smallest possible chunk (most critical)
          if (id.includes("node_modules/react/") && !id.includes("react-dom")) {
            return "react-core";
          }
          
          // React-DOM in separate chunk (loads in parallel with react-core)
          if (id.includes("node_modules/react-dom")) {
            return "react-dom";
          }

          // Router in separate chunk (can load in parallel, not needed immediately)
          if (id.includes("node_modules/react-router-dom")) {
            return "router";
          }

          // Large icon library - separate chunk
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }

          // Smooth scroll library - separate chunk
          if (id.includes("node_modules/lenis")) {
            return "lenis";
          }

          // Three.js and related libraries - separate chunk (heavy, not critical)
          if (
            id.includes("node_modules/three") ||
            id.includes("node_modules/@react-three")
          ) {
            return "three";
          }

          // Separate Radix UI components into UI vendor chunk
          if (id.includes("node_modules/@radix-ui")) {
            return "ui-vendor";
          }

          // Core utilities - small chunk
          if (
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/class-variance-authority") ||
            id.includes("node_modules/tailwind-merge")
          ) {
            return "utils";
          }

          // Showcase component and its dependencies in separate chunk
          if (
            id.includes("/components/Showcase") ||
            id.includes("/components/AutoPlayVideo") ||
            id.includes("/components/LiteYouTubeEmbed") ||
            id.includes("/components/HomepagePricing")
          ) {
            return "showcase";
          }

          // Heavy markdown libraries
          if (id.includes("node_modules/react-markdown") || id.includes("node_modules/remark-gfm")) {
            return "markdown";
          }

          // Sonner toast library
          if (id.includes("node_modules/sonner")) {
            return "sonner";
          }

          // Helmet for head management
          if (id.includes("node_modules/react-helmet-async")) {
            return "helmet";
          }
        },

        // Optimize chunk file names for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/").pop()
            : "chunk";
          return `assets/${facadeModuleId}-[hash].js`;
        },
      },
    },
  },
}));

function inlineCriticalCss(): Plugin {
  return {
    name: "vite-inline-critical-css",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const htmlPath = path.join(outDir, "index.html");

      try {
        await fs.access(htmlPath);
      } catch {
        return;
      }

      const critters = new Critters({
        path: outDir,
        publicPath: "/",
        logLevel: "error",
        preload: "swap",
        reduceInlineStyles: false,
        pruneSource: true, // Remove inlined CSS from external files
        preloadFonts: true, // Preload fonts for better performance
      });

      const html = await fs.readFile(htmlPath, "utf8");
      const inlined = await critters.process(html);
      await fs.writeFile(htmlPath, inlined, "utf8");
    },
  };
}

/**
 * Vite plugin to add modulepreload links for critical chunks
 * This helps browser start parsing critical chunks earlier, improving parallel loading
 */
function addModulePreload(): Plugin {
  return {
    name: "vite-add-modulepreload",
    apply: "build",
    enforce: "post",
    async writeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const htmlPath = path.join(outDir, "index.html");
      const manifestPath = path.join(outDir, ".vite/manifest.json");

      try {
        await fs.access(htmlPath);
      } catch {
        return;
      }

      // Read manifest to get chunk file names with hashes
      let manifest: Record<string, any> = {};
      try {
        const manifestContent = await fs.readFile(manifestPath, "utf8");
        manifest = JSON.parse(manifestContent);
      } catch {
        // Manifest might not exist or be in different location, try alternative
        try {
          const altManifestPath = path.join(outDir, "manifest.json");
          const manifestContent = await fs.readFile(altManifestPath, "utf8");
          manifest = JSON.parse(manifestContent);
        } catch {
          // No manifest found, Vite will handle modulepreload automatically
          return;
        }
      }

      const html = await fs.readFile(htmlPath, "utf8");

      // Find critical chunks in manifest (react-core, react-dom, and entry chunks)
      const preloadLinks: string[] = [];
      for (const [key, value] of Object.entries(manifest)) {
        if (
          value.isEntry ||
          (value.name && (value.name === "react-core" || value.name === "react-dom"))
        ) {
          if (value.file && value.file.endsWith(".js")) {
            const filePath = value.file.startsWith("/") ? value.file : `/${value.file}`;
            preloadLinks.push(`<link rel="modulepreload" href="${filePath}" />`);
          }
        }
      }

      // Insert modulepreload links before closing </head> tag
      if (preloadLinks.length > 0) {
        const preloadHtml = `\n  <!-- Modulepreload critical chunks for faster parallel loading -->\n  ${preloadLinks.join("\n  ")}\n`;
        const updatedHtml = html.replace("</head>", `${preloadHtml}</head>`);
        await fs.writeFile(htmlPath, updatedHtml, "utf8");
      }
    },
  };
}

/**
 * Vite middleware plugin to handle API routes in development
 * This allows API routes to work locally without needing Vercel CLI
 */
function apiRoutesDevMiddleware(): Plugin {
  return {
    name: "vite-api-routes-dev-middleware",
    apply: "serve",
    configureServer(server) {
      // Load environment variables once when middleware is set up
      let envLoaded = false;
      const loadEnvVars = async () => {
        if (envLoaded || process.env.VERCEL) return;
        try {
          const dotenv = await import('dotenv');
          const envLocalPath = path.join(process.cwd(), '.env.local');
          const envPath = path.join(process.cwd(), '.env');
          
          // Try .env.local first, then .env
          dotenv.config({ path: envLocalPath });
          dotenv.config({ path: envPath });
          
          envLoaded = true;
          console.log('[API Dev Middleware] Environment variables loaded');
          if (process.env.BLOB_READ_WRITE_TOKEN) {
            console.log('[API Dev Middleware] ✅ BLOB_READ_WRITE_TOKEN found');
          } else {
            console.log('[API Dev Middleware] ⚠️  BLOB_READ_WRITE_TOKEN not found. Create .env.local file with your token.');
          }
        } catch (e) {
          // dotenv not available - that's okay
        }
      };
      
      // Load env vars immediately
      loadEnvVars();
      
      // Insert middleware early, before Vite's history API fallback
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]; // Remove query params
        
        // Only handle API routes
        if (!url?.startsWith('/api/')) {
          next();
          return;
        }
        
        // Skip sitemap (handled by separate middleware)
        if (url === '/api/sitemap.xml') {
          next();
          return;
        }
        
        // Ensure env vars are loaded before handling request
        await loadEnvVars();
        
        console.log(`[API Dev Middleware] Handling ${req.method} ${url}`);
        
        try {
          // Import and execute the API route handler
          let handler: any;
          let routePath: string;
          
          // Handle different API route patterns
          if (url === '/api/mongodb-projects') {
            routePath = path.resolve(__dirname, './api/mongodb-projects.ts');
          } else if (url.startsWith('/api/mongodb-projects/')) {
            // Extract slug from URL
            const slug = url.replace('/api/mongodb-projects/', '');
            routePath = path.resolve(__dirname, './api/mongodb-projects/[slug].ts');
          } else {
            // Unknown API route, let Vite handle it
            next();
            return;
          }
          
          // Dynamically import the handler
          const module = await import(routePath);
          handler = module.default;
          
          if (!handler || typeof handler !== 'function') {
            console.error(`[API Dev Middleware] Handler not found or not a function for ${url}`);
            next();
            return;
          }
          
          // Parse query string
          const urlObj = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
          const query: Record<string, string | string[]> = {};
          urlObj.searchParams.forEach((value, key) => {
            if (query[key]) {
              // Multiple values for same key
              const existing = query[key];
              query[key] = Array.isArray(existing) ? [...existing, value] : [existing as string, value];
            } else {
              query[key] = value;
            }
          });
          
          // Add slug to query if it's a slug route
          if (url.startsWith('/api/mongodb-projects/') && url !== '/api/mongodb-projects') {
            const slug = url.replace('/api/mongodb-projects/', '').split('?')[0];
            query.slug = slug;
          }
          
          // Create Vercel-compatible request/response objects
          const vercelReq = {
            method: req.method,
            headers: req.headers as Record<string, string | string[] | undefined>,
            query,
            body: undefined,
          };
          
          let responseData: any = null;
          let statusCode = 200;
          const responseHeaders: Record<string, string> = {};
          
          const vercelRes = {
            status: (code: number) => {
              statusCode = code;
              return vercelRes;
            },
            setHeader: (name: string, value: string) => {
              responseHeaders[name] = value;
              return vercelRes;
            },
            json: (data: any) => {
              responseData = data;
            },
            send: (data: any) => {
              responseData = data;
            },
            end: () => {
              // Response handled
            },
          };
          
          // Execute the handler
          await handler(vercelReq, vercelRes);
          
          // Send response
          if (responseData !== null) {
            // Set headers
            Object.entries(responseHeaders).forEach(([name, value]) => {
              res.setHeader(name, value);
            });
            
            // Default to JSON if no content-type set
            if (!responseHeaders['content-type']) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
            }
            
            res.statusCode = statusCode;
            res.end(JSON.stringify(responseData));
          } else {
            // Handler didn't send response, let Vite handle it
            next();
          }
        } catch (error: any) {
          console.error(`[API Dev Middleware] Error handling ${url}:`, error);
          if (!res.headersSent && !res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ 
              error: 'Internal server error', 
              message: error?.message || String(error)
            }));
          }
        }
      });
    },
  };
}

/**
 * Vite middleware plugin to handle sitemap.xml in development
 * This allows testing the sitemap locally without needing Vercel CLI
 */
function sitemapDevMiddleware(): Plugin {
  return {
    name: "vite-sitemap-dev-middleware",
    apply: "serve",
    configureServer(server) {
      // Insert middleware early, before Vite's history API fallback
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]; // Remove query params
        const isSitemap = url === "/sitemap.xml" || url === "/api/sitemap.xml";
        
        if (!isSitemap) {
          next();
          return;
        }
        
        console.log(`[Sitemap Dev Middleware] Handling ${url}`);
        
        try {
          // Import projects directly using resolved paths (avoid alias issues)
          const projectsPath = path.resolve(__dirname, "./src/data/projects.ts");
          const { projects: hardcodedProjects } = await import(projectsPath);
          
          // Try to fetch MongoDB projects from API route (same as production)
          // This works if vercel dev is running, or falls back gracefully
          let mongoProjects: any[] = [];
          try {
            // Try fetching from the API route (works if vercel dev is running)
            const apiUrl = req.headers.host 
              ? `http://${req.headers.host}/api/mongodb-projects`
              : 'http://localhost:8080/api/mongodb-projects';
            
            const response = await fetch(apiUrl, {
              headers: {
                'Accept': 'application/json',
              },
            });
            
            if (response.ok) {
              const data = await response.json() as any;
              // Handle paginated response (new format) or array response (old format)
              if (data && typeof data === 'object') {
                if (data.projects && Array.isArray(data.projects)) {
                  mongoProjects = data.projects;
                } else if (Array.isArray(data)) {
                  mongoProjects = data;
                }
              }
              console.log(`[Sitemap Dev] Fetched ${mongoProjects.length} MongoDB projects from API`);
            } else {
              console.log(`[Sitemap Dev] API route not available (${response.status}), using hardcoded projects only`);
            }
          } catch (apiError) {
            // API route not available - that's okay, just use hardcoded projects
            console.log("[Sitemap Dev] MongoDB projects API not available, using hardcoded projects only");
          }
          
          const SITE_URL = 'http://localhost:8080';
          
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
          
          // Get all projects (hardcoded + MongoDB)
          let allProjects = [...hardcodedProjects];
          console.log(`[Sitemap Dev] Starting with ${hardcodedProjects.length} hardcoded projects`);
          console.log(`[Sitemap Dev] Found ${mongoProjects.length} MongoDB projects`);
          
          // Filter out MongoDB projects that have same slug as hardcoded
          const hardcodedSlugs = new Set(hardcodedProjects.map((p: any) => p.slug));
          const filteredMongoProjects = mongoProjects.filter(
            (project: any) => project.slug && !hardcodedSlugs.has(project.slug)
          );
          
          console.log(`[Sitemap Dev] Adding ${filteredMongoProjects.length} unique MongoDB projects`);
          allProjects = [...hardcodedProjects, ...filteredMongoProjects];
          
          console.log(`[Sitemap Dev] Total projects: ${allProjects.length}`);
          
          // Generate XML
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
            if (project && (project as any).slug) {
              xml += generateUrlEntry(
                `/project/${(project as any).slug}`,
                '0.80',
                'monthly',
                today
              ) + '\n';
              projectCount++;
            }
          }
          
          console.log(`[Sitemap Dev] Added ${projectCount} project URLs to sitemap`);
          
          xml += `</urlset>`;
          
          // Send response
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
          res.statusCode = 200;
          res.end(xml);
        } catch (error: any) {
          console.error("[Sitemap Dev Middleware] Error:", error);
          if (!res.headersSent && !res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ 
              error: "Failed to generate sitemap", 
              details: error?.message || String(error),
              stack: error?.stack
            }));
          }
        }
      });
    },
  };
}
