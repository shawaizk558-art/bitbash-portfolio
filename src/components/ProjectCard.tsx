import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { detectProjectLogo } from '@/lib/dynamicLogos';
import { formatName } from '@/lib/utils';
import { Star, Users, Zap, Database, Sparkles, Rocket, Brain, Cpu, Code2, Globe, Network, Layers, Boxes, CircuitBoard, Atom } from 'lucide-react';
import { useMemo, useState, memo } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const gradientClasses = {
  purple: 'from-purple-400 to-purple-600',
  blue: 'from-blue-400 to-blue-600',
  green: 'from-green-400 to-green-600',
  orange: 'from-orange-400 to-orange-600',
  pink: 'from-pink-400 to-pink-600',
  teal: 'from-teal-400 to-teal-600',
};

/**
 * Generate a deterministic random number between min and max based on a seed string
 * This ensures the same slug always produces the same values
 */
function seededRandom(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Normalize to 0-1 range
  const normalized = Math.abs(hash) / 2147483647;
  return min + (normalized * (max - min));
}

/**
 * Generate a deterministic random number between 0 and max based on a seed string
 */
function seededRandomIndex(seed: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const normalized = Math.abs(hash) / 2147483647;
  return Math.floor(normalized * max);
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
 * Fallback automation icons (for category-based fallback) - All purple with cool icons
 */
const AUTOMATION_FALLBACK_ICONS = [
  { component: Sparkles, color: '#9333ea', name: 'Sparkles' }, // Purple
  { component: Rocket, color: '#9333ea', name: 'Rocket' }, // Purple
  { component: Zap, color: '#9333ea', name: 'Zap' }, // Purple
  { component: Brain, color: '#9333ea', name: 'Brain' }, // Purple
  { component: Cpu, color: '#9333ea', name: 'Cpu' }, // Purple
  { component: CircuitBoard, color: '#9333ea', name: 'CircuitBoard' }, // Purple
  { component: Atom, color: '#9333ea', name: 'Atom' }, // Purple
];

/**
 * Fallback scraping icons (for category-based fallback) - All purple with cool icons
 */
const SCRAPING_FALLBACK_ICONS = [
  { component: Database, color: '#9333ea', name: 'Database' }, // Purple
  { component: Globe, color: '#9333ea', name: 'Globe' }, // Purple
  { component: Network, color: '#9333ea', name: 'Network' }, // Purple
  { component: Layers, color: '#9333ea', name: 'Layers' }, // Purple
  { component: Boxes, color: '#9333ea', name: 'Boxes' }, // Purple
  { component: Code2, color: '#9333ea', name: 'Code2' }, // Purple
];

export const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);
  const logoResult = detectProjectLogo(project);
  // Format the project name: remove dashes and capitalize each word
  const rawName = (project as any).title || project.name || '';
  const projectName = formatName(rawName);
  const category = ((project as any).category || project.role || '').toLowerCase();
  const provider = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Project';
  const categoryPath = category ? `${category}/${project.slug}` : project.slug;
  
  // Get topics/technologies for category detection
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const topics = Array.isArray((project as any).topics) ? (project as any).topics : [];
  const allTopics = [...technologies, ...topics];
  const normalizedTopics = allTopics.map(t => String(t).toLowerCase().trim());
  const normalizedCategory = category.toLowerCase();
  
  // Check if project is automation or scraping category (for fallback)
  const isAutomation = normalizedCategory.includes('automation') || 
                       normalizedTopics.some(t => t.includes('automation')) ||
                       rawName.toLowerCase().includes('automation');
  
  const isScraping = normalizedCategory.includes('scraping') || 
                     normalizedCategory.includes('scraper') ||
                     normalizedTopics.some(t => t.includes('scraping') || t.includes('scraper')) ||
                     rawName.toLowerCase().includes('scraping') || rawName.toLowerCase().includes('scraper');
  
  // Get category-based fallback icon if image fails
  const getCategoryFallbackIcon = () => {
    const seed = (project as any).slug || rawName || 'default';
    if (isAutomation) {
      const iconIndex = seededRandomIndex(seed, AUTOMATION_FALLBACK_ICONS.length);
      return AUTOMATION_FALLBACK_ICONS[iconIndex];
    }
    if (isScraping) {
      const iconIndex = seededRandomIndex(seed, SCRAPING_FALLBACK_ICONS.length);
      return SCRAPING_FALLBACK_ICONS[iconIndex];
    }
    return null;
  };
  
  // Calculate initials for fallback
  const initials = logoResult.initials || getInitials(rawName);
  
  // Generate deterministic random rating (4.1-5.0) and user count (20-150) based on slug
  const { rating, userCount } = useMemo(() => {
    const slug = project.slug || '';
    const rating = Math.round(seededRandom(slug + '_rating', 4.1, 5.0) * 10) / 10;
    const userCount = Math.round(seededRandom(slug + '_users', 20, 150));
    return { rating, userCount };
  }, [project.slug]);
  
  // Get description - extract opening paragraph from readme (same logic as ProjectDetail)
  const getDescription = () => {
    if ((project as any).readme) {
      // Extract opening paragraph from readme (between main title and ## Introduction)
      // Handles both markdown headings (# Title) and plain text titles
      const readme = (project as any).readme;
      // Try to match content after title (with or without #) and before ## Introduction
      const openingMatch = readme.match(/^(?:#\s+)?[^\n]+\n\n([\s\S]*?)(?=\n##\s+Introduction)/i);
      if (openingMatch && openingMatch[1]) {
        let text = openingMatch[1].trim();
        // Clean up markdown formatting for plain text display
        text = text
          .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
          .replace(/\*([^*]+)\*/g, '$1') // Remove italic
          .replace(/`([^`]+)`/g, '$1') // Remove inline code
          .replace(/\n+/g, ' ') // Replace newlines with spaces
          .trim();
        return text;
      }
    }
    // Fallback to description or quote
    return (project as any).description || project.quote || '';
  };
  const description = getDescription();

  // Render logo based on type - all logos should be same size with equal top/bottom spacing
  const renderLogo = () => {
    const logoSize = 'h-9 w-9'; // Fixed size for all logos (slightly smaller)
    
    // If image failed to load, show category-based fallback or gradient
    if (imageError) {
      const categoryIcon = getCategoryFallbackIcon();
      if (categoryIcon) {
        const IconComponent = categoryIcon.component;
        return <IconComponent className={`${logoSize} object-contain`} style={{ color: categoryIcon.color }} />;
      }
      // Fallback to gradient with initials
      const gradientClass = gradientClasses[project.videoPlaceholder] || gradientClasses.purple;
      return (
        <div className={`${logoSize} rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">
            {initials}
          </span>
        </div>
      );
    }
    
    if (logoResult.type === 'simple-icon' && logoResult.url) {
      return (
        <img
          src={logoResult.url}
          alt={logoResult.alt}
          className={`${logoSize} object-contain rounded-none border-none`}
          loading="lazy"
          onError={() => {
            // Set error state to trigger fallback
            setImageError(true);
          }}
        />
      );
    } else if (logoResult.type === 'lucide-icon' && logoResult.component) {
      const IconComponent = logoResult.component;
      // Use the color directly if it's a hex color, otherwise default to purple
      const iconColor = logoResult.color && logoResult.color.startsWith('#') 
        ? logoResult.color 
        : (logoResult.color === 'purple' ? '#9333ea' : '#9333ea'); // Default to purple
      return <IconComponent className={`${logoSize} object-contain`} style={{ color: iconColor }} />;
    } else {
      // Gradient fallback with initials
      const gradientClass = gradientClasses[project.videoPlaceholder] || gradientClasses.purple;
      return (
        <div className={`${logoSize} rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">
            {initials}
          </span>
        </div>
      );
    }
  };

  return (
    <Link
      to={`/project/${project.slug}`}
      className="h-[200px] sm:h-[210px] md:h-[220px] w-full border border-[#d0d5e9] bg-white rounded-2xl px-6 py-4 transition-shadow duration-150 ease-out flex flex-col justify-between items-start no-underline hover:shadow-[4px_8px_10.1px_-2.5px_rgba(63,71,93,0.12),1.7px_3.3px_4.2px_-1.7px_rgba(63,71,93,0.13),0.7px_1.4px_1.8px_-0.8px_rgba(63,71,93,0.14),0.3px_0.5px_0.7px_0px_rgba(63,71,93,0.15)]"
    >
      {/* Header */}
      <div className="w-full h-11 flex items-center gap-[12.8px] relative">
        {/* Logo - fixed size with equal top/bottom spacing */}
        <div className="flex-shrink-0 h-9 w-9 flex items-center justify-center">
          {renderLogo()}
        </div>

        {/* Title and Path */}
        <div className="flex-1 min-w-0 h-full overflow-hidden flex flex-col justify-center">
          <h4 className="text-base leading-6 font-bold text-[#242836] mb-0 line-clamp-1">
            {projectName}
          </h4>
          <p className="text-sm leading-5 font-normal text-[#6c7590] whitespace-nowrap overflow-hidden text-ellipsis block w-full mt-0">
            {categoryPath}
          </p>
        </div>
      </div>

      {/* Description - max 3 lines */}
      <div className="w-full flex items-start my-3">
        <p className="text-black overflow-hidden text-ellipsis line-clamp-3 m-0 leading-5" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', fontSize: '15px' }}>
          {description}
        </p>
      </div>

      {/* Footer: Provider, Rating, and User Count */}
      <div className="w-full h-7 flex justify-between items-center">
        <p className="text-base leading-7 font-semibold text-[#3f475d] m-0">
          {provider}
        </p>
        <div className="flex items-center gap-4">
          {/* Users Icon with Count */}
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-black" />
            <span className="text-sm text-black font-medium">
              {userCount >= 1000 ? `${(userCount / 1000).toFixed(1)}K` : userCount}
            </span>
          </div>
          
          {/* Single Star with Rating */}
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-black" />
            <span className="text-sm text-black font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Only re-render if project slug or index changes
  return prevProps.project.slug === nextProps.project.slug && 
         prevProps.index === nextProps.index;
});

ProjectCard.displayName = 'ProjectCard';


