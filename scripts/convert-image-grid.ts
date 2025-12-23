/**
 * Convert image-grid images to WebP format
 * Handles JPG and HEIC files
 */

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const imageGridDir = path.join(projectRoot, "public", "images", "image-grid");

async function convertImage(fileName: string): Promise<void> {
  const inputPath = path.join(imageGridDir, fileName);
  const ext = path.extname(fileName);
  const baseName = path.basename(fileName, ext);
  const outputPath = path.join(imageGridDir, `${baseName}.webp`);

  try {
    console.log(`Converting ${fileName} -> ${baseName}.webp...`);
    
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    console.log(`✓ Converted ${fileName} (${(inputStats.size / 1024).toFixed(1)}KB -> ${(outputStats.size / 1024).toFixed(1)}KB, ${saved}% saved)`);
  } catch (error) {
    console.error(`✗ Error converting ${fileName}:`, error);
    throw error;
  }
}

async function main() {
  console.log("🖼️  Converting image-grid images to WebP...\n");
  
  const images = ["1.JPG", "2.JPG", "3.JPG", "4 Large.jpeg", "5 Large.jpeg"];
  
  for (const image of images) {
    const imagePath = path.join(imageGridDir, image);
    try {
      await fs.access(imagePath);
      // Convert "4 Small.jpeg" -> "4.webp", "4 Large.jpeg" -> "4.webp", "5 Small.jpeg" -> "5.webp"
      const outputName = image.replace(/ (Small|Large)\.jpeg$/i, "").replace(/\.(jpg|jpeg|heic)$/i, "");
      const ext = path.extname(image);
      const inputPath = path.join(imageGridDir, image);
      const outputPath = path.join(imageGridDir, `${outputName}.webp`);
      
      console.log(`Converting ${image} -> ${outputName}.webp...`);
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);

      const inputStats = await fs.stat(inputPath);
      const outputStats = await fs.stat(outputPath);
      const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      
      console.log(`✓ Converted ${image} (${(inputStats.size / 1024).toFixed(1)}KB -> ${(outputStats.size / 1024).toFixed(1)}KB, ${saved}% saved)`);
    } catch (error) {
      console.warn(`⚠️  Skipping ${image}: File not found or error`);
    }
  }
  
  console.log("\n✨ Conversion complete!");
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});

