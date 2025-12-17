/**
 * SEO Utilities
 * 
 * Functions for cleaning, formatting, and optimizing tags for SEO purposes
 */

/**
 * Low-value tags that should be filtered out
 * These are too generic or common to be useful for SEO
 */
const LOW_VALUE_TAGS = new Set([
  'data',
  'api',
  'web',
  'app',
  'application',
  'system',
  'tool',
  'service',
  'platform',
  'software',
  'script',
  'bot',
  'automation',
  'scraper',
  'scraping',
  'extraction',
  'logger',
  'monitor',
  'tracker'
]);

/**
 * Clean and format tags for SEO use
 * - Removes duplicates (case-insensitive)
 * - Filters out low-value tags
 * - Removes single characters
 * - Capitalizes properly
 * 
 * @param tags - Array of tag strings
 * @returns Cleaned and formatted tags array
 */
export function cleanTagsForSEO(tags: string[]): string[] {
  if (!Array.isArray(tags) || tags.length === 0) {
    return [];
  }

  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const tag of tags) {
    if (!tag || typeof tag !== 'string') continue;

    // Normalize: trim, lowercase for comparison
    const normalized = tag.trim().toLowerCase();
    
    // Skip empty, single character, or already seen tags
    if (normalized.length <= 1 || seen.has(normalized)) continue;
    
    // Skip low-value generic tags
    if (LOW_VALUE_TAGS.has(normalized)) continue;
    
    // Format tag: replace hyphens/underscores with spaces, then title case
    const formatted = normalized
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => {
        if (!word) return word;
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ')
      .trim();
    
    if (formatted && formatted.length > 1) {
      seen.add(normalized);
      cleaned.push(formatted);
    }
  }

  return cleaned;
}

/**
 * Format tags array as comma-separated keywords string for meta tags
 * 
 * @param tags - Array of tag strings
 * @returns Comma-separated keywords string
 */
export function formatTagsAsKeywords(tags: string[]): string {
  const cleaned = cleanTagsForSEO(tags);
  return cleaned.join(', ');
}

/**
 * Get primary tags (most relevant) up to a limit
 * Useful for limiting the number of tags in meta keywords
 * 
 * @param tags - Array of tag strings
 * @param limit - Maximum number of tags to return (default: 15)
 * @returns Limited array of cleaned tags
 */
export function getPrimaryTags(tags: string[], limit: number = 15): string[] {
  const cleaned = cleanTagsForSEO(tags);
  
  // Prioritize tags: prefer longer, more specific tags
  // Sort by length (descending) to prioritize specific technologies
  const sorted = cleaned.sort((a, b) => {
    // Longer tags are generally more specific
    if (b.length !== a.length) {
      return b.length - a.length;
    }
    // If same length, alphabetical order
    return a.localeCompare(b);
  });
  
  return sorted.slice(0, limit);
}
