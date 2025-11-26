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
        passes: 3, // More aggressive
        unsafe_arrows: true,
        unsafe_methods: true,
        toplevel: true,
      },
      mangle: {
        safari10: true,
        toplevel: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // Target modern browsers for smaller bundles
    target: 'es2020',
    
    // Enable module preload for faster loading
    modulePreload: {
      polyfill: false,
    },

    rollupOptions: {
      // Tree shaking optimizations
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      output: {
        // Manual chunk splitting - consolidated to reduce critical path depth
        manualChunks: (id) => {
          // Core vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('lenis')) {
              return 'vendor-lenis';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react-markdown') || id.includes('remark')) {
              return 'vendor-markdown';
            }
            return 'vendor-misc';
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
