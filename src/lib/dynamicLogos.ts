import type { Project } from '@/data/projects';
import { Zap, Database, ShoppingCart, Building2, Code, Globe, Briefcase, TrendingUp } from 'lucide-react';

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
  
  // Business & Professional Platforms
  crunchbase: { icon: 'crunchbase', color: '0288D1' },
  glassdoor: { icon: 'glassdoor', color: '0CAA41' },
  indeed: { icon: 'indeed', color: '2164F3' },
  monster: { icon: 'monster', color: '6B4698' },
  apollo: { icon: 'apollo', color: '3B82F6', fallback: 'lucide' },
  'apollo.io': { icon: 'apollo', color: '3B82F6', fallback: 'lucide' },
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
  booking: { icon: 'bookingdotcom', color: '003580', fallback: 'lucide' },
  'booking.com': { icon: 'bookingdotcom', color: '003580', fallback: 'lucide' },
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
  
  // Additional platforms from data
  medium: { icon: 'medium', color: '000000' },
  trademe: { icon: 'trademe', color: 'FF6600', fallback: 'lucide' },
  musicbrainz: { icon: 'musicbrainz', color: 'BA478F' },
  wikidata: { icon: 'wikidata', color: '006699' },
  openai: { icon: 'openai', color: '412991' },
  gemini: { icon: 'google', color: '4285F4' },
  'true-profit': { icon: 'trueprofit', color: '0066CC', fallback: 'lucide' },
  
  // Microsoft Technologies
  'asp.net': { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  aspnet: { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  dotnet: { icon: 'dotnet', color: '512BD4' },
  'asp': { icon: 'dotnet', color: '512BD4', fallback: 'lucide' },
  microsoft: { icon: 'microsoft', color: '0078D4' },
};

/**
 * Category-based icon mapping
 */
const CATEGORY_ICONS: Record<string, { component: any; color: string }> = {
  automation: { component: Zap, color: 'purple' },
  scraping: { component: Database, color: 'purple' },
};

/**
 * Fallback Lucide icons for platforms without Simple Icons
 */
const FALLBACK_ICONS: Record<string, { component: any; color: string }> = {
  metatrader5: { component: TrendingUp, color: 'purple' },
  metatrader: { component: TrendingUp, color: 'purple' },
  mql5: { component: TrendingUp, color: 'purple' },
  forex: { component: TrendingUp, color: 'purple' },
  yealink: { component: Building2, color: 'purple' },
  logitech: { component: Building2, color: 'purple' },
  voeazul: { component: Globe, color: 'purple' },
  gulfood: { component: Building2, color: 'purple' },
  scrapfly: { component: Database, color: 'purple' },
  whop: { component: ShoppingCart, color: 'purple' },
  polymarket: { component: TrendingUp, color: 'purple' },
  kalshi: { component: TrendingUp, color: 'purple' },
  databento: { component: Database, color: 'purple' },
  trademe: { component: ShoppingCart, color: 'purple' },
  'true-profit': { component: Briefcase, color: 'purple' },
  'asp.net': { component: Code, color: 'purple' },
  aspnet: { component: Code, color: 'purple' },
  asp: { component: Code, color: 'purple' },
  // Missing Simple Icons - using fallbacks
  apollo: { component: Building2, color: 'purple' },
  pipedrive: { component: Briefcase, color: 'purple' },
  craigslist: { component: ShoppingCart, color: 'purple' },
  subito: { component: ShoppingCart, color: 'purple' },
  bookingdotcom: { component: Globe, color: 'purple' },
  booking: { component: Globe, color: 'purple' },
  furnishedfinder: { component: Building2, color: 'purple' },
  vrbo: { component: Building2, color: 'purple' },
  '23andme': { component: Code, color: 'purple' },
  apify: { component: Database, color: 'purple' },
};

export interface LogoResult {
  type: 'simple-icon' | 'lucide-icon' | 'gradient';
  url?: string;
  component?: any;
  alt: string;
  color?: string;
  initials?: string;
  useFallback?: boolean; // If Simple Icon should fallback to Lucide
  fallbackKey?: string; // Key for fallback icon lookup
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
 * Check if a string contains any of the keywords (case-insensitive)
 */
function containsKeyword(text: string, keywords: string[]): string | null {
  const lowerText = text.toLowerCase();
  for (const keyword of keywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return keyword;
    }
  }
  return null;
}

/**
 * Detect project logo based on name, topics, and category
 * Priority: Topics array (exact matches) > Project name > Category
 */
export function detectProjectLogo(project: Project): LogoResult {
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
    if (LOGO_KEYWORDS[topic]) {
      const config = LOGO_KEYWORDS[topic];
      // If fallback is specified, use Lucide icon directly
      if (config.fallback === 'lucide') {
        const fallbackIcon = FALLBACK_ICONS[topic];
        if (fallbackIcon) {
          return {
            type: 'lucide-icon',
            component: fallbackIcon.component,
            alt: `${topic} icon`,
            color: fallbackIcon.color,
          };
        }
      }
      return {
        type: 'simple-icon',
        url: `/logos/${config.icon}.svg`,
        alt: `${config.icon} logo`,
        color: config.color,
      };
    }
    
    // Check if topic contains any keyword (for compound topics like "linkedin-scraper", "sales-navigator")
    // Split topic by common separators and check each part
    const topicParts = topic.split(/[\s\-_]+/);
    for (const part of topicParts) {
      if (part && LOGO_KEYWORDS[part]) {
        const config = LOGO_KEYWORDS[part];
        if (config.fallback === 'lucide') {
          const fallbackIcon = FALLBACK_ICONS[part];
          if (fallbackIcon) {
            return {
              type: 'lucide-icon',
              component: fallbackIcon.component,
              alt: `${part} icon`,
              color: fallbackIcon.color,
            };
          }
        }
        return {
          type: 'simple-icon',
          url: `/logos/${config.icon}.svg`,
          alt: `${config.icon} logo`,
          color: config.color,
        };
      }
    }
    
    // Also check if any keyword is contained in the topic (for cases like "linkedin-automation", "pipedrive-crm-lead-scraper")
    // This handles cases where the keyword is part of a compound word
    for (const [keyword, config] of Object.entries(LOGO_KEYWORDS)) {
      // Check if topic contains the keyword (case-insensitive, minimum 3 chars to avoid false positives)
      // topic is already normalized to lowercase, and keyword is already lowercase in LOGO_KEYWORDS
      if (keyword.length >= 3 && topic.includes(keyword)) {
        if (config.fallback === 'lucide') {
          const fallbackIcon = FALLBACK_ICONS[keyword];
          if (fallbackIcon) {
            return {
              type: 'lucide-icon',
              component: fallbackIcon.component,
              alt: `${keyword} icon`,
              color: fallbackIcon.color,
            };
          }
        }
        return {
          type: 'simple-icon',
          url: `/logos/${config.icon}.svg`,
          alt: `${config.icon} logo`,
          color: config.color,
        };
      }
    }
  }
  
  // Step 2: Check project name (second priority)
  // Split name into words and check each word
  const nameWords = normalizedName.split(/[\s\-_]+/);
  for (const word of nameWords) {
    if (word && LOGO_KEYWORDS[word]) {
      const config = LOGO_KEYWORDS[word];
      if (config.fallback === 'lucide') {
        const fallbackIcon = FALLBACK_ICONS[word];
        if (fallbackIcon) {
          return {
            type: 'lucide-icon',
            component: fallbackIcon.component,
            alt: `${word} icon`,
            color: fallbackIcon.color,
          };
        }
      }
      return {
        type: 'simple-icon',
        url: `/logos/${config.icon}.svg`,
        alt: `${config.icon} logo`,
        color: config.color,
      };
    }
  }
  
  // Also check if name contains any keyword
  for (const [keyword, config] of Object.entries(LOGO_KEYWORDS)) {
    if (normalizedName.includes(keyword) && keyword.length >= 3) {
      if (config.fallback === 'lucide') {
        const fallbackIcon = FALLBACK_ICONS[keyword];
        if (fallbackIcon) {
          return {
            type: 'lucide-icon',
            component: fallbackIcon.component,
            alt: `${keyword} icon`,
            color: fallbackIcon.color,
          };
        }
      }
      return {
        type: 'simple-icon',
        url: `/logos/${config.icon}.svg`,
        alt: `${config.icon} logo`,
        color: config.color,
      };
    }
  }
  
  // Step 3: Check for e-commerce keywords (use ShoppingCart icon)
  const ecommerceKeywords = ['shop', 'store', 'e-commerce', 'ecommerce', 'retail', 'product', 'cart', 'invoice'];
  const allText = [normalizedName, ...normalizedTopics, normalizedCategory].join(' ');
  if (containsKeyword(allText, ecommerceKeywords)) {
    return {
      type: 'lucide-icon',
      component: ShoppingCart,
      alt: 'Shopping cart icon',
      color: 'purple',
    };
  }

  // Step 4: Use category-based icon (before gradient fallback)
  // Check normalized category and also check if category is mentioned in topics/name
  if (normalizedCategory) {
    // Direct category match
    if (CATEGORY_ICONS[normalizedCategory]) {
      const categoryConfig = CATEGORY_ICONS[normalizedCategory];
      return {
        type: 'lucide-icon',
        component: categoryConfig.component,
        alt: `${category} icon`,
        color: categoryConfig.color,
      };
    }
    
    // Also check if category keywords appear in topics or name
    if (normalizedCategory.includes('automation') || 
        normalizedTopics.some(t => t.includes('automation')) ||
        normalizedName.includes('automation')) {
      return {
        type: 'lucide-icon',
        component: CATEGORY_ICONS.automation.component,
        alt: 'automation icon',
        color: CATEGORY_ICONS.automation.color,
      };
    }
    
    if (normalizedCategory.includes('scraping') || 
        normalizedCategory.includes('scraper') ||
        normalizedTopics.some(t => t.includes('scraping') || t.includes('scraper')) ||
        normalizedName.includes('scraping') || normalizedName.includes('scraper')) {
      return {
        type: 'lucide-icon',
        component: CATEGORY_ICONS.scraping.component,
        alt: 'scraping icon',
        color: CATEGORY_ICONS.scraping.color,
      };
    }
  }

  // Step 5: Final fallback to gradient with initials (only if no category found)
  const initials = getInitials(projectName);
  return {
    type: 'gradient',
    alt: `${projectName} logo`,
    initials,
  };
}

/**
 * Get fallback Lucide icon for a platform
 */
export function getFallbackIcon(key: string): { component: any; color: string } | null {
  return FALLBACK_ICONS[key] || null;
}

