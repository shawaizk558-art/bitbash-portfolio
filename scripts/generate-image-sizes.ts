/**
 * Generate multiple sizes for images to support responsive images
 * 
 * This script:
 * - Generates multiple sizes (1x, 1.5x, 2x) for each specified image
 * - Stores resized images in public/images/resized/ directory
 * - Uses naming convention: {original-name}-{width}w.webp
 * - Maintains aspect ratio and WebP format
 * 
 * Usage: tsx scripts/generate-image-sizes.ts
 */

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const resizedDir = path.join(publicDir, "images", "resized");

interface ImageConfig {
  name: string;
  displayWidth: number;
  displayHeight?: number; // Optional, will maintain aspect ratio if not provided
  sizes: number[]; // Widths to generate (e.g., [668, 1000, 1336])
}

// Image configurations based on the plan
const imageConfigs: ImageConfig[] = [
  // placeholder.webp (3325x1864 → 668x371, but displayed smaller on mobile)
  {
    name: "placeholder.webp",
    displayWidth: 668,
    displayHeight: 371,
    sizes: [400, 600, 668, 1000, 1336], // Added mobile sizes
  },
  // stack2.webp (1436x961 → 634x424, but displayed at 362px on mobile)
  {
    name: "stack2.webp",
    displayWidth: 634,
    displayHeight: 424,
    sizes: [362, 400, 520, 550, 600, 634, 951, 1268], // Added 362w, 520w, and 550w for better coverage
  },
  // stack3.webp (1399x530 → 634x240, but displayed at 362px on mobile)
  {
    name: "stack3.webp",
    displayWidth: 634,
    displayHeight: 240,
    sizes: [362, 400, 520, 550, 600, 634, 951, 1268], // Added 362w, 520w, and 550w for better coverage
  },
  // stack4.webp (1024x1024 → 634x634, but displayed at 362px on mobile)
  {
    name: "stack4.webp",
    displayWidth: 634,
    displayHeight: 634,
    sizes: [362, 400, 520, 550, 600, 634, 951, 1268], // Added 362w, 520w, and 550w for better coverage
  },
  // stack5.webp (1315x720 → 634x347, but displayed at 362px on mobile)
  {
    name: "stack5.webp",
    displayWidth: 634,
    displayHeight: 347,
    sizes: [362, 400, 520, 550, 600, 634, 951, 1268], // Added 362w, 520w, and 550w for better coverage
  },
  // Service images (1536x672 → 606x265, but displayed smaller on mobile ~346px)
  {
    name: "fullstack1.webp",
    displayWidth: 606,
    displayHeight: 265,
    sizes: [346, 520, 606, 909, 1212], // Added mobile sizes: 346w (1x), 520w (1.5x)
  },
  {
    name: "aisolutions2.webp",
    displayWidth: 606,
    displayHeight: 265,
    sizes: [346, 520, 606, 909, 1212], // Added mobile sizes: 346w (1x), 520w (1.5x)
  },
  {
    name: "automation3.webp",
    displayWidth: 606,
    displayHeight: 265,
    sizes: [346, 520, 606, 909, 1212], // Added mobile sizes: 346w (1x), 520w (1.5x)
  },
  {
    name: "webscraping4.webp",
    displayWidth: 606,
    displayHeight: 265,
    sizes: [346, 520, 606, 909, 1212], // Added mobile sizes: 346w (1x), 520w (1.5x)
  },
  {
    name: "dataanalytics5.webp",
    displayWidth: 606,
    displayHeight: 265,
    sizes: [346, 520, 606, 909, 1212], // Added mobile sizes: 346w (1x), 520w (1.5x)
  },
  // Avatars (320x320 → 63x63, but we'll generate slightly larger for retina)
  {
    name: "awais.webp",
    displayWidth: 64,
    displayHeight: 64,
    sizes: [64, 80, 128],
  },
  {
    name: "mughees.webp",
    displayWidth: 64,
    displayHeight: 64,
    sizes: [64, 80, 128],
  },
  {
    name: "hassan-arslan.webp",
    displayWidth: 64,
    displayHeight: 64,
    sizes: [64, 80, 128],
  },
  {
    name: "fras.webp",
    displayWidth: 64,
    displayHeight: 64,
    sizes: [64, 80, 128],
  },
];

interface ResizeResult {
  originalPath: string;
  resizedPath: string;
  width: number;
  originalSize: number;
  resizedSize: number;
  saved: number;
}

const results: ResizeResult[] = [];
const errors: Array<{ path: string; error: string }> = [];

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Get quality based on image type
 */
function getQuality(imagePath: string, width: number): number {
  const lowerPath = imagePath.toLowerCase();
  
  // Avatars can use lower quality since they're small
  if (lowerPath.includes("awais") || lowerPath.includes("mughees") || 
      lowerPath.includes("hassan-arslan") || lowerPath.includes("fras")) {
    return width <= 80 ? 75 : 80;
  }
  
  // Stack images and service images - balance quality and size
  if (lowerPath.includes("stack") || lowerPath.includes("fullstack") || 
      lowerPath.includes("aisolutions") || lowerPath.includes("automation") ||
      lowerPath.includes("webscraping") || lowerPath.includes("dataanalytics")) {
    return 85;
  }
  
  // Placeholder and other images
  return 80;
}

/**
 * Resize a single image to multiple sizes
 */
async function resizeImage(config: ImageConfig): Promise<void> {
  const originalPath = path.join(publicDir, config.name);
  
  // Check if original file exists
  try {
    await fs.access(originalPath);
  } catch {
    console.warn(`⚠️  Original file not found: ${config.name}`);
    errors.push({ path: config.name, error: "File not found" });
    return;
  }

  const originalStats = await fs.stat(originalPath);
  const originalSize = originalStats.size;

  // Get original image metadata to calculate aspect ratio
  const metadata = await sharp(originalPath).metadata();
  const aspectRatio = metadata.width && metadata.height 
    ? metadata.height / metadata.width 
    : config.displayHeight && config.displayWidth
    ? config.displayHeight / config.displayWidth
    : 1;

  console.log(`\n📸 Processing ${config.name} (${metadata.width}x${metadata.height})`);

  // Generate each size
  for (const width of config.sizes) {
    const height = Math.round(width * aspectRatio);
    const resizedFileName = config.name.replace(".webp", `-${width}w.webp`);
    const resizedPath = path.join(resizedDir, resizedFileName);

    try {
      const quality = getQuality(originalPath, width);
      
      await sharp(originalPath)
        .resize(width, height, {
          fit: "cover",
          position: "center",
        })
        .webp({ quality })
        .toFile(resizedPath);

      const resizedStats = await fs.stat(resizedPath);
      const resizedSize = resizedStats.size;
      const saved = originalSize - resizedSize;

      results.push({
        originalPath: config.name,
        resizedPath: resizedFileName,
        width,
        originalSize,
        resizedSize,
        saved,
      });

      console.log(`  ✓ Generated ${width}w: ${formatBytes(resizedSize)}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      errors.push({ path: `${config.name}-${width}w`, error: errorMessage });
      console.error(`  ✗ Failed to generate ${width}w: ${errorMessage}`);
    }
  }
}

/**
 * Ensure resized directory exists
 */
async function ensureResizedDir(): Promise<void> {
  try {
    await fs.access(resizedDir);
  } catch {
    await fs.mkdir(resizedDir, { recursive: true });
    console.log(`📁 Created directory: ${path.relative(projectRoot, resizedDir)}`);
  }
}

/**
 * Print summary
 */
function printSummary(): void {
  console.log("\n" + "=".repeat(60));
  console.log("📊 Image Resizing Summary");
  console.log("=".repeat(60));

  if (results.length === 0) {
    console.log("No images were resized.");
    return;
  }

  // Group by original image
  const grouped = results.reduce((acc, r) => {
    if (!acc[r.originalPath]) {
      acc[r.originalPath] = [];
    }
    acc[r.originalPath].push(r);
    return acc;
  }, {} as Record<string, ResizeResult[]>);

  console.log(`\n✅ Successfully generated ${results.length} resized images`);
  console.log(`📁 Output directory: ${path.relative(projectRoot, resizedDir)}\n`);

  // Show per-image summary
  for (const [original, sizes] of Object.entries(grouped)) {
    const totalResizedSize = sizes.reduce((sum, s) => sum + s.resizedSize, 0);
    const originalSize = sizes[0].originalSize;
    const avgSize = totalResizedSize / sizes.length;
    
    console.log(`  ${original}:`);
    sizes.forEach(s => {
      console.log(`    - ${s.width}w: ${formatBytes(s.resizedSize)}`);
    });
    console.log(`    Average size: ${formatBytes(avgSize)} (vs original ${formatBytes(originalSize)})`);
  }

  const totalOriginal = Object.values(grouped).reduce(
    (sum, sizes) => sum + sizes[0].originalSize,
    0
  );
  const totalResized = results.reduce((sum, r) => sum + r.resizedSize, 0);
  const avgResized = totalResized / results.length;

  console.log(`\n📦 Total original size: ${formatBytes(totalOriginal)}`);
  console.log(`📦 Total resized images size: ${formatBytes(totalResized)}`);
  console.log(`📊 Average resized image size: ${formatBytes(avgResized)}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors: ${errors.length}`);
    errors.forEach((e) => {
      console.log(`  - ${e.path}: ${e.error}`);
    });
  }

  console.log("\n" + "=".repeat(60));
}

/**
 * Main function
 */
async function main() {
  console.log("🖼️  Starting image resizing for responsive images...\n");
  console.log(`📁 Public directory: ${publicDir}`);
  console.log(`📁 Resized directory: ${resizedDir}\n`);

  await ensureResizedDir();

  console.log(`Found ${imageConfigs.length} images to process\n`);

  // Process each image configuration
  for (const config of imageConfigs) {
    await resizeImage(config);
  }

  printSummary();

  console.log("\n✨ Image resizing complete!");
  console.log("\n💡 Next steps:");
  console.log("   1. Use ResponsiveImage component in your components");
  console.log("   2. Images will automatically use the resized versions");
  console.log("   3. Run this script again if you add new images");
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});

