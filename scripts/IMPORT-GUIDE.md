# Complete Import Process Guide

This guide walks you through importing projects from CSV to Strapi.

## Step-by-Step Process

### Step 1: Prepare Your CSV File

Your CSV file should have these columns (in any order):

**Required Columns:**
- `name` - Project name
- `slug` - Unique slug (URL-friendly)
- `role` - Project role/niche
- `quote` - Short quote/testimonial
- `description` - Full description

**Optional Columns:**
- `technologies` - JSON array: `["React", "Node.js"]`
- `rating` - Number 1-5 (default: 5)
- `isFeatured` - true/false (default: false)
- `displayOrder` - Number for sorting (default: 0)
- `targetAudience` - JSON array: `["Audience 1", "Audience 2"]`
- `keyFeatures` - JSON array: `["Feature 1", "Feature 2"]`
- `architectureHighlights` - JSON array: `["Highlight 1"]`
- `youtubeVideoId` - YouTube video ID
- `seoTitle` - SEO title
- `seoDescription` - SEO description

### Step 2: Convert CSV to JSON

```bash
npm run csv-to-json scripts/projects-sample.csv scripts/projects-data.json
```

Or with custom paths:
```bash
node scripts/csv-to-json.js input.csv output.json
```

**What this does:**
- Reads your CSV file
- Converts it to JSON format
- Handles arrays, booleans, and numbers correctly
- Saves to JSON file ready for import

### Step 3: Make Sure Strapi is Running

Open a terminal and start Strapi:

```bash
cd bitbash-cms
npm run develop
```

Wait until you see:
```
✅ Strapi started successfully
```

### Step 4: Import Projects to Strapi

```bash
npm run import-projects scripts/projects-data.json
```

**What this does:**
- Validates all projects
- Checks for duplicates
- Imports in batches of 10
- Shows progress in real-time
- Displays summary at the end

### Step 5: Export to JSON Files

After importing, export the data for your website:

```bash
npm run export-data
```

This creates:
- `public/data/projects.json` - All projects
- `public/data/projects-index.json` - Slug mapping

### Step 6: Verify

1. **Check Strapi Admin**: Go to `http://localhost:1337/admin` → Content Manager → Projects
2. **Check Website**: Visit `http://localhost:5173/projects` (or your dev URL)
3. **Test Detail Page**: Click on a project to see the detail page

## Complete Example

Here's the full process with the sample CSV:

```bash
# 1. Convert CSV to JSON
npm run csv-to-json scripts/projects-sample.csv scripts/projects-data.json

# 2. Make sure Strapi is running (in another terminal)
cd bitbash-cms && npm run develop

# 3. Import to Strapi
npm run import-projects scripts/projects-data.json

# 4. Export for website
npm run export-data

# 5. Start dev server and verify
npm run dev
```

## CSV Format Tips

### Arrays in CSV

For array fields (technologies, targetAudience, etc.), use JSON array format:

```csv
technologies
["React", "Node.js", "PostgreSQL"]
```

Or with quotes:
```csv
technologies
"[""React"",""Node.js""]"
```

### Booleans

Use: `true`, `false`, `1`, `0`, `yes`, `no`

### Numbers

Just use the number: `5`, `1`, `100`

### Text with Commas

If your text contains commas, wrap it in quotes:

```csv
quote
"This is a quote, with a comma, in it"
```

## Troubleshooting

### "File not found" error
- Make sure you're in the project root directory
- Check the file path is correct
- Use absolute paths if needed

### "Cannot connect to Strapi API"
- Make sure Strapi is running
- Check it's on `http://localhost:1337`
- Wait for Strapi to fully start

### "Validation errors"
- Check your CSV format
- Make sure required fields are present
- Verify arrays are in JSON format

### "Duplicate slug" errors
- The script automatically skips duplicates
- If you want to update, delete the project in Strapi first

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run csv-to-json input.csv output.json` | Convert CSV to JSON |
| `npm run import-projects projects.json` | Import projects to Strapi |
| `npm run export-data` | Export Strapi data to JSON files |

## Next Steps

After importing:
1. ✅ Projects are in Strapi
2. ✅ JSON files are generated
3. ✅ Projects appear on your website
4. ✅ You can add/edit projects in Strapi Admin
5. ✅ Run `npm run export-data` after any changes

