#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Helps identify what's causing high main-thread work
 * 
 * Run: node scripts/analyze-bundle.js
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const statsPath = join(distPath, 'stats.html');

console.log('🔍 Bundle Analysis Tool\n');
console.log('This script helps identify heavy dependencies.\n');

if (!existsSync(distPath)) {
  console.log('❌ dist/ folder not found. Please run: npm run build');
  process.exit(1);
}

console.log('✅ Build folder found\n');

console.log('📊 To analyze your bundle:');
console.log('1. Run: npm run build');
console.log('2. Open: dist/stats.html in your browser');
console.log('3. Look for large chunks (>100KB)');
console.log('\n');

console.log('🔎 Common culprits for high Script Evaluation time:');
console.log('  • lucide-react (icon library) - can be 200-300KB');
console.log('  • @radix-ui components - loaded synchronously');
console.log('  • react-markdown + remark-gfm - heavy markdown parsing');
console.log('  • react-helmet-async - head management');
console.log('  • Synchronous component imports on Index page');
console.log('\n');

console.log('💡 Quick fixes to try:');
console.log('  1. Defer icon loading (lucide-react)');
console.log('  2. Lazy load Navigation, Hero, Features');
console.log('  3. Defer Radix UI components');
console.log('  4. Check Chrome DevTools Performance tab');
console.log('     - Record page load');
console.log('     - Look at "Bottom-Up" view');
console.log('     - Sort by "Self Time"');
console.log('     - Find functions taking >50ms');
console.log('\n');

console.log('📈 Chrome DevTools Performance Analysis:');
console.log('  1. Open Chrome DevTools (F12)');
console.log('  2. Go to Performance tab');
console.log('  3. Click Record (Ctrl+E / Cmd+E)');
console.log('  4. Reload page');
console.log('  5. Stop recording');
console.log('  6. In "Bottom-Up" view, look for:');
console.log('     - Functions with high "Self Time"');
console.log('     - Large "Total Time"');
console.log('     - Check "Call Tree" to see what calls them');
console.log('\n');

