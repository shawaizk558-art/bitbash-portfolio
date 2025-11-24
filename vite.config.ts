import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { componentTagger } from "lovable-tagger";
import { reactGrab } from "react-grab/plugins/vite";
import Critters from "critters";

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
    mode === "production" && inlineCriticalCss()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
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
      });

      const html = await fs.readFile(htmlPath, "utf8");
      const inlined = await critters.process(html);
      await fs.writeFile(htmlPath, inlined, "utf8");
    },
  };
}
