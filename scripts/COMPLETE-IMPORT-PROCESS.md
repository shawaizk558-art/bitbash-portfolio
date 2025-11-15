# Complete Import Process - Step by Step

This guide shows you exactly how to import 1000 projects from CSV to Strapi.

## Prerequisites

- ✅ Strapi is installed and running
- ✅ You have a CSV file with projects data
- ✅ You're in the project root directory

## Step 1: Prepare Your CSV File

I've created a sample CSV file: `scripts/projects-sample.csv` with 3 example projects.

Your CSV should have these columns:
- `name`, `slug`, `role`, `quote`, `description` (required)
- `technologies`, `rating`, `isFeatured`, `displayOrder` (optional)
- `targetAudience`, `keyFeatures`, `architectureHighlights` (optional)

## Step 2: Convert CSV to JSON

```bash
npm run csv-to-json scripts/projects-sample.csv scripts/projects-data.json
```

**Output**: Creates `scripts/projects-data.json` ready for import.

## Step 3: Get Strapi API Token

You need an API token to create projects via API.

### Option A: Get Token from Strapi Admin

1. Open Strapi Admin: `http://localhost:1337/admin`
2. Go to **Settings** → **API Tokens** (under Users & Permissions Plugin)
3. Click **"Create new API Token"**
4. Fill in:
   - **Name**: `Bulk Import Token`
   - **Token type**: `Full access` (or Custom with Project permissions)
   - **Token duration**: `Unlimited`
5. Click **"Save"**
6. **Copy the token immediately** (you won't see it again!)

### Option B: Use Environment Variable

Create a `.env` file in your project root:

```env
STRAPI_API_TOKEN=your-token-here
```

Or export it in your terminal:

```bash
export STRAPI_API_TOKEN="your-token-here"
```

## Step 4: Make Sure Strapi is Running

In a separate terminal:

```bash
cd bitbash-cms
npm run develop
```

Wait until you see: `✅ Strapi started successfully`

## Step 5: Import Projects

```bash
npm run import-projects scripts/projects-data.json
```

**What happens:**
- ✅ Validates all projects
- ✅ Checks for duplicates
- ✅ Imports in batches of 10
- ✅ Shows real-time progress
- ✅ Displays summary

**Example output:**
```
🚀 Strapi Bulk Project Import
==================================================
✓ Loaded 3 projects
✓ All 3 projects are valid
✓ API token found
✓ Connected to Strapi API
✓ Found 1 existing projects

Importing 2 projects in batches of 10...

Batch 1/1 (2 projects)...
  ✓ [1/2] Social Media Analytics Dashboard
  ✓ [2/2] Automated Content Scheduler

==================================================
Import Summary:
==================================================
✅ Successfully imported: 2
✗ Failed: 0
⊘ Skipped: 1
📊 Total processed: 3
==================================================
```

## Step 6: Export to JSON Files

After importing, export the data for your website:

```bash
npm run export-data
```

This creates:
- `public/data/projects.json` - All projects
- `public/data/projects-index.json` - Slug mapping

## Step 7: Verify

1. **Check Strapi Admin**: 
   - Go to `http://localhost:1337/admin`
   - Content Manager → Projects
   - You should see your imported projects

2. **Check Website**:
   ```bash
   npm run dev
   ```
   - Visit `http://localhost:5173/projects`
   - You should see your projects below the top 9

3. **Test Detail Page**:
   - Click on a project
   - Should show the full project detail page

## Complete Example (3 Projects)

Here's the exact commands to run:

```bash
# 1. Convert CSV to JSON
npm run csv-to-json scripts/projects-sample.csv scripts/projects-data.json

# 2. Get API token from Strapi Admin (see Step 3 above)
# Then set it:
export STRAPI_API_TOKEN="your-token-here"

# 3. Make sure Strapi is running (in another terminal)
# cd bitbash-cms && npm run develop

# 4. Import projects
npm run import-projects scripts/projects-data.json

# 5. Export for website
npm run export-data

# 6. Start dev server and verify
npm run dev
```

## For 1000 Projects

Same process, just with a larger CSV file:

```bash
# 1. Create your CSV with 1000 projects
# (Use Excel, Google Sheets, or any CSV editor)

# 2. Convert to JSON
npm run csv-to-json scripts/projects-1000.csv scripts/projects-1000.json

# 3. Set API token
export STRAPI_API_TOKEN="your-token-here"

# 4. Import (will take ~10-15 minutes for 1000 projects)
npm run import-projects scripts/projects-1000.json

# 5. Export
npm run export-data
```

## Troubleshooting

### "No API token found"
- Get token from Strapi Admin (Step 3)
- Set it as environment variable or in `.env` file

### "Cannot connect to Strapi API"
- Make sure Strapi is running: `cd bitbash-cms && npm run develop`
- Check it's on `http://localhost:1337`

### "HTTP 403 Forbidden"
- You need an API token with proper permissions
- Make sure token has "Full access" or "Custom" with Project create permission

### "Validation errors"
- Check your CSV format
- Make sure required fields are present
- Verify arrays are in JSON format: `["Item 1", "Item 2"]`

### Import is slow
- Normal for large imports
- 1000 projects takes ~10-15 minutes
- Script processes 10 at a time with delays

## Quick Reference

| Step | Command |
|------|---------|
| Convert CSV | `npm run csv-to-json input.csv output.json` |
| Import | `npm run import-projects projects.json` |
| Export | `npm run export-data` |

## Files Created

- ✅ `scripts/projects-sample.csv` - Sample CSV with 3 projects
- ✅ `scripts/csv-to-json.js` - CSV to JSON converter
- ✅ `scripts/bulk-import-projects.js` - Bulk import script
- ✅ `scripts/projects-data.json` - Generated JSON (after conversion)

## Next Steps

After importing:
1. ✅ Projects are in Strapi
2. ✅ JSON files are generated
3. ✅ Projects appear on your website
4. ✅ You can add/edit more projects in Strapi Admin
5. ✅ Run `npm run export-data` after any changes

