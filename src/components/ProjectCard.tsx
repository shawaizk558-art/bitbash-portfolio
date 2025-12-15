import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { detectProjectLogo } from '@/lib/dynamicLogos';
import { formatName } from '@/lib/utils';
import { Star, Users } from 'lucide-react';
import { useMemo } from 'react';

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

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const logoResult = detectProjectLogo(project);
  // Format the project name: remove dashes and capitalize each word
  const rawName = (project as any).title || project.name || '';
  const projectName = formatName(rawName);
  const category = ((project as any).category || project.role || '').toLowerCase();
  const provider = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Project';
  const categoryPath = category ? `${category}/${project.slug}` : project.slug;
  
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
      const readme = (project as any).readme;
      const openingMatch = readme.match(/^#\s+[^\n]+\n\n([\s\S]*?)(?=\n##\s+Introduction)/i);
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
    
    if (logoResult.type === 'simple-icon' && logoResult.url) {
      const iconColor = logoResult.color ? `#${logoResult.color}` : '#000000';
      return (
        <>
          <img
            src={logoResult.url}
            alt={logoResult.alt}
            className={`${logoSize} object-contain rounded-none border-none`}
            style={{ 
              // Apply brand color to SVG using CSS filter (Simple Icons SVGs are black by default)
              // This is a simplified approach - for better color accuracy, consider using inline SVGs
            }}
            loading="lazy"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Gradient fallback (hidden by default) */}
          <div className="hidden" style={{ display: 'none' }}>
            <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${gradientClasses[project.videoPlaceholder] || gradientClasses.purple} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {logoResult.initials || '?'}
              </span>
            </div>
          </div>
        </>
      );
    } else if (logoResult.type === 'lucide-icon' && logoResult.component) {
      const IconComponent = logoResult.component;
      const iconColor = logoResult.color === 'purple' ? '#9333ea' : '#4b5563';
      return <IconComponent className={`${logoSize} object-contain`} style={{ color: iconColor }} />;
    } else {
      // Gradient fallback with initials
      const gradientClass = gradientClasses[project.videoPlaceholder] || gradientClasses.purple;
      return (
        <div className={`${logoSize} rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="text-white font-bold text-sm">
            {logoResult.initials || '?'}
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
          {/* Gradient fallback (hidden by default, shown on image error) */}
          {logoResult.type === 'simple-icon' && (
            <div 
              className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center hidden"
            >
              <span className="text-white font-bold text-sm">
                {logoResult.initials || '?'}
              </span>
            </div>
          )}
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
};


