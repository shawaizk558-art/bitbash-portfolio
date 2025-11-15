# Complete Flow: CSV se Frontend tak - Step by Step

Yeh document explain karta hai ki CSV file se data frontend tak kaise pahunchta hai aur har script kya karti hai.

## Overview - Complete Flow

```
CSV File → JSON Conversion → Strapi Import → Strapi CMS → Export Script → JSON Files → Frontend Library → React Components → Website
```

---

## Step 1: CSV File Prepare Karna

**Kya karna hai:**
- Apni CSV file banayein jisme projects ka data ho
- Required columns: `name`, `slug`, `role`, `quote`, `description`
- Optional columns: `technologies`, `rating`, `isFeatured`, `displayOrder`

**Example CSV:**
```csv
name,slug,role,quote,description,technologies,rating
Project 1,project-1,Role 1,"Quote 1","Description 1","[""React"",""Node.js""]",5
Project 2,project-2,Role 2,"Quote 2","Description 2","[""Python""]",5
```

**Script involved:** None (manual step)

---

## Step 2: CSV ko JSON mein Convert Karna

**Command:**
```bash
npm run csv-to-json scripts/projects-sample.csv scripts/projects-data.json
```

**Kya hota hai:**
1. `scripts/csv-to-json.js` script run hoti hai
2. CSV file read hoti hai
3. CSV data parse hota hai (arrays, booleans, numbers handle hote hain)
4. JSON format mein convert hota hai
5. `scripts/projects-data.json` file create hoti hai

**Script ka kaam:**
- CSV parsing (quotes, commas handle karta hai)
- Data type conversion (strings, arrays, numbers, booleans)
- JSON formatting
- Error handling

**Output:** `scripts/projects-data.json` file

---

## Step 3: Strapi mein Projects Import Karna

**Command:**
```bash
npm run import-projects scripts/projects-data.json
```

**Kya hota hai:**
1. `scripts/bulk-import-projects.js` script run hoti hai
2. `.env` file se API token load hota hai
3. Strapi API se connection check hota hai
4. Existing projects check hote hain (duplicates avoid karne ke liye)
5. Har project ko Strapi API ke through create kiya jata hai
6. Progress real-time dikhaya jata hai

**Script ka kaam:**
- Environment variables load karna (dotenv)
- API token authentication
- Data validation (required fields check)
- Batch processing (10 projects at a time)
- Error handling aur retry logic
- Duplicate detection
- Progress tracking

**Output:** Projects Strapi CMS mein save ho jate hain

**Important:** 
- Strapi running hona chahiye (`localhost:1337`)
- API token `.env` file mein hona chahiye

---

## Step 4: Strapi se Data Export Karna

**Command:**
```bash
npm run export-data
```

**Kya hota hai:**
1. `scripts/export-strapi-data.js` script run hoti hai
2. Strapi API se sab projects fetch hote hain
3. Data transform hota hai (Strapi format se frontend format)
4. Featured projects filter hote hain (isFeatured = true wale)
5. JSON files create hote hain

**Script ka kaam:**
- Strapi API se data fetch karna
- Data transformation (v4/v5 format handle)
- Rich text se plain text extract karna
- Image URLs process karna
- Slug-based routes generate karna
- Index file create karna (slug → ID mapping)
- JSON files write karna

**Output Files:**
- `public/data/projects.json` - Sab projects ka array
- `public/data/projects-index.json` - Slug → ID mapping

**Important:**
- Ye files static hain (build time pe include hote hain)
- Production mein yehi files use hoti hain

---

## Step 5: Frontend Library - Data Load Karna

**File:** `src/lib/strapi.ts`

**Kya hota hai:**
1. Environment detect karta hai (development ya production)
2. Production: Direct JSON files se data load karta hai
3. Development: Pehle Strapi API try karta hai, phir JSON fallback

**Functions:**

### `getProjects()`
- Sab projects fetch karta hai
- Production: `/data/projects.json` se load
- Development: API try → JSON fallback
- Filtering, sorting, pagination support

### `getProjectBySlug(slug)`
- Single project fetch karta hai slug se
- Production: JSON index use karta hai
- Development: API try → JSON fallback

**Script ka kaam:**
- Environment-aware data loading
- Caching (memory mein)
- Error handling
- Data transformation

---

## Step 6: React Components - Data Display Karna

### Projects Page (`src/pages/Projects.tsx`)

**Kya hota hai:**
1. Component mount hote hi `getProjects()` call hota hai
2. Hardcoded projects (top 9) Showcase component se aate hain
3. Dynamic projects Strapi se fetch hote hain
4. Dono combine hoke display hote hain

**Flow:**
```
Component Mount
    ↓
useEffect trigger
    ↓
getProjects() call
    ↓
Strapi library check environment
    ↓
Production: Load from JSON
Development: Try API → Fallback to JSON
    ↓
Data set in state
    ↓
Render projects
```

### ProjectDetail Page (`src/pages/ProjectDetail.tsx`)

**Kya hota hai:**
1. URL se slug extract hota hai
2. Pehle hardcoded projects check hote hain
3. Agar nahi mila, Strapi se fetch hota hai
4. Project detail page render hota hai

**Flow:**
```
User clicks project
    ↓
Route: /project/{slug}
    ↓
ProjectDetail component mount
    ↓
getProjectBySlug(slug) call
    ↓
Check hardcoded first
    ↓
If not found → Check Strapi
    ↓
Display project details
```

---

## Complete Data Flow Diagram

```
┌─────────────────┐
│   CSV File      │  (Your data source)
└────────┬────────┘
         │
         │ Step 1: csv-to-json.js
         ▼
┌─────────────────┐
│  JSON File      │  (projects-data.json)
└────────┬────────┘
         │
         │ Step 2: bulk-import-projects.js
         ▼
┌─────────────────┐
│   Strapi CMS    │  (Database - localhost:1337)
└────────┬────────┘
         │
         │ Step 3: export-strapi-data.js
         ▼
┌─────────────────┐
│  Static JSON    │  (public/data/projects.json)
└────────┬────────┘
         │
         │ Step 4: strapi.ts library
         ▼
┌─────────────────┐
│ React Components│  (Projects.tsx, ProjectDetail.tsx)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Website       │  (User sees projects)
└─────────────────┘
```

---

## Har Script ka Detail

### 1. `csv-to-json.js`
**Location:** `scripts/csv-to-json.js`

**Purpose:** CSV ko JSON mein convert karna

**Kya karti hai:**
- CSV file read karti hai
- Headers parse karti hai
- Data rows parse karti hai (quotes, commas handle)
- Arrays, booleans, numbers convert karti hai
- JSON file write karti hai

**Input:** CSV file
**Output:** JSON file

---

### 2. `bulk-import-projects.js`
**Location:** `scripts/bulk-import-projects.js`

**Purpose:** JSON se projects Strapi mein import karna

**Kya karti hai:**
- `.env` file se API token load karti hai
- JSON file read karti hai
- Data validate karti hai (required fields check)
- Strapi API se connection check karti hai
- Existing projects check karti hai (duplicates)
- Projects ko batches mein import karti hai (10 at a time)
- Progress track karti hai
- Errors handle karti hai

**Input:** JSON file, API token
**Output:** Projects Strapi CMS mein

---

### 3. `export-strapi-data.js`
**Location:** `scripts/export-strapi-data.js`

**Purpose:** Strapi se data export karke static JSON files banana

**Kya karti hai:**
- Strapi API se sab projects fetch karti hai
- Data transform karti hai (Strapi format → Frontend format)
- Featured projects filter karti hai
- Image URLs process karti hai
- Slug-based routes generate karti hai
- Index file create karti hai (fast lookup ke liye)
- JSON files write karti hai

**Input:** Strapi API
**Output:** `public/data/projects.json`, `public/data/projects-index.json`

---

### 4. `strapi.ts` (Frontend Library)
**Location:** `src/lib/strapi.ts`

**Purpose:** Frontend ko data provide karna (environment-aware)

**Kya karti hai:**
- Environment detect karti hai (dev/prod)
- Production: JSON files se load
- Development: API try → JSON fallback
- Data cache karti hai (memory mein)
- Filtering, sorting, pagination support
- Error handling

**Functions:**
- `getProjects()` - Sab projects
- `getProjectBySlug()` - Single project

**Input:** JSON files ya Strapi API
**Output:** Project data (React components ko)

---

## Complete Workflow Example

### Scenario: 1000 Projects Import Karna

**Step 1:** CSV file banayein
```bash
# Excel/Google Sheets mein 1000 projects ka data
# Save as: projects-1000.csv
```

**Step 2:** CSV ko JSON mein convert
```bash
npm run csv-to-json projects-1000.csv projects-1000.json
```
**Time:** ~5 seconds

**Step 3:** Strapi mein import
```bash
npm run import-projects projects-1000.json
```
**Time:** ~10-15 minutes (1000 projects)

**Step 4:** Export for website
```bash
npm run export-data
```
**Time:** ~10 seconds

**Step 5:** Website pe verify
```bash
npm run dev
# Visit: http://localhost:5173/projects
```

---

## Important Points

### Development Mode
- Frontend pehle Strapi API try karta hai
- Agar API fail ho, JSON files use hoti hain
- Live updates milte hain (Strapi running ho to)

### Production Mode
- Frontend hamesha JSON files use karta hai
- API calls nahi hote
- Fast aur reliable

### Data Flow Priority
1. **Hardcoded Projects** (top 9) - Always shown first
2. **Strapi Projects** - Shown below hardcoded
3. **Slug Collision** - Hardcoded takes precedence

---

## Quick Reference Commands

| Step | Command | Purpose |
|------|---------|---------|
| Convert | `npm run csv-to-json input.csv output.json` | CSV → JSON |
| Import | `npm run import-projects projects.json` | JSON → Strapi |
| Export | `npm run export-data` | Strapi → JSON files |
| Dev | `npm run dev` | Start website |

---

## Troubleshooting

### CSV conversion fail ho rahi hai
- Check CSV format (quotes, commas)
- Verify required columns present hain

### Import fail ho raha hai
- Strapi running hai? (`localhost:1337`)
- API token set hai? (`.env` file check karo)
- Field names match karte hain? (Strapi schema check karo)

### Projects website pe nahi dikh rahe
- Export script run kiya? (`npm run export-data`)
- JSON files exist karte hain? (`public/data/projects.json`)
- Dev server restart kiya?

---

## Summary

**Complete Process:**
1. CSV → JSON (csv-to-json.js)
2. JSON → Strapi (bulk-import-projects.js)
3. Strapi → Static JSON (export-strapi-data.js)
4. JSON → Frontend (strapi.ts library)
5. Frontend → Website (React components)

**Key Files:**
- `scripts/csv-to-json.js` - CSV conversion
- `scripts/bulk-import-projects.js` - Bulk import
- `scripts/export-strapi-data.js` - Data export
- `src/lib/strapi.ts` - Frontend library
- `src/pages/Projects.tsx` - Projects page
- `src/pages/ProjectDetail.tsx` - Detail page

Yeh complete flow hai CSV se frontend tak!

