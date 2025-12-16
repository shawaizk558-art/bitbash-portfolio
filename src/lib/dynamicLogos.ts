import type { Project } from '@/data/projects';
import { Zap, Database, ShoppingCart, Building2, Code, Globe, Briefcase, TrendingUp, Bot, Cog, Settings, Workflow, Webhook, FileSearch, Network, Download, FileCode } from 'lucide-react';

/**
 * Logo mapping configuration for Simple Icons
 * Maps keywords to Simple Icons identifier and brand color
 * Priority: More specific matches should come first
 * fallback: 'lucide' means use Lucide icon if Simple Icon fails
 */
const LOGO_KEYWORDS: Record<string, { icon: string; color: string; fallback?: 'lucide' }> = {
  // Social Media Platforms (Priority order matters - more specific first)
  'sales-navigator': { icon: 'linkedin', color: '0A66C2' },
  linkedin: { icon: 'linkedin', color: '0A66C2' },
  'linkedin-scraper': { icon: 'linkedin', color: '0A66C2' },
  'linkedin-data': { icon: 'linkedin', color: '0A66C2' },
  'linkedin-automation': { icon: 'linkedin', color: '0A66C2' },
  twitter: { icon: 'twitter', color: '1DA1F2' },
  x: { icon: 'x', color: '000000' },
  tweet: { icon: 'twitter', color: '1DA1F2' },
  'tweet-logger': { icon: 'twitter', color: '1DA1F2' },
  'twitter-api': { icon: 'twitter', color: '1DA1F2' },
  facebook: { icon: 'facebook', color: '1877F2' },
  fb: { icon: 'facebook', color: '1877F2' },
  instagram: { icon: 'instagram', color: 'E4405F' },
  insta: { icon: 'instagram', color: 'E4405F' },
  tiktok: { icon: 'tiktok', color: '000000' },
  youtube: { icon: 'youtube', color: 'FF0000' },
  reddit: { icon: 'reddit', color: 'FF4500' },
  pinterest: { icon: 'pinterest', color: 'BD081C' },
  snapchat: { icon: 'snapchat', color: 'FFFC00' },
  
  // E-commerce & Marketplaces
  shopify: { icon: 'shopify', color: '96BF48' },
  'e-commerce': { icon: 'shopify', color: '96BF48' },
  ecommerce: { icon: 'shopify', color: '96BF48' },
  amazon: { icon: 'amazon', color: 'FF9900' },
  'amazon-flex': { icon: 'amazon', color: 'FF9900' },
  'amazon-sp-api': { icon: 'amazon', color: 'FF9900' },
  ebay: { icon: 'ebay', color: 'E53238' },
  etsy: { icon: 'etsy', color: 'F16521' },
  aliexpress: { icon: 'aliexpress', color: 'FF4747' },
  daraz: { icon: 'daraz', color: 'E50000', fallback: 'lucide' },
  'daraz-scraper': { icon: 'daraz', color: 'E50000', fallback: 'lucide' },
  
  // Business & Professional Platforms
  crunchbase: { icon: 'crunchbase', color: '0288D1' },
  glassdoor: { icon: 'glassdoor', color: '0CAA41' },
  indeed: { icon: 'indeed', color: '2164F3' },
  monster: { icon: 'monster', color: '6B4698' },
  apollo: { icon: 'apollo', color: '3B82F6' },
  'apollo.io': { icon: 'apollo', color: '3B82F6' },
  'apollographql': { icon: 'apollo', color: '3B82F6' },
  pipedrive: { icon: 'pipedrive', color: '1A9BFC' },
  intercom: { icon: 'intercom', color: '1F8DED' },
  zapier: { icon: 'zapier', color: 'FF4A00' },
  trustpilot: { icon: 'trustpilot', color: '00B67A' },
  kickstarter: { icon: 'kickstarter', color: '05CE78' },
  
  // Google Services
  'google maps': { icon: 'googlemaps', color: '4285F4' },
  googlemaps: { icon: 'googlemaps', color: '4285F4' },
  'google-places': { icon: 'googlemaps', color: '4285F4' },
  maps: { icon: 'googlemaps', color: '4285F4' },
  gmail: { icon: 'gmail', color: 'EA4335' },
  google: { icon: 'google', color: '4285F4' },
  'google-sheets': { icon: 'googlesheets', color: '34A853' },
  'google-drive': { icon: 'googledrive', color: '4285F4' },
  
  // Travel & Hospitality
  airbnb: { icon: 'airbnb', color: 'FF5A5F' },
  booking: { icon: 'booking', color: '003580' },
  'booking.com': { icon: 'booking', color: '003580' },
  'bookingdotcom': { icon: 'booking', color: '003580' },
  tripadvisor: { icon: 'tripadvisor', color: '00AF87' },
  expedia: { icon: 'expedia', color: 'FFB700' },
  vrbo: { icon: 'vrbo', color: '00A699', fallback: 'lucide' },
  'furnished-finder': { icon: 'furnishedfinder', color: '0066CC', fallback: 'lucide' },
  
  // Real Estate
  zillow: { icon: 'zillow', color: '006AFF' },
  trulia: { icon: 'trulia', color: '53B50A' },
  realtor: { icon: 'realtor', color: '00B395' },
  
  // Classifieds & Listings
  craigslist: { icon: 'craigslist', color: '6F2DA8', fallback: 'lucide' },
  yelp: { icon: 'yelp', color: 'FF1A1A' },
  subito: { icon: 'subito', color: '0066CC', fallback: 'lucide' },
  'subito.it': { icon: 'subito', color: '0066CC', fallback: 'lucide' },
  
  // Development & Code Platforms
  github: { icon: 'github', color: '181717' },
  gitlab: { icon: 'gitlab', color: 'FC6D26' },
  bitbucket: { icon: 'bitbucket', color: '0052CC' },
  stackoverflow: { icon: 'stackoverflow', color: 'F58025' },
  
  // Communication & Collaboration
  discord: { icon: 'discord', color: '5865F2' },
  telegram: { icon: 'telegram', color: '26A5E4' },
  whatsapp: { icon: 'whatsapp', color: '25D366' },
  slack: { icon: 'slack', color: '4A154B' },
  teams: { icon: 'microsoftteams', color: '6264A7' },
  zoom: { icon: 'zoom', color: '2D8CFF' },
  
  // Media & Entertainment
  spotify: { icon: 'spotify', color: '1DB954' },
  netflix: { icon: 'netflix', color: 'E50914' },
  twitch: { icon: 'twitch', color: '9146FF' },
  
  // Financial & Trading
  metatrader5: { icon: 'metatrader5', color: '006699', fallback: 'lucide' },
  metatrader: { icon: 'metatrader5', color: '006699', fallback: 'lucide' },
  mql5: { icon: 'metatrader5', color: '006699', fallback: 'lucide' },
  tradingview: { icon: 'tradingview', color: '2962FF' },
  forex: { icon: 'forex', color: '006699', fallback: 'lucide' },
  binance: { icon: 'binance', color: 'F0B90B' },
  coinbase: { icon: 'coinbase', color: '0052FF' },
  polymarket: { icon: 'polymarket', color: '000000', fallback: 'lucide' },
  '23andme': { icon: '23andme', color: '00A859', fallback: 'lucide' },
  databento: { icon: 'databento', color: '000000', fallback: 'lucide' },
  kalshi: { icon: 'kalshi', color: '000000', fallback: 'lucide' },
  
  // Other Platforms
  notion: { icon: 'notion', color: '000000' },
  trello: { icon: 'trello', color: '0052CC' },
  asana: { icon: 'asana', color: 'F06A6A' },
  jira: { icon: 'jira', color: '0052CC' },
  confluence: { icon: 'confluence', color: '172B4D' },
  whop: { icon: 'whop', color: '000000', fallback: 'lucide' },
  yealink: { icon: 'yealink', color: '0066CC', fallback: 'lucide' },
  logitech: { icon: 'logitech', color: '00B8D4' },
  voeazul: { icon: 'voeazul', color: '0066CC', fallback: 'lucide' },
  gulfood: { icon: 'gulfood', color: 'FF6B00', fallback: 'lucide' },
  scrapfly: { icon: 'scrapfly', color: '0066CC', fallback: 'lucide' },
  apify: { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify.io': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify-platform': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify-actor': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify-store': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify-sdk': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  'apify-scraper': { icon: 'apify', color: 'FF6B00', fallback: 'lucide' },
  
  // Additional platforms from data
  medium: { icon: 'medium', color: '000000' }, // Medium uses black as brand color
  trademe: { icon: 'trademe', color: 'FF6600', fallback: 'lucide' },
  
  // Design & Creative Platforms
  canva: { icon: 'canva', color: '00C4CC' },
  'canva-templates': { icon: 'canva', color: '00C4CC' },
  'canva-templates-scraper': { icon: 'canva', color: '00C4CC' },
  
  // Media & Entertainment Platforms
  itunes: { icon: 'itunes', color: 'FB5BC5' },
  playstation: { icon: 'playstation', color: '003087' },
  meta: { icon: 'meta', color: '0081FB' },
  vimeo: { icon: 'vimeo', color: '1AB7EA' },
  fandom: { icon: 'fandom', color: 'FA005A' },
  
  // Food Delivery & Services
  deliveroo: { icon: 'deliveroo', color: '00CCBC' },
  'deliveroo-scraper': { icon: 'deliveroo', color: '00CCBC' },
  doordash: { icon: 'doordash', color: 'FF3008' },
  'door-dash': { icon: 'doordash', color: 'FF3008' },
  
  // Development & Technology
  python: { icon: 'python', color: '3776AB' },
  'python.org': { icon: 'python', color: '3776AB' },
  ubuntu: { icon: 'ubuntu', color: 'E95420' },
  
  // Freelance & Marketplace
  fiverr: { icon: 'fiverr', color: '1DBF73' },
  'fiverr-data': { icon: 'fiverr', color: '1DBF73' },
  'fiverr-profile': { icon: 'fiverr', color: '1DBF73' },
  upwork: { icon: 'upwork', color: '6FDA44' },
  
  // E-commerce
  flipkart: { icon: 'flipkart', color: '2874F0' },
  redbubble: { icon: 'redbubble', color: 'E41321' },
  
  // Blockchain & Crypto
  ethereum: { icon: 'ethereum', color: '627EEA' },
  'ethereum-wallet': { icon: 'ethereum', color: '627EEA' },
  
  // Video & Communication
  loom: { icon: 'loom', color: '625DF5' },
  'loom-comments': { icon: 'loom', color: '625DF5' },
  'loom-video': { icon: 'loom', color: '625DF5' },
  musicbrainz: { icon: 'musicbrainz', color: 'BA478F' },
  wikidata: { icon: 'wikidata', color: '006699' },
  openai: { icon: 'openai', color: '412991' },
  gemini: { icon: 'google', color: '4285F4' },
  'true-profit': { icon: 'trueprofit', color: '0066CC', fallback: 'lucide' },
  
  // Newly downloaded logos
  douban: { icon: 'douban', color: '007722' },
  g2: { icon: 'g2', color: 'FF492C' },
  'g2-com': { icon: 'g2', color: 'FF492C' },
  'g2-reviews': { icon: 'g2', color: 'FF492C' },
  'g2-reviews-scraper': { icon: 'g2', color: 'FF492C' },
  zendesk: { icon: 'zendesk', color: '03363D' },
  'zendesk-ai': { icon: 'zendesk', color: '03363D' },
  airtable: { icon: 'airtable', color: '18BFFF' },
  myob: { icon: 'myob', color: '0070CD' },
  allegro: { icon: 'allegro', color: 'FF6600' },
  'allegro-reviews': { icon: 'allegro', color: 'FF6600' },
  googleads: { icon: 'googleads', color: '4285F4' },
  'google-ads': { icon: 'googleads', color: '4285F4' },
  
  // Map compound topics to base brands
  opentable: { icon: 'opentable', color: 'D80027' },
  'opentable-review': { icon: 'opentable', color: 'D80027' },
  'opentable-review-scraper': { icon: 'opentable', color: 'D80027' },
  'amazon-reviews': { icon: 'amazon', color: 'FF9900' },
  'amazon-reviews-scraper': { icon: 'amazon', color: 'FF9900' },
  'amazon-aws': { icon: 'amazon', color: 'FF9900' },
  'amazonaws': { icon: 'amazon', color: 'FF9900' },
  aws: { icon: 'amazon', color: 'FF9900' },
  'alibaba-product': { icon: 'alibaba', color: 'FF6A00', fallback: 'lucide' },
  'alibaba-price': { icon: 'alibaba', color: 'FF6A00', fallback: 'lucide' },
  'alibaba-supplier': { icon: 'alibaba', color: 'FF6A00', fallback: 'lucide' },
  'mondaycom': { icon: 'monday', color: 'FF0080', fallback: 'lucide' },
  'monday-com': { icon: 'monday', color: 'FF0080', fallback: 'lucide' },
  monday: { icon: 'monday', color: 'FF0080', fallback: 'lucide' },
  'pancakeswap-token': { icon: 'pancakeswap', color: '1FC7D4', fallback: 'lucide' },
  pancakeswap: { icon: 'pancakeswap', color: '1FC7D4', fallback: 'lucide' },
  'stepstone-cv': { icon: 'stepstone', color: '00AEEF', fallback: 'lucide' },
  stepstone: { icon: 'stepstone', color: '00AEEF', fallback: 'lucide' },
  'vfs-appointment': { icon: 'vfs', color: '0066CC', fallback: 'lucide' },
  vfs: { icon: 'vfs', color: '0066CC', fallback: 'lucide' },
  'alchemer-survey': { icon: 'alchemer', color: '00AEEF', fallback: 'lucide' },
  alchemer: { icon: 'alchemer', color: '00AEEF', fallback: 'lucide' },
  'youtube-data': { icon: 'youtube', color: 'FF0000' },
  'youtube-data-mining': { icon: 'youtube', color: 'FF0000' },
  
  // Microsoft Technologies
  'asp.net': { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  aspnet: { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  dotnet: { icon: 'dotnet', color: '512BD4' },
  'asp': { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  microsoft: { icon: 'microsoft', color: '0078D4' },
  bing: { icon: 'bing', color: '008373' },
  
  // Additional brands found in analysis
  imdb: { icon: 'imdb', color: 'F5C518' },
  shazam: { icon: 'shazam', color: '1476FF' },
  soundcloud: { icon: 'soundcloud', color: 'FF3300' },
  pubmed: { icon: 'pubmed', color: '326599' },
  ikea: { icon: 'ikea', color: '0058A3' },
  patreon: { icon: 'patreon', color: 'FF424D' },
  lemon8: { icon: 'lemon8', color: '000000' },
  espn: { icon: 'espn', color: '000000' },
  substack: { icon: 'substack', color: 'FF6719' },
  target: { icon: 'target', color: 'CC0000' },
  skool: { icon: 'skool', color: '000000' },
  gumroad: { icon: 'gumroad', color: '36A9AE' },
  tasty: { icon: 'tasty', color: 'EE3322' },
  idealista: { icon: 'idealista', color: '0E8C3F' },
  
  // Additional missing brands reported by user
  godaddy: { icon: 'godaddy', color: '1BDBDB' },
  'go-daddy': { icon: 'godaddy', color: '1BDBDB' },
  'go daddy': { icon: 'godaddy', color: '1BDBDB' },
  dailymotion: { icon: 'dailymotion', color: '0066DC' },
  'daily-motion': { icon: 'dailymotion', color: '0066DC' },
  'daily motion': { icon: 'dailymotion', color: '0066DC' },
  vk: { icon: 'vk', color: '0077FF' },
  vkontakte: { icon: 'vk', color: '0077FF' },
  linktree: { icon: 'linktree', color: '43E55E' },
  'link-tree': { icon: 'linktree', color: '43E55E' },
  'link tree': { icon: 'linktree', color: '43E55E' },
  mastercard: { icon: 'mastercard', color: 'EB001B' },
  'master-card': { icon: 'mastercard', color: 'EB001B' },
  'master card': { icon: 'mastercard', color: 'EB001B' },
  react: { icon: 'react', color: '61DAFB' },
  'uber-eats': { icon: 'ubereats', color: '06C167' },
  ubereats: { icon: 'ubereats', color: '06C167' },
  'uber eats': { icon: 'ubereats', color: '06C167' },
  discogs: { icon: 'discogs', color: '000000' },
  xbox: { icon: 'xbox', color: '107C10' },
  tumblr: { icon: 'tumblr', color: '36465D' },
};

/**
 * Category-based icon mapping
 */
const CATEGORY_ICONS: Record<string, { component: any; color: string }> = {
  automation: { component: Zap, color: 'purple' },
  scraping: { component: Database, color: 'purple' },
};

/**
 * Fallback automation icons (3-5 icons for randomization)
 */
const AUTOMATION_FALLBACK_ICONS = [
  { component: Zap, color: '#9333ea', name: 'Zap' }, // Purple
  { component: Bot, color: '#3b82f6', name: 'Bot' }, // Blue
  { component: Cog, color: '#10b981', name: 'Cog' }, // Green
  { component: Settings, color: '#f59e0b', name: 'Settings' }, // Orange
  { component: Workflow, color: '#ec4899', name: 'Workflow' }, // Pink
];

/**
 * Fallback scraping icons (3-5 icons for randomization)
 */
const SCRAPING_FALLBACK_ICONS = [
  { component: Database, color: '#6366f1', name: 'Database' }, // Indigo
  { component: FileSearch, color: '#14b8a6', name: 'FileSearch' }, // Teal
  { component: Network, color: '#06b6d4', name: 'Network' }, // Cyan
  { component: Download, color: '#8b5cf6', name: 'Download' }, // Violet
  { component: FileCode, color: '#f97316', name: 'FileCode' }, // Orange
];

/**
 * Fallback Lucide icons for platforms without Simple Icons
 * Colors are randomized for visual variety
 */
const FALLBACK_ICONS: Record<string, { component: any; color: string }> = {
  // Financial & Trading (Blue/Indigo tones)
  metatrader5: { component: TrendingUp, color: '#3b82f6' }, // Blue
  metatrader: { component: TrendingUp, color: '#6366f1' }, // Indigo
  mql5: { component: TrendingUp, color: '#3b82f6' }, // Blue
  forex: { component: TrendingUp, color: '#6366f1' }, // Indigo
  polymarket: { component: TrendingUp, color: '#3b82f6' }, // Blue
  kalshi: { component: TrendingUp, color: '#6366f1' }, // Indigo
  pancakeswap: { component: TrendingUp, color: '#3b82f6' }, // Blue
  
  // Business & Professional (Green/Teal tones)
  yealink: { component: Building2, color: '#10b981' }, // Green
  logitech: { component: Building2, color: '#14b8a6' }, // Teal
  gulfood: { component: Building2, color: '#10b981' }, // Green
  furnishedfinder: { component: Building2, color: '#14b8a6' }, // Teal
  vrbo: { component: Building2, color: '#10b981' }, // Green
  realtor: { component: Building2, color: '#14b8a6' }, // Teal
  clutch: { component: Building2, color: '#10b981' }, // Green
  
  // Travel & Location (Cyan/Blue tones)
  voeazul: { component: Globe, color: '#06b6d4' }, // Cyan
  bookingdotcom: { component: Globe, color: '#3b82f6' }, // Blue
  booking: { component: Globe, color: '#06b6d4' }, // Cyan
  vfs: { component: Globe, color: '#3b82f6' }, // Blue
  
  // E-commerce (Orange/Amber tones)
  whop: { component: ShoppingCart, color: '#f59e0b' }, // Amber
  craigslist: { component: ShoppingCart, color: '#f97316' }, // Orange
  subito: { component: ShoppingCart, color: '#f59e0b' }, // Amber
  opentable: { component: ShoppingCart, color: '#f97316' }, // Orange
  alibaba: { component: ShoppingCart, color: '#f59e0b' }, // Amber
  daraz: { component: ShoppingCart, color: '#f97316' }, // Orange
  
  // Data & Technology (Purple/Violet tones)
  scrapfly: { component: Database, color: '#9333ea' }, // Purple
  databento: { component: Database, color: '#8b5cf6' }, // Violet
  apify: { component: Database, color: '#9333ea' }, // Purple
  alchemer: { component: Database, color: '#8b5cf6' }, // Violet
  
  // Professional Services (Pink/Rose tones)
  'true-profit': { component: Briefcase, color: '#ec4899' }, // Pink
  pipedrive: { component: Briefcase, color: '#f43f5e' }, // Rose
  monday: { component: Briefcase, color: '#ec4899' }, // Pink
  mondaycom: { component: Briefcase, color: '#f43f5e' }, // Rose
  stepstone: { component: Briefcase, color: '#ec4899' }, // Pink
  adzuna: { component: Briefcase, color: '#f43f5e' }, // Rose
  
  // Development & Code (Indigo/Purple tones)
  'asp.net': { component: Code, color: '#6366f1' }, // Indigo
  aspnet: { component: Code, color: '#8b5cf6' }, // Violet
  asp: { component: Code, color: '#6366f1' }, // Indigo
  '23andme': { component: Code, color: '#8b5cf6' }, // Violet
  ancestry: { component: Code, color: '#6366f1' }, // Indigo
};

// List of locally available logos (from public/logos directory)
const LOCAL_LOGOS = new Set([
  'airbnb', 'airtable', 'aliexpress', 'allegro', 'amazon', 'apollo', 'apollographql', 'asana',
  'binance', 'bitbucket', 'booking', 'booking.com', 'coinbase', 'confluence', 'crunchbase',
  'discord', 'dotnet', 'douban', 'ebay', 'etsy', 'expedia', 'facebook', 'g2', 'github', 'gitlab',
  'glassdoor', 'gmail', 'google', 'googleads', 'googledrive', 'googlemaps', 'googlesheets',
  'indeed', 'instagram', 'intercom', 'jira', 'kickstarter', 'linkedin', 'logitech', 'medium',
  'microsoft', 'microsoftteams', 'monster', 'musicbrainz', 'myob', 'netflix', 'notion',
  'openai', 'pinterest', 'pipedrive', 'reddit', 'shopify', 'slack', 'snapchat', 'spotify',
  'stackoverflow', 'telegram', 'tiktok', 'tradingview', 'trello', 'tripadvisor', 'trulia',
  'trustpilot', 'twitch', 'twitter', 'whatsapp', 'wikidata', 'x', 'yelp', 'youtube', 'zapier',
  'zendesk', 'zillow', 'zoom',
]);

/**
 * Get logo URL with fallback strategy:
 * 1. Check local file first (if available)
 * 2. Use Iconify API with brand color (ALWAYS use color to avoid black logos)
 * 
 * IMPORTANT: Iconify API without color parameter uses fill="currentColor" which defaults to black.
 * We should always pass a color when available. For unmapped brands, we'll try to get color
 * from Simple Icons metadata, but that requires async calls. For now, we'll use the SVG endpoint
 * which may return black logos for unmapped brands.
 */
function getLogoUrl(iconName: string, color?: string): string {
  // ALWAYS use Iconify API with color when available to ensure logos show in brand colors
  // Local files are static SVGs without color, so we prioritize colored API versions
  
  // Step 1: If we have a color (including black for brands like Medium), use Iconify API with color
  if (color) {
    return `https://api.iconify.design/simple-icons:${iconName}.svg?color=%23${color}`;
  }
  
  // Step 2: Check if logo exists locally (fallback for logos without color mapping)
  if (LOCAL_LOGOS.has(iconName.toLowerCase())) {
    return `/logos/${iconName}.svg`;
  }
  
  // Step 3: For unmapped brands without color, use Iconify API
  // This will use the brand's default color from Simple Icons metadata if available
  return `https://api.iconify.design/simple-icons:${iconName}.svg`;
}

export interface LogoResult {
  type: 'simple-icon' | 'lucide-icon' | 'gradient';
  url?: string;
  component?: any;
  alt: string;
  color?: string;
  initials?: string;
  useFallback?: boolean;
  fallbackKey?: string;
}

/**
 * Extract initials from project name
 */
function getInitials(name: string): string {
  const words = name.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Professional color palette for logo randomization
 * Curated selection of modern, professional colors
 */
const PROFESSIONAL_COLORS = [
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#9333ea', // Purple
  '#a855f7', // Purple (lighter)
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#ef4444', // Red
  '#f97316', // Orange
  '#f59e0b', // Amber
  '#eab308', // Yellow
  '#84cc16', // Lime
  '#10b981', // Green
  '#14b8a6', // Teal
  '#06b6d4', // Cyan
  '#0ea5e9', // Sky
  '#0284c7', // Blue (darker)
];

/**
 * Generate a deterministic random number between 0 and max based on a seed string
 * This ensures the same project always gets the same icon
 */
function seededRandom(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Normalize to 0-1 range
  const normalized = Math.abs(hash) / 2147483647;
  return Math.floor(normalized * max);
}

/**
 * Get a deterministic professional color for a project based on its slug/name
 * This ensures the same project always gets the same color, but different projects get different colors
 */
export function getProjectColor(seed: string): string {
  const index = seededRandom(seed, PROFESSIONAL_COLORS.length);
  return PROFESSIONAL_COLORS[index];
}

// Logo detection cache - keyed by project slug for fast lookups
const logoCache = new Map<string, LogoResult>();

// Pre-built lookup Maps for O(1) access instead of O(n) iteration
const LOGO_KEYWORDS_MAP = new Map<string, { icon: string; color: string; fallback?: 'lucide' }>();
for (const [key, value] of Object.entries(LOGO_KEYWORDS)) {
  LOGO_KEYWORDS_MAP.set(key.toLowerCase(), value);
}

// Pre-built Set for excluded words for O(1) lookup
const EXCLUDED_GENERIC_WORDS = new Set([
  'scraper', 'scraping', 'automation', 'data', 'api', 'bot', 'tool', 'script', 'python', 'javascript', 'node', 'js', 'web',
  'json', 'html', 'http', 'https', 'url', 'email', 'product', 'price', 'review', 'blog', 'news', 'job', 'listing',
  'property', 'real', 'estate', 'market', 'analysis', 'research', 'extraction', 'monitoring', 'tracking', 'generator',
  'checker', 'downloader', 'converter', 'parser', 'crawler', 'crawling', 'mining', 'processing', 'analytics', 'insights',
  'intelligence', 'lead', 'leads', 'company', 'business', 'social', 'media', 'content', 'article', 'post', 'profile',
  'page', 'store', 'shop', 'retail', 'ecommerce', 'e-commerce', 'marketplace', 'rental', 'hotel', 'travel', 'seo',
  'the', 'and', 'for', 'with', 'from', 'to', 'of', 'a', 'an', 'by', 'per', 'get', 'result', 'example', 'public',
  'people', 'details', 'location', 'quotes', 'bulk', 'stock', 'crypto', 'trending', 'text', 'image', 'video', 'game',
  'daily', 'stats', 'pro', 'com', 'de', 'us', 'jp', 'kr', 'ip', 'pay', 'castnet', 'coronavirus', 'nlp', 'ai', 'actor',
  'agent', 'creator', 'extractor', 'scrapper', 'httpx', 'axios', 'requests', 'beautifulsoup', 'scrapy', 'playwright',
  'puppeteer', 'selenium', 'cheerio', 'crawlee', 'typescript', 'markdown', 'pdf', 'csv', 'rest', 'proxy', 'proxies',
  'hash', 'tag', 'browserautomation', 'nodejs', 'node-js', 'website', 'sentiment'
]);

// E-commerce keywords Set for fast lookup
const ECOMMERCE_KEYWORDS = new Set(['shop', 'store', 'e-commerce', 'ecommerce', 'retail', 'product', 'cart', 'invoice']);

/**
 * Check if a string contains any of the keywords (case-insensitive) - optimized with Set
 */
function containsKeyword(text: string, keywords: Set<string>): boolean {
  const lowerText = text.toLowerCase();
  for (const keyword of keywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}

/**
 * Detect project logo based on name, topics, and category
 * Priority: Topics array (exact matches) > Project name > Category
 * 
 * Logo URL Strategy:
 * 1. Local file (if available) - fastest, no network
 * 2. Iconify API with brand color - colored logos
 * 3. Iconify API without color - fallback
 * 
 * PERFORMANCE: Results are memoized by project slug for instant subsequent lookups
 */
export function detectProjectLogo(project: Project): LogoResult {
  // Check cache first - instant return for cached results
  const cacheKey = (project as any).slug || project.name || '';
  if (cacheKey && logoCache.has(cacheKey)) {
    return logoCache.get(cacheKey)!;
  }
  const projectName = (project as any).title || project.name || '';
  // Check both technologies and topics arrays (MongoDB projects use topics)
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const topics = Array.isArray((project as any).topics) ? (project as any).topics : [];
  const allTopics = [...technologies, ...topics];
  const category = ((project as any).category || project.role || '').toLowerCase();
  
  // Normalize all text for searching
  const normalizedName = projectName.toLowerCase();
  const normalizedTopics = allTopics.map(t => String(t).toLowerCase().trim());
  const normalizedCategory = category.toLowerCase();
  
  // Step 1: Check topics array FIRST (highest priority - exact matches)
  // Topics are most reliable as they're explicitly set
  for (const topic of normalizedTopics) {
    if (!topic) continue;
    
    // Check exact match first (highest priority)
    // OPTIMIZED: Use Map lookup instead of object property access
    const config = LOGO_KEYWORDS_MAP.get(topic);
    if (config) {
      // If fallback is specified, use Lucide icon directly
      if (config.fallback === 'lucide') {
        const fallbackIcon = FALLBACK_ICONS[topic];
        if (fallbackIcon) {
          const result: LogoResult = {
            type: 'lucide-icon',
            component: fallbackIcon.component,
            alt: `${topic} icon`,
            color: fallbackIcon.color,
          };
          // Cache result before returning
          if (cacheKey) logoCache.set(cacheKey, result);
          return result;
        }
      }
      // Use smart URL strategy: local first, then Iconify with color
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(config.icon, config.color),
        alt: `${config.icon} logo`,
        color: config.color,
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
    
    // Check if topic contains any keyword (for compound topics like "linkedin-scraper", "sales-navigator")
    // Split topic by common separators and check each part
    // OPTIMIZED: Use Map lookup instead of object property access
    const topicParts = topic.split(/[\s\-_]+/);
    for (const part of topicParts) {
      if (part) {
        const config = LOGO_KEYWORDS_MAP.get(part);
        if (config) {
          if (config.fallback === 'lucide') {
            const fallbackIcon = FALLBACK_ICONS[part];
            if (fallbackIcon) {
              const result: LogoResult = {
                type: 'lucide-icon',
                component: fallbackIcon.component,
                alt: `${part} icon`,
                color: fallbackIcon.color,
              };
              // Cache result before returning
              if (cacheKey) logoCache.set(cacheKey, result);
              return result;
            }
          }
          const result: LogoResult = {
            type: 'simple-icon',
            url: getLogoUrl(config.icon, config.color),
            alt: `${config.icon} logo`,
            color: config.color,
          };
          // Cache result before returning
          if (cacheKey) logoCache.set(cacheKey, result);
          return result;
        }
      }
    }
    
    // Also check if any keyword is contained in the topic (for cases like "linkedin-automation", "pipedrive-crm-lead-scraper")
    // This handles cases where the keyword is part of a compound word
    // OPTIMIZED: Use Map iteration instead of Object.entries for better performance
    for (const [keyword, config] of LOGO_KEYWORDS_MAP) {
      // Check if topic contains the keyword (case-insensitive, minimum 3 chars to avoid false positives)
      // topic is already normalized to lowercase, and keyword is already lowercase in LOGO_KEYWORDS_MAP
      if (keyword.length >= 3 && topic.includes(keyword)) {
        if (config.fallback === 'lucide') {
          const fallbackIcon = FALLBACK_ICONS[keyword];
          if (fallbackIcon) {
            const result: LogoResult = {
              type: 'lucide-icon',
              component: fallbackIcon.component,
              alt: `${keyword} icon`,
              color: fallbackIcon.color,
            };
            // Cache result before returning
            if (cacheKey) logoCache.set(cacheKey, result);
            return result;
          }
        }
        const result: LogoResult = {
          type: 'simple-icon',
          url: getLogoUrl(config.icon, config.color),
          alt: `${config.icon} logo`,
          color: config.color,
        };
        // Cache result before returning
        if (cacheKey) logoCache.set(cacheKey, result);
        return result;
      }
    }
    
    // NEW: Try using the topic directly as a Simple Icons icon name (for unmapped brands)
    // This is KEY to catching all brands - try ANY topic that looks like a brand name
    // OPTIMIZED: Use Set lookup instead of regex for O(1) performance
    // Try topic as-is if it looks like a brand (not excluded, reasonable length)
    if (topic.length >= 2 && topic.length <= 30 && /^[a-z0-9\-]+$/.test(topic) && !EXCLUDED_GENERIC_WORDS.has(topic)) {
      // Try the topic directly as a Simple Icons name - this catches ALL brands in Simple Icons!
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(topic), // Will check local first, then Iconify
        alt: `${topic} logo`,
        color: '000000', // Default color, Iconify will use brand color
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
  }
  
  // Step 2: Check project name (second priority)
  // Split name into words and check each word
  // OPTIMIZED: Use Map lookup instead of object property access
  const nameWords = normalizedName.split(/[\s\-_]+/);
  for (const word of nameWords) {
    if (word) {
      const config = LOGO_KEYWORDS_MAP.get(word);
      if (config) {
        if (config.fallback === 'lucide') {
          const fallbackIcon = FALLBACK_ICONS[word];
          if (fallbackIcon) {
            const result: LogoResult = {
              type: 'lucide-icon',
              component: fallbackIcon.component,
              alt: `${word} icon`,
              color: fallbackIcon.color,
            };
            // Cache result before returning
            if (cacheKey) logoCache.set(cacheKey, result);
            return result;
          }
        }
        const result: LogoResult = {
          type: 'simple-icon',
          url: getLogoUrl(config.icon, config.color),
          alt: `${config.icon} logo`,
          color: config.color,
        };
        // Cache result before returning
        if (cacheKey) logoCache.set(cacheKey, result);
        return result;
      }
    }
  }
  
  // Also check if name contains any keyword
  // OPTIMIZED: Use Map iteration instead of Object.entries
  for (const [keyword, config] of LOGO_KEYWORDS_MAP) {
    if (normalizedName.includes(keyword) && keyword.length >= 3) {
      if (config.fallback === 'lucide') {
        const fallbackIcon = FALLBACK_ICONS[keyword];
        if (fallbackIcon) {
          const result: LogoResult = {
            type: 'lucide-icon',
            component: fallbackIcon.component,
            alt: `${keyword} icon`,
            color: fallbackIcon.color,
          };
          // Cache result before returning
          if (cacheKey) logoCache.set(cacheKey, result);
          return result;
        }
      }
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(config.icon, config.color),
        alt: `${config.icon} logo`,
        color: config.color,
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
  }
  
  // NEW: Try using project name words directly as Simple Icons (for unmapped brands)
  // Extract potential brand names from project name
  // OPTIMIZED: Use Set lookup instead of regex
  const potentialBrandWords = normalizedName.split(/[\s\-_]+/).filter(w => 
    w.length >= 2 && 
    w.length <= 20 && 
    /^[a-z0-9\-]+$/.test(w) && 
    !EXCLUDED_GENERIC_WORDS.has(w)
  );
  
  // Try each word as a potential brand name (try longest first)
  const sortedWords = potentialBrandWords.sort((a, b) => b.length - a.length);
  for (const word of sortedWords) {
    if (word.length >= 2) {
      // Iconify API will automatically use the brand's default color from Simple Icons metadata
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(word), // Will check local first, then Iconify (Iconify uses brand color automatically)
        alt: `${word} logo`,
        color: undefined, // Let Iconify use brand's default color
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
  }
  
  // Step 3: Check for e-commerce keywords (use ShoppingCart icon)
  // OPTIMIZED: Use Set for fast lookup
  const allText = [normalizedName, ...normalizedTopics, normalizedCategory].join(' ');
  if (containsKeyword(allText, ECOMMERCE_KEYWORDS)) {
    const result: LogoResult = {
      type: 'lucide-icon',
      component: ShoppingCart,
      alt: 'Shopping cart icon',
      color: 'purple',
    };
    // Cache result before returning
    if (cacheKey) logoCache.set(cacheKey, result);
    return result;
  }

  // Step 4: Try ANY topic as a Simple Icons name (only for unmapped brands, not generic words)
  // Exclude generic/scraping/automation words to avoid 404s
  // OPTIMIZED: Use Set lookup instead of regex
  for (const topic of normalizedTopics) {
    if (!topic || topic.length < 2 || topic.length > 30) continue;
    // Only try topics that look like brand names (exclude generic words)
    if (/^[a-z0-9\-]+$/.test(topic) && !EXCLUDED_GENERIC_WORDS.has(topic)) {
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(topic), // Will try Iconify API
        alt: `${topic} logo`,
        color: undefined,
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
  }
  
  // Step 5: Try ANY word from project name as Simple Icons name (exclude generic words)
  // OPTIMIZED: Use Set lookup instead of regex
  const fallbackNameWords = normalizedName.split(/[\s\-_]+/).filter(w => 
    w.length >= 2 && 
    w.length <= 20 && 
    /^[a-z0-9\-]+$/.test(w) &&
    !EXCLUDED_GENERIC_WORDS.has(w)
  );
  
  if (fallbackNameWords.length > 0) {
    // Try longest word first (most likely to be a brand name)
    const sortedFallbackWords = fallbackNameWords.sort((a, b) => b.length - a.length);
    for (const word of sortedFallbackWords) {
      const result: LogoResult = {
        type: 'simple-icon',
        url: getLogoUrl(word), // Will try Iconify API
        alt: `${word} logo`,
        color: undefined,
      };
      // Cache result before returning
      if (cacheKey) logoCache.set(cacheKey, result);
      return result;
    }
  }

  // Step 6: Category-based fallback icons (ONLY after trying to find actual brand logos)
  // This ensures scraping/automation projects get category icons only when no brand logo is found
  // Check if project is automation or scraping category
  const isAutomation = normalizedCategory.includes('automation') || 
                       normalizedTopics.some(t => t.includes('automation')) ||
                       normalizedName.includes('automation');
  
  const isScraping = normalizedCategory.includes('scraping') || 
                     normalizedCategory.includes('scraper') ||
                     normalizedTopics.some(t => t.includes('scraping') || t.includes('scraper')) ||
                     normalizedName.includes('scraping') || normalizedName.includes('scraper');
  
  // Use deterministic randomization based on project slug/name
  const seed = (project as any).slug || projectName || 'default';
  
  if (isAutomation) {
    const iconIndex = seededRandom(seed, AUTOMATION_FALLBACK_ICONS.length);
    const selectedIcon = AUTOMATION_FALLBACK_ICONS[iconIndex];
    const result: LogoResult = {
      type: 'lucide-icon',
      component: selectedIcon.component,
      alt: `Automation icon (${selectedIcon.name})`,
      color: 'purple',
    };
    // Cache result before returning
    if (cacheKey) logoCache.set(cacheKey, result);
    return result;
  }
  
  if (isScraping) {
    const iconIndex = seededRandom(seed, SCRAPING_FALLBACK_ICONS.length);
    const selectedIcon = SCRAPING_FALLBACK_ICONS[iconIndex];
    const result: LogoResult = {
      type: 'lucide-icon',
      component: selectedIcon.component,
      alt: `Scraping icon (${selectedIcon.name})`,
      color: 'purple',
    };
    // Cache result before returning
    if (cacheKey) logoCache.set(cacheKey, result);
    return result;
  }

  // Step 7: Final fallback to gradient with initials (ONLY if nothing else worked)
  const initials = getInitials(projectName);
  const result: LogoResult = {
    type: 'gradient',
    alt: `${projectName} logo`,
    initials: initials || '?',
  };
  // Cache result before returning
  if (cacheKey) logoCache.set(cacheKey, result);
  return result;
}

/**
 * Get fallback Lucide icon for a platform
 */
export function getFallbackIcon(key: string): { component: any; color: string } | null {
  return FALLBACK_ICONS[key] || null;
}
