import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a description to 1-2 lines (~120-150 characters)
 * Prefers sentence boundaries (splits on periods)
 * @param description - The full description text
 * @param maxLines - Maximum number of lines (default: 2)
 * @returns Truncated description string
 */
export function truncateDescription(description: string, maxLines: number = 2): string {
  if (!description) return "";
  
  // Target character count for 1-2 lines (~120-150 chars)
  const maxChars = maxLines === 1 ? 120 : 150;
  
  // If description is already short, return as-is
  if (description.length <= maxChars) {
    return description;
  }
  
  // Try to split by sentences (periods followed by space or end of string)
  const sentences = description.split(/(?<=\.)\s+/);
  
  let result = "";
  for (const sentence of sentences) {
    const candidate = result ? `${result} ${sentence}` : sentence;
    
    // If adding this sentence would exceed the limit, stop
    if (candidate.length > maxChars) {
      // If we have at least one sentence, return it
      if (result) {
        return result.trim();
      }
      // If even the first sentence is too long, truncate it
      return candidate.substring(0, maxChars - 3).trim() + "...";
    }
    
    result = candidate;
    
    // If we've reached a reasonable length, stop
    if (result.length >= maxChars * 0.8) {
      break;
    }
  }
  
  // If no sentence boundaries found or result is still too long, truncate at word boundary
  if (result.length > maxChars) {
    const truncated = result.substring(0, maxChars);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      return truncated.substring(0, lastSpace).trim() + "...";
    }
    return truncated.trim() + "...";
  }
  
  return result.trim();
}

/**
 * Format title to a readable name
 * Converts "linkedin-python-auto-outreach-bot" to "Linkedin Python Auto Outreach Bot"
 * Removes dashes and capitalizes the first letter of each word
 */
export function formatName(title: string): string {
  if (!title) return '';
  return title
    .split('-')
    .map(word => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .trim();
}
