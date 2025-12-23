#!/usr/bin/env node

/**
 * Find Slow Imports Script
 * Helps identify which imports might be causing slow script evaluation
 * 
 * Run: node scripts/find-slow-imports.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const srcPath = join(process.cwd(), 'src');

// Known heavy libraries
const HEAVY_LIBRARIES = [
  'lucide-react',
  '@radix-ui',
  'react-markdown',
  'remark-gfm',
  'three',
  '@react-three',
  'lenis',
  'mongodb',
  'puppeteer',
];

// Known large data files
const DATA_FILES = [
  'projects.json',
  'mongodb-projects.json',
  'strapi-projects.json',
];

function findImports(filePath, content) {
  const imports = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Match import statements
    const importMatch = line.match(/^import\s+(?:.*\s+from\s+)?['"]([^'"]+)['"]/);
    if (importMatch) {
      const importPath = importMatch[1];
      const isHeavy = HEAVY_LIBRARIES.some(lib => importPath.includes(lib));
      const isDataFile = DATA_FILES.some(file => importPath.includes(file));
      
      imports.push({
        file: filePath.replace(process.cwd(), ''),
        line: index + 1,
        import: importPath,
        isHeavy,
        isDataFile,
        isLazy: line.includes('lazy') || line.includes('import('),
      });
    }
  });
  
  return imports;
}

function scanDirectory(dir) {
  const results = [];
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory() && !entry.includes('node_modules')) {
      results.push(...scanDirectory(fullPath));
    } else if (stat.isFile() && ['.ts', '.tsx', '.js', '.jsx'].includes(extname(entry))) {
      try {
        const content = readFileSync(fullPath, 'utf-8');
        const imports = findImports(fullPath, content);
        results.push(...imports);
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
  
  return results;
}

console.log('🔍 Scanning for heavy imports...\n');

const allImports = scanDirectory(srcPath);

// Group by import path
const importMap = new Map();
allImports.forEach(imp => {
  if (!importMap.has(imp.import)) {
    importMap.set(imp.import, []);
  }
  importMap.get(imp.import).push(imp);
});

// Find heavy imports
const heavyImports = [];
importMap.forEach((usages, importPath) => {
  const isHeavy = HEAVY_LIBRARIES.some(lib => importPath.includes(lib));
  const isDataFile = DATA_FILES.some(file => importPath.includes(file));
  const lazyCount = usages.filter(u => u.isLazy).length;
  const syncCount = usages.length - lazyCount;
  
  if (isHeavy || isDataFile || syncCount > 0) {
    heavyImports.push({
      import: importPath,
      totalUsages: usages.length,
      lazyUsages: lazyCount,
      syncUsages: syncCount,
      isHeavy,
      isDataFile,
      files: usages.map(u => u.file),
    });
  }
});

// Sort by sync usages (most problematic first)
heavyImports.sort((a, b) => b.syncUsages - a.syncUsages);

console.log('⚠️  Heavy/Synchronous Imports Found:\n');

if (heavyImports.length === 0) {
  console.log('✅ No heavy synchronous imports found!');
} else {
  heavyImports.forEach((imp, index) => {
    console.log(`${index + 1}. ${imp.import}`);
    console.log(`   Total usages: ${imp.totalUsages}`);
    console.log(`   Lazy loaded: ${imp.lazyUsages}`);
    console.log(`   ⚠️  Synchronous: ${imp.syncUsages}`);
    if (imp.isHeavy) {
      console.log(`   🔴 Heavy library detected!`);
    }
    if (imp.isDataFile) {
      console.log(`   📊 Large data file detected!`);
    }
    if (imp.syncUsages > 0) {
      console.log(`   Files using synchronously:`);
      imp.files.filter(f => !f.includes('lazy')).slice(0, 3).forEach(file => {
        console.log(`     - ${file}`);
      });
    }
    console.log('');
  });
}

console.log('\n💡 Recommendations:');
console.log('1. Convert synchronous imports to lazy() where possible');
console.log('2. Move heavy libraries to separate chunks (already done in vite.config.ts)');
console.log('3. Defer data file loading until needed');
console.log('4. Use dynamic imports for heavy components\n');


