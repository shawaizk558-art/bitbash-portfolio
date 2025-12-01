import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

interface AssetConfig {
  name: string;
  input: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const sourceDir = path.join(projectRoot, "assets", "gif-source");
const outputVideoDir = path.join(publicDir, "media");
const outputPosterDir = path.join(publicDir, "media-posters");

const assets: AssetConfig[] = [
  { name: "petla", input: "petla.gif" },
  { name: "actuarylist", input: "actuarylist.gif" },
  { name: "scraperglass", input: "scraperglass.gif" },
  { name: "threads-scraper", input: "thread-scraper.gif" },
  { name: "twitter", input: "twitter.gif" },
  { name: "spotify", input: "spotify.gif" },
  { name: "ttinit", input: "ttinit.gif" },
  { name: "purepeak", input: "purepeak.gif" },
  { name: "facebook", input: "facebook.gif" },
  { name: "linkedin-automation", input: "linkedin_automation-system.gif" },
  { name: "api-scraper", input: "api-scraper.gif" },
  { name: "kareem", input: "kareem.gif" },
  { name: "syed", input: "Syed_Actuary-list.gif" },
  { name: "odeta", input: "odeta.gif" },
  { name: "hugo", input: "hugo.gif" },
];

async function ensureDirs() {
  await fs.mkdir(outputVideoDir, { recursive: true });
  await fs.mkdir(outputPosterDir, { recursive: true });
}

function runFfmpeg(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    if (!ffmpegPath) {
      reject(new Error("ffmpeg-static binary not found"));
      return;
    }
    const proc = spawn(ffmpegPath, args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function convertAsset(asset: AssetConfig) {
  const inputPath = path.join(sourceDir, asset.input);
  const mp4Path = path.join(outputVideoDir, `${asset.name}.mp4`);
  const webmPath = path.join(outputVideoDir, `${asset.name}.webm`);
  const posterPath = path.join(outputPosterDir, `${asset.name}.jpg`);

  await fs.access(inputPath);

  console.log(`\nConverting ${asset.input} -> ${asset.name}`);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-movflags",
    "+faststart",
    "-pix_fmt",
    "yuv420p",
    "-vf",
    "scale=iw:min(720\\,ih):-2",
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-crf",
    "23",
    mp4Path,
  ]);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    "33",
    "-vf",
    "scale=iw:min(720\\,ih):-2",
    webmPath,
  ]);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-vf",
    "scale=iw:min(720\\,ih):-2",
    "-vframes",
    "1",
    "-update",
    "1",
    posterPath,
  ]);
}

async function main() {
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static binary not found");
  }

  await ensureDirs();

  for (const asset of assets) {
    try {
      await convertAsset(asset);
    } catch (error) {
      console.error(`Failed to convert ${asset.input}:`, error);
    }
  }

  console.log("\nConversion complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

