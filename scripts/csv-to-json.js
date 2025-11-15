/**
 * CSV to JSON Converter for Projects
 * 
 * Converts a CSV file with projects to JSON format for bulk import.
 * 
 * Usage: node scripts/csv-to-json.js input.csv output.json
 * 
 * Example: node scripts/csv-to-json.js scripts/projects-sample.csv scripts/projects-data.json
 */

/* eslint-env node */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parse CSV line (handles quoted fields with commas)
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current.trim());
  return result;
}

/**
 * Parse JSON array string (handles arrays in CSV)
 */
function parseJSONArray(value) {
  if (!value || value === '') return [];
  
  // Remove surrounding quotes if present
  value = value.trim();
  if (value.startsWith('"') && value.endsWith('"')) {
    value = value.slice(1, -1);
  }
  
  // Replace escaped quotes
  value = value.replace(/""/g, '"');
  
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // If not valid JSON, try splitting by comma
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }
    return value.split(',').map(item => item.trim().replace(/^"|"$/g, ''));
  }
}

/**
 * Parse boolean value
 */
function parseBoolean(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return lower === 'true' || lower === '1' || lower === 'yes';
  }
  return false;
}

/**
 * Parse number value
 */
function parseNumber(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value.trim());
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

/**
 * Convert CSV to JSON
 */
function csvToJSON(csvPath, outputPath) {
  console.log('📄 Converting CSV to JSON...');
  console.log(`Input: ${csvPath}`);
  console.log(`Output: ${outputPath}\n`);
  
  // Read CSV file
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Error: File not found: ${csvPath}`);
    process.exit(1);
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length < 2) {
    console.error('❌ Error: CSV file must have at least a header row and one data row');
    process.exit(1);
  }
  
  // Parse header
  const headers = parseCSVLine(lines[0]);
  console.log(`✓ Found ${headers.length} columns: ${headers.join(', ')}\n`);
  
  // Parse data rows
  const projects = [];
  let errors = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = parseCSVLine(line);
    
    if (values.length !== headers.length) {
      errors.push(`Row ${i + 1}: Expected ${headers.length} columns, got ${values.length}`);
      continue;
    }
    
    const project = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      const headerLower = header.toLowerCase();
      
      // Handle different field types
      if (headerLower === 'technologies' || 
          headerLower === 'targetaudience' || 
          headerLower === 'keyfeatures' || 
          headerLower === 'architecturehighlights') {
        project[header] = parseJSONArray(value);
      } else if (headerLower === 'rating' || headerLower === 'displayorder') {
        const num = parseNumber(value);
        if (num !== undefined) {
          project[header] = num;
        }
      } else if (headerLower === 'isfeatured') {
        project[header] = parseBoolean(value);
      } else {
        // String field - remove surrounding quotes
        let stringValue = value.trim();
        if (stringValue.startsWith('"') && stringValue.endsWith('"')) {
          stringValue = stringValue.slice(1, -1);
        }
        // Replace escaped quotes
        stringValue = stringValue.replace(/""/g, '"');
        project[header] = stringValue;
      }
    });
    
    projects.push(project);
  }
  
  // Show errors if any
  if (errors.length > 0) {
    console.warn('⚠️  Warnings:');
    errors.forEach(error => console.warn(`  - ${error}`));
    console.log('');
  }
  
  // Write JSON file
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf8');
  
  console.log(`✅ Conversion complete!`);
  console.log(`   Converted ${projects.length} projects`);
  console.log(`   Output saved to: ${outputPath}\n`);
  console.log('Next step: Run the import script');
  console.log(`   npm run import-projects ${outputPath}`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node scripts/csv-to-json.js <input.csv> [output.json]');
    console.log('\nExample:');
    console.log('  node scripts/csv-to-json.js scripts/projects-sample.csv scripts/projects-data.json');
    process.exit(1);
  }
  
  const inputPath = args[0];
  const outputPath = args[1] || inputPath.replace(/\.csv$/i, '.json');
  
  csvToJSON(inputPath, outputPath);
}

main();

