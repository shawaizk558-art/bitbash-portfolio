# Bulk Import Projects to Strapi

This guide explains how to bulk import 1000+ projects into Strapi CMS.

## Quick Start

1. **Prepare your projects data** in JSON format (see `sample-projects-data.json` for format)
2. **Make sure Strapi is running** on `http://localhost:1337`
3. **Run the import script**:
   ```bash
   npm run import-projects scripts/your-projects-data.json
   ```

## JSON File Format

Your JSON file should be an array of project objects. Each project must have:

### Required Fields:
- `name` (string) - Project name
- `slug` (string) - Unique slug (URL-friendly)
- `role` (string) - Project role/niche
- `quote` (string) - Short quote/testimonial
- `description` (string) - Full description

### Optional Fields:
- `technologies` (array) - Array of technology strings, e.g., `["React", "Node.js"]`
- `rating` (number) - Rating 1-5 (default: 5)
- `isFeatured` (boolean) - Mark as featured (default: false)
- `displayOrder` (number) - Sort order (default: 0)
- `publishedAt` (string) - ISO date string (default: current date)
- `targetAudience` (array) - Array of audience strings
- `keyFeatures` (array) - Array of feature strings
- `architectureHighlights` (array) - Array of highlight strings
- `youtubeVideoId` (string) - YouTube video ID
- `seoTitle` (string) - SEO title
- `seoDescription` (string) - SEO description

### Example:

```json
[
  {
    "name": "Project Name",
    "slug": "project-name",
    "role": "Project Role",
    "quote": "Short quote about the project",
    "description": "Full description of the project...",
    "technologies": ["React", "Node.js", "PostgreSQL"],
    "rating": 5,
    "isFeatured": false,
    "displayOrder": 1
  }
]
```

## Usage

### Basic Usage:
```bash
npm run import-projects scripts/your-projects.json
```

### With Custom File Path:
```bash
node scripts/bulk-import-projects.js /path/to/your/projects.json
```

## Features

- ✅ **Batch Processing**: Imports in batches of 10 (configurable)
- ✅ **Duplicate Detection**: Automatically skips projects that already exist
- ✅ **Error Handling**: Retries failed requests up to 3 times
- ✅ **Progress Tracking**: Shows real-time progress
- ✅ **Validation**: Validates all projects before importing
- ✅ **Rate Limiting**: Waits between batches to avoid overwhelming Strapi

## Configuration

You can modify these settings in `bulk-import-projects.js`:

- `BATCH_SIZE`: Number of projects per batch (default: 10)
- `DELAY_BETWEEN_BATCHES`: Milliseconds to wait between batches (default: 1000)
- `MAX_RETRIES`: Maximum retry attempts (default: 3)

## After Import

1. **Export to JSON files**:
   ```bash
   npm run export-data
   ```

2. **Verify in Strapi Admin**: Check that projects appear in Content Manager

3. **Test on Website**: Visit `/projects` to see imported projects

## Troubleshooting

### "Cannot connect to Strapi API"
- Make sure Strapi is running: `cd bitbash-cms && npm run develop`
- Check that Strapi is on `http://localhost:1337`

### "Duplicate slug" errors
- The script automatically skips duplicates
- If you want to update existing projects, delete them first in Strapi Admin

### Import is slow
- This is normal for large imports
- The script processes 10 projects at a time with delays
- For 1000 projects, expect ~10-15 minutes

### Some projects failed
- Check the error messages in the summary
- Common issues: invalid data format, network errors
- You can re-run the script - it will skip already imported projects

## Tips for Large Imports

1. **Test with small batch first**: Import 10-20 projects to verify format
2. **Keep Strapi running**: Don't close the Strapi terminal during import
3. **Monitor progress**: The script shows real-time progress
4. **Save your JSON file**: Keep a backup of your projects data
5. **Run export after import**: Always run `npm run export-data` after importing

## Example: Importing 1000 Projects

1. Create `projects-1000.json` with 1000 project objects
2. Run: `npm run import-projects scripts/projects-1000.json`
3. Wait for completion (~10-15 minutes)
4. Run: `npm run export-data`
5. Verify on website

