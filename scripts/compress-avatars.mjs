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

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const MIN_BYTES_TO_PROCESS = 10 * 1024; // Skip icons that are already tiny

const compressJpeg = (buffer) =>
  sharp(buffer).jpeg({
    quality: 78,
    mozjpeg: true,
    chromaSubsampling: "4:4:4",
  });

const compressPng = (buffer, isLarge) =>
  sharp(buffer).png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    palette: isLarge,
    quality: isLarge ? 90 : 100,
  });

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

function shouldProcess(filePath, size) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    SUPPORTED_EXTENSIONS.has(ext) &&
    size >= MIN_BYTES_TO_PROCESS &&
    !filePath.endsWith(".9.png") // skip nine-patch or specialised assets if present
  );
}

async function compressImage(filePath) {
  const relativePath = path.relative(publicDir, filePath);
  const extension = path.extname(filePath).toLowerCase();

  const original = await fs.readFile(filePath);
  const originalSize = original.byteLength;

  const pipeline =
    extension === ".png"
      ? compressPng(original, originalSize > 150 * 1024)
      : compressJpeg(original);

  const compressed = await pipeline.toBuffer();

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

  for await (const filePath of walk(publicDir)) {
    const stats = await fs.stat(filePath);
    if (!shouldProcess(filePath, stats.size)) {
      continue;
    }

    try {
      const result = await compressImage(filePath);
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


