/**
 * Script to colorize Simple Icons SVGs with their brand colors
 * Run with: npx tsx scripts/colorize-logos.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const LOGOS_DIR = path.join(process.cwd(), 'public', 'logos');

// Brand colors for each icon (from LOGO_KEYWORDS)
const BRAND_COLORS: Record<string, string> = {
  linkedin: '0A66C2',
  twitter: '1DA1F2',
  x: '000000',
  facebook: '1877F2',
  instagram: 'E4405F',
  tiktok: '000000',
  youtube: 'FF0000',
  reddit: 'FF4500',
  pinterest: 'BD081C',
  snapchat: 'FFFC00',
  shopify: '96BF48',
  amazon: 'FF9900',
  ebay: 'E53238',
  etsy: 'F16521',
  aliexpress: 'FF4747',
  crunchbase: '0288D1',
  glassdoor: '0CAA41',
  indeed: '2164F3',
  monster: '6B4698',
  intercom: '1F8DED',
  zapier: 'FF4A00',
  trustpilot: '00B67A',
  kickstarter: '05CE78',
  googlemaps: '4285F4',
  gmail: 'EA4335',
  google: '4285F4',
  googlesheets: '34A853',
  googledrive: '4285F4',
  airbnb: 'FF5A5F',
  tripadvisor: '00AF87',
  expedia: 'FFB700',
  zillow: '006AFF',
  trulia: '53B50A',
  realtor: '00B395',
  yelp: 'FF1A1A',
  github: '181717',
  gitlab: 'FC6D26',
  bitbucket: '0052CC',
  stackoverflow: 'F58025',
  discord: '5865F2',
  telegram: '26A5E4',
  whatsapp: '25D366',
  slack: '4A154B',
  microsoftteams: '6264A7',
  zoom: '2D8CFF',
  spotify: '1DB954',
  netflix: 'E50914',
  twitch: '9146FF',
  tradingview: '2962FF',
  binance: 'F0B90B',
  coinbase: '0052FF',
  notion: '000000',
  trello: '0052CC',
  asana: 'F06A6A',
  jira: '0052CC',
  confluence: '172B4D',
  logitech: '00B8D4',
  medium: '000000',
  musicbrainz: 'BA478F',
  wikidata: '006699',
  openai: '412991',
  dotnet: '512BD4',
  microsoft: '0078D4',
};

function colorizeSVG(svgContent: string, color: string): string {
  // Add # to color if not present
  const hexColor = color.startsWith('#') ? color : `#${color}`;
  
  // Replace fill="currentColor" or fill="#000" or fill="black" with brand color
  let colored = svgContent
    .replace(/fill="currentColor"/gi, `fill="${hexColor}"`)
    .replace(/fill="#000000"/gi, `fill="${hexColor}"`)
    .replace(/fill="#000"/gi, `fill="${hexColor}"`)
    .replace(/fill="black"/gi, `fill="${hexColor}"`)
    .replace(/fill="none"/gi, `fill="${hexColor}"`);
  
  // If no fill attribute exists, add it to the path element
  if (!colored.includes('fill=')) {
    colored = colored.replace(/<path\s+/gi, `<path fill="${hexColor}" `);
  }
  
  // Also handle stroke if present
  colored = colored
    .replace(/stroke="currentColor"/gi, `stroke="${hexColor}"`)
    .replace(/stroke="#000000"/gi, `stroke="${hexColor}"`)
    .replace(/stroke="#000"/gi, `stroke="${hexColor}"`)
    .replace(/stroke="black"/gi, `stroke="${hexColor}"`);
  
  return colored;
}

async function colorizeLogo(iconName: string): Promise<boolean> {
  try {
    const filePath = path.join(LOGOS_DIR, `${iconName}.svg`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  File not found: ${iconName}.svg`);
      return false;
    }
    
    const color = BRAND_COLORS[iconName];
    if (!color) {
      console.log(`  ⚠️  No color defined for: ${iconName}`);
      return false;
    }
    
    const svgContent = fs.readFileSync(filePath, 'utf-8');
    const coloredSVG = colorizeSVG(svgContent, color);
    
    fs.writeFileSync(filePath, coloredSVG, 'utf-8');
    console.log(`  ✅ Colorized ${iconName}.svg with #${color}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error colorizing ${iconName}:`, error);
    return false;
  }
}

async function main() {
  console.log(`\n🎨 Colorizing logos with brand colors...\n`);
  
  const iconNames = Object.keys(BRAND_COLORS);
  const results = await Promise.all(
    iconNames.map(icon => colorizeLogo(icon))
  );
  
  const successCount = results.filter(r => r).length;
  const failCount = results.filter(r => !r).length;
  
  console.log(`\n✅ Successfully colorized: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`\n📁 Updated logos in: ${LOGOS_DIR}\n`);
}

main().catch(console.error);

