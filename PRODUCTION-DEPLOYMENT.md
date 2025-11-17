# Production Deployment Guide

## Overview

Your frontend is deployed on Vercel and uses static JSON files in production. Strapi server is NOT needed at runtime.

## How It Works

### Production Architecture

```
Build Time (Vercel):
    ↓
Export Script Runs (prebuild hook)
    ↓
Tries to fetch from Strapi (if available)
    ↓
Generates JSON files (public/data/projects.json)
    ↓
Build includes JSON files
    ↓
Deploy to Vercel

Runtime (Production):
    ↓
Frontend reads from JSON files (static)
    ↓
No Strapi API calls
    ↓
Fast & Reliable ✅
```

## Deployment Options

### Option 1: Strapi Not Deployed (Simplest)

**Workflow:**
1. Export JSON files locally before deploying
2. Commit JSON files to Git
3. Push to GitHub
4. Vercel builds with existing JSON files
5. Frontend uses JSON files (no Strapi needed)

**Steps:**
```bash
# 1. Export data locally (Strapi running)
npm run export-data

# 2. Commit JSON files
git add public/data/
git commit -m "Update projects data"
git push

# 3. Vercel automatically builds and deploys
```

**Benefits:**
- No Strapi server costs
- Simple workflow
- Fast builds

### Option 2: Strapi Deployed (For Content Management)

**Workflow:**
1. Deploy Strapi to Railway/Render/DigitalOcean
2. Set environment variable in Vercel: `VITE_STRAPI_API_URL`
3. Vercel build fetches from deployed Strapi
4. JSON files generated during build
5. Frontend uses JSON files

**Steps:**
1. Deploy Strapi (Railway/Render)
2. Get Strapi URL: `https://your-strapi.railway.app`
3. In Vercel Dashboard → Settings → Environment Variables:
   - Add: `VITE_STRAPI_API_URL=https://your-strapi.railway.app/api`
4. Push to GitHub
5. Vercel build automatically fetches from Strapi

**Benefits:**
- Content team can manage projects
- Automatic updates on deploy
- Still uses static JSON at runtime (fast)

## Current Setup

### Build Configuration

**File:** `package.json`
```json
{
  "scripts": {
    "prebuild": "npm run export-data",
    "build": "vite build"
  }
}
```

**What happens:**
- `npm run build` runs automatically
- `prebuild` hook runs `export-data` first
- Export script tries Strapi API
- If unavailable, uses existing JSON files
- Build proceeds with JSON files

### Export Script Behavior

**File:** `scripts/export-strapi-data.js`

**If Strapi Available:**
- Fetches latest data
- Generates JSON files
- Build continues

**If Strapi Unavailable:**
- Uses existing JSON files (if exist)
- Creates empty files (if don't exist)
- Build continues (doesn't fail)

## Vercel Configuration

### Current Setup

**File:** `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This is correct for React Router.

### Environment Variables (Optional)

If Strapi is deployed, add in Vercel Dashboard:

**Settings → Environment Variables:**
- `VITE_STRAPI_API_URL` = `https://your-strapi-url.com/api`
- `VITE_STRAPI_URL` = `https://your-strapi-url.com`

## Deployment Checklist

### Before First Deploy

- [ ] Export data locally: `npm run export-data`
- [ ] Commit JSON files: `git add public/data/ && git commit`
- [ ] Push to GitHub
- [ ] Verify JSON files exist in repo

### For Strapi Deployment (Optional)

- [ ] Deploy Strapi to Railway/Render
- [ ] Get Strapi URL
- [ ] Add environment variables in Vercel
- [ ] Test build locally with Strapi URL

## Production Workflow

### Scenario 1: No Strapi Deployed

```bash
# Local development
1. Run Strapi locally
2. Add/edit projects in Strapi
3. Run: npm run export-data
4. Commit JSON files
5. Push to GitHub
6. Vercel builds and deploys
```

### Scenario 2: Strapi Deployed

```bash
# Content management
1. Content team adds projects in Strapi (deployed)
2. Developer pushes code to GitHub
3. Vercel build:
   - Runs export script
   - Fetches from deployed Strapi
   - Generates JSON files
   - Builds frontend
4. Deploy completes
```

## Important Notes

1. **JSON Files Must Be Committed**
   - `public/data/projects.json` should be in Git
   - This ensures build works even if Strapi unavailable

2. **Export Script is Production-Safe**
   - Won't fail build if Strapi unavailable
   - Uses existing JSON files if available
   - Creates empty files if needed

3. **Frontend Always Uses JSON in Production**
   - No API calls at runtime
   - Fast and reliable
   - Works offline

## Troubleshooting

### Build Fails on Vercel

**Check:**
- JSON files committed to Git?
- Export script error?
- Check Vercel build logs

### Projects Not Showing

**Check:**
- JSON files exist in `public/data/`?
- Files committed to Git?
- Build logs show export success?

### Strapi Connection Issues

**Solution:**
- Export locally first
- Commit JSON files
- Build will use existing files

## Summary

**Production Setup:**
- ✅ Export script runs before build
- ✅ Uses existing JSON if Strapi unavailable
- ✅ Frontend always uses JSON files (no API calls)
- ✅ Fast, reliable, no server dependency

**You're ready to deploy!** 🚀

