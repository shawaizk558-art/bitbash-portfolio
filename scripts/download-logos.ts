/**
 * Script to download all required Simple Icons logos
 * Run with: npx tsx scripts/download-logos.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fetch } from 'undici';

// List of all unique icons needed (extracted from LOGO_KEYWORDS)
const REQUIRED_ICONS = [
  // Social Media
  'linkedin',
  'twitter',
  'x',
  'facebook',
  'instagram',
  'tiktok',
  'youtube',
  'reddit',
  'pinterest',
  'snapchat',
  
  // E-commerce
  'shopify',
  'amazon',
  'ebay',
  'etsy',
  'aliexpress',
  
  // Business & Professional
  'crunchbase',
  'glassdoor',
  'indeed',
  'monster',
  'apollo',
  'pipedrive',
  'intercom',
  'zapier',
  'trustpilot',
  'kickstarter',
  
  // Google Services
  'googlemaps',
  'gmail',
  'google',
  'googlesheets',
  'googledrive',
  
  // Travel & Hospitality
  'airbnb',
  'bookingdotcom',
  'tripadvisor',
  'expedia',
  'vrbo',
  'furnishedfinder',
  
  // Real Estate
  'zillow',
  'trulia',
  'realtor',
  
  // Classifieds
  'craigslist',
  'yelp',
  'subito',
  
  // Development
  'github',
  'gitlab',
  'bitbucket',
  'stackoverflow',
  
  // Communication
  'discord',
  'telegram',
  'whatsapp',
  'slack',
  'microsoftteams',
  'zoom',
  
  // Media & Entertainment
  'spotify',
  'netflix',
  'twitch',
  
  // Financial & Trading
  'metatrader5',
  'tradingview',
  'binance',
  'coinbase',
  '23andme',
  
  // Other Platforms
  'notion',
  'trello',
  'asana',
  'jira',
  'confluence',
  'logitech',
  'apify',
  'medium',
  'musicbrainz',
  'wikidata',
  'openai',
  'dotnet',
  'microsoft',
];

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');
const CDN_BASE = 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons';

async function downloadIcon(iconName: string): Promise<boolean> {
  try {
    const url = `${CDN_BASE}/${iconName}.svg`;
    console.log(`Downloading ${iconName}...`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`  ❌ Failed to download ${iconName}: ${response.status} ${response.statusText}`);
      return false;
    }
    
    const svgContent = await response.text();
    const filePath = path.join(LOGOS_DIR, `${iconName}.svg`);
    
    fs.writeFileSync(filePath, svgContent, 'utf-8');
    console.log(`  ✅ Downloaded ${iconName}.svg`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error downloading ${iconName}:`, error);
    return false;
  }
}

async function main() {
  // Create logos directory if it doesn't exist
  if (!fs.existsSync(LOGOS_DIR)) {
    fs.mkdirSync(LOGOS_DIR, { recursive: true });
    console.log(`Created directory: ${LOGOS_DIR}`);
  }
  
  console.log(`\n📥 Downloading ${REQUIRED_ICONS.length} logos...\n`);
  
  const results = await Promise.all(
    REQUIRED_ICONS.map(icon => downloadIcon(icon))
  );
  
  const successCount = results.filter(r => r).length;
  const failCount = results.filter(r => !r).length;
  
  console.log(`\n✅ Successfully downloaded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`\n📁 Logos saved to: ${LOGOS_DIR}\n`);
}

main().catch(console.error);

