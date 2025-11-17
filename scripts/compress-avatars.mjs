/**
 * Compress all JPEG/PNG images under `public/` without resizing them.
 * Run with: `node scripts/compress-avatars.mjs`
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const publicDir = path.join(projectRoot, "public");

const TARGET_FILES = [
  "zee.jpg",
  "awais.jpg",
  "hassan-arslan.png",
  "mughees.jpg",
  "fras.png",
];

const MAX_BYTES = 50 * 1024; // 50 KB

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

async function compressToLimit(filePath) {
  const relativePath = path.relative(publicDir, filePath);
  const extension = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    console.warn(`Skipping ${relativePath} (unsupported extension)`);
    return { skipped: true };
  }

  const buffer = await fs.readFile(filePath);
  const originalSize = buffer.byteLength;

  let widthLimit = 320;
  let quality = 85;
  let compressed = buffer;

  while (true) {
    const sharpInstance = sharp(buffer).resize({
      width: widthLimit,
      height: widthLimit,
      fit: "inside",
      withoutEnlargement: true,
    });

    compressed = await sharpInstance
      .jpeg({
        quality,
        mozjpeg: true,
        chromaSubsampling: "4:4:4",
      })
      .toBuffer();

    if (compressed.byteLength <= MAX_BYTES || quality <= 35) {
      if (compressed.byteLength > MAX_BYTES && widthLimit > 220) {
        widthLimit -= 40;
        continue;
      }
      break;
    }

    quality -= 5;
  }

  if (compressed.byteLength >= originalSize) {
    console.warn(
      `Skipping ${relativePath} (compressed ${compressed.byteLength} B >= original ${originalSize} B)`
    );
    return { skipped: true };
  }

  await fs.writeFile(filePath, compressed);
  console.log(
    `Compressed ${relativePath}: ${(originalSize / 1024).toFixed(
      1
    )} KB -> ${(compressed.byteLength / 1024).toFixed(1)} KB`
  );
  return { skipped: false };
}

async function main() {
  let processed = 0;
  let skipped = 0;

  for (const relative of TARGET_FILES) {
    const filePath = path.join(publicDir, relative);
    try {
      await fs.access(filePath);
    } catch {
      console.warn(`Missing file: ${relative}`);
      skipped += 1;
      continue;
    }

    try {
      const result = await compressToLimit(filePath);
      if (result?.skipped) {
        skipped += 1;
      } else {
        processed += 1;
      }
    } catch (error) {
      skipped += 1;
      console.error(`Failed to compress ${path.relative(publicDir, filePath)}`, error);
    }
  }

  console.log(
    `Compression run complete. Optimised ${processed} file(s), skipped ${skipped} file(s).`
  );
}

main().catch((error) => {
  console.error("Compression script failed", error);
  process.exitCode = 1;
});


