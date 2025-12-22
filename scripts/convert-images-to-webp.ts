/**
 * Convert all PNG and JPEG images to WebP format
 * 
 * This script:
 * - Converts all PNG/JPEG images in public/ directory to WebP
 * - Maintains directory structure
 * - Skips SVG files and external URLs
 * - Excludes project-screenshots directory
 * - Logs conversion progress and file size savings
 * 
 * Usage: tsx scripts/convert-images-to-webp.ts
 */

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

interface ConversionResult {
  originalPath: string;
  webpPath: string;
  originalSize: number;
  webpSize: number;
  saved: number;
  savedPercent: number;
}

const results: ConversionResult[] = [];
const errors: Array<{ path: string; error: string }> = [];

/**
 * Determine quality based on image type
 * Photos: 80-85%, Graphics/logos: 90%
 */
function getQuality(filePath: string): number {
  const lowerPath = filePath.toLowerCase();
  // Logos and graphics typically benefit from higher quality
  if (lowerPath.includes("logo") || lowerPath.includes("badge") || lowerPath.includes("icon")) {
    return 90;
  }
  // Photos and screenshots can use lower quality
  if (lowerPath.includes("poster") || lowerPath.includes("avatar") || lowerPath.includes("pfp")) {
    return 80;
  }
  // Default for other images
  return 85;
}

/**
 * Convert a single image to WebP
 */
async function convertImage(filePath: string): Promise<ConversionResult | null> {
  try {
    // Skip if already WebP
    if (filePath.toLowerCase().endsWith(".webp")) {
      return null;
    }

    // Skip SVG files
    if (filePath.toLowerCase().endsWith(".svg")) {
      return null;
    }

    // Skip external URLs
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return null;
    }

    // Skip project-screenshots directory
    if (filePath.includes("project-screenshots")) {
      return null;
    }

    // filePath is relative to projectRoot (e.g., "public/image.png")
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(projectRoot, filePath);
    
    // Check if file exists
    try {
      await fs.access(fullPath);
    } catch {
      console.warn(`File not found: ${fullPath}`);
      return null;
    }

    const stats = await fs.stat(fullPath);
    const originalSize = stats.size;

    // Generate WebP path
    const ext = path.extname(fullPath);
    const webpPath = fullPath.replace(ext, ".webp");

    // Convert to WebP
    const quality = getQuality(fullPath);
    await sharp(fullPath)
      .webp({ quality })
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    const webpSize = webpStats.size;
    const saved = originalSize - webpSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(1);

    return {
      originalPath: path.relative(projectRoot, fullPath),
      webpPath: path.relative(projectRoot, webpPath),
      originalSize,
      webpSize,
      saved,
      savedPercent: parseFloat(savedPercent),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errors.push({ path: filePath, error: errorMessage });
    console.error(`Error converting ${filePath}:`, errorMessage);
    return null;
  }
}

/**
 * Recursively find all PNG/JPEG images in a directory
 */
async function findImagesRecursive(dir: string, relativePath: string = ""): Promise<string[]> {
  const images: string[] = [];
  const imageExtensions = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativeFilePath = path.join(relativePath, entry.name);

      // Skip project-screenshots directory
      if (entry.isDirectory() && entry.name === "project-screenshots") {
        continue;
      }

      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subImages = await findImagesRecursive(fullPath, relativeFilePath);
        images.push(...subImages);
      } else if (entry.isFile()) {
        // Check if it's an image file
        const ext = path.extname(entry.name);
        if (imageExtensions.includes(ext)) {
          images.push(relativeFilePath);
        }
      }
    }
  } catch (error) {
    console.warn(`Error reading directory ${dir}:`, error);
  }

  return images;
}

/**
 * Find all PNG/JPEG images in public directory
 */
async function findImages(): Promise<string[]> {
  return await findImagesRecursive(publicDir, "public");
}

/**
 * Delete original files after successful conversion
 */
async function deleteOriginals(): Promise<void> {
  console.log("\n🗑️  Deleting original files...");
  let deletedCount = 0;
  let deletedSize = 0;

  for (const result of results) {
    try {
      const originalFullPath = path.join(projectRoot, result.originalPath);
      await fs.unlink(originalFullPath);
      deletedCount++;
      deletedSize += result.originalSize;
      console.log(`  ✓ Deleted: ${result.originalPath}`);
    } catch (error) {
      console.error(`  ✗ Failed to delete ${result.originalPath}:`, error);
    }
  }

  console.log(`\n✅ Deleted ${deletedCount} original files (${formatBytes(deletedSize)} freed)`);
}

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
 * Print conversion summary
 */
function printSummary(): void {
  console.log("\n" + "=".repeat(60));
  console.log("📊 Conversion Summary");
  console.log("=".repeat(60));

  if (results.length === 0) {
    console.log("No images were converted.");
    return;
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalSaved = totalOriginal - totalWebP;
  const avgSavedPercent = (
    results.reduce((sum, r) => sum + r.savedPercent, 0) / results.length
  ).toFixed(1);

  console.log(`\n✅ Successfully converted: ${results.length} images`);
  console.log(`📦 Original size: ${formatBytes(totalOriginal)}`);
  console.log(`📦 WebP size: ${formatBytes(totalWebP)}`);
  console.log(`💾 Space saved: ${formatBytes(totalSaved)} (${avgSavedPercent}% average)`);

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
  console.log("🖼️  Starting image conversion to WebP...\n");
  console.log(`📁 Scanning: ${publicDir}\n`);

  const images = await findImages();
  console.log(`Found ${images.length} images to convert\n`);

  if (images.length === 0) {
    console.log("No images found to convert.");
    return;
  }

  // Convert each image
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const relativePath = path.relative(projectRoot, path.join(projectRoot, image));
    process.stdout.write(`[${i + 1}/${images.length}] Converting ${relativePath}... `);

    const result = await convertImage(image);
    if (result) {
      results.push(result);
      const savedStr = result.savedPercent > 0 ? `(${result.savedPercent}% saved)` : "";
      console.log(`✓ ${formatBytes(result.originalSize)} → ${formatBytes(result.webpSize)} ${savedStr}`);
    } else {
      console.log("⊘ skipped");
    }
  }

  printSummary();

  // Ask about deleting originals (for interactive use)
  // For automated execution, we'll delete them
  if (results.length > 0) {
    console.log("\n⚠️  Original files will be deleted after conversion.");
    await deleteOriginals();
  }

  console.log("\n✨ Conversion complete!");
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});

