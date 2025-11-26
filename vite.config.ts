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
    mode === "production" && inlineCriticalCss(),
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
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core
          "react-vendor": ["react", "react-dom"],

          // React Router
          "router": ["react-router-dom"],

          // UI libraries (Radix UI components)
          "ui-vendor": [
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],

          // Markdown rendering
          "markdown": ["react-markdown", "remark-gfm"],

          // Utility libraries
          "utils": [
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
          ],
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
