import crypto from 'crypto';
import type { Project } from '../../src/data/projects.js';

/**
 * Generate a hash from project content to detect changes
 */
export function generateContentHash(project: Project): string {
  // Include all content fields that affect the screenshot
  const contentString = [
    project.name,
    project.description,
    project.role,
    project.quote,
    project.technologies?.join(',') || '',
    project.keyFeatures?.join(',') || '',
    project.targetAudience?.join(',') || '',
    project.architectureHighlights?.join(',') || '',
  ].join('|');

  return crypto.createHash('sha256').update(contentString).digest('hex').substring(0, 16);
}

