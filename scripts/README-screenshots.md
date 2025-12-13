# Project Screenshot Generation

This script automatically generates thumbnail screenshots for project detail pages (projects 10+ only, skipping the top 9). Screenshots are stored in Vercel Blob Storage and served via API route.

## How It Works

1. **Content Hash Detection**: Generates a hash from project content (name, description, features, etc.)
2. **Incremental Generation**: Only generates screenshots for projects that have changed
3. **Automatic Updates**: Screenshots update automatically when project content changes
4. **Top 9 Exclusion**: Skips the first 9 projects (they use gradient placeholders)
5. **Blob Storage**: Screenshots are uploaded to Vercel Blob Storage automatically
6. **Daily Cron Job**: Screenshots are automatically regenerated daily in production via Vercel cron

## Usage

### Generate Screenshots

1. **Start the dev server** (in one terminal):
   ```bash
   npm run dev
   ```

2. **Run screenshot generation** (in another terminal):
   ```bash
   npm run screenshots
   ```

### Before Build

Screenshots are automatically generated before build:
```bash
npm run build
```

The `prebuild` script runs `export-data` first, then you can manually run screenshots if needed.

## Output

- **Screenshots**: 
  - Uploaded to Vercel Blob Storage at `project-screenshots/{slug}.png`
  - Also saved locally to `public/project-screenshots/{slug}.png` (for development)
  - Served via API route: `/api/screenshots/{slug}`
- **Manifest**: Tracks generated screenshots in `scripts/screenshot-manifest.json` (includes blob URLs)

## Configuration

- **Skip Top N**: Set `SKIP_TOP_N` constant in `generate-project-screenshots.ts` (default: 9)
- **Screenshot Content**: Only captures the hero section (project title, description, buttons)
- **Screenshot Quality**: 2x device scale (Retina quality)
- **Base URL**: 
  - Development: `http://localhost:8080` (dev server)
  - Production: Uses `process.env.VERCEL_URL` (automatically set by Vercel)

## Production Cron Job

Screenshots are automatically generated daily in production via Vercel cron job:
- **Schedule**: 9:00 AM UTC (2:00 PM PKT) daily
- **Route**: `/api/cron/generate-screenshots`
- **Configuration**: Defined in `vercel.json`

The cron job:
- Uses production URL to render project pages
- Generates screenshots using Puppeteer with `@sparticuz/chromium` (serverless-compatible)
- Uploads directly to Vercel Blob Storage
- Skips projects that already have screenshots in blob storage

## Notes

- Screenshots are only generated for projects without YouTube videos or preview videos
- The script checks if dev server is running before starting (local development only)
- Failed screenshots are logged but don't stop the process
- Manifest file is gitignored (build artifact)
- Screenshots are automatically uploaded to blob storage when generated
- API route (`/api/screenshots/{slug}`) serves screenshots from blob storage with local file fallback
- In production, screenshots are served from blob storage via the API route
- No need to commit/push screenshot files to git - they're stored in blob storage

