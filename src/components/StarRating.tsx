import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0-5, can be decimal
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const sizeClasses = {
  sm: 'w-3 h-3 sm:w-4 sm:h-4',
  md: 'w-4 h-4 sm:w-5 sm:h-5',
  lg: 'w-5 h-5 sm:w-6 sm:h-6',
};

export const StarRating = ({ rating, size = 'sm', showNumber = false }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = sizeClasses[size];

  return (
    <div className="flex items-center gap-0.5">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
      ))}
      
      {/* Half star - using SVG mask for better rendering */}
      {hasHalfStar && (
        <div className="relative inline-block" style={{ width: 'fit-content' }}>
          <Star className={`${sizeClass} text-yellow-400`} />
          <div 
            className="absolute top-0 left-0 overflow-hidden"
            style={{ 
              width: '50%',
              height: '100%',
            }}
          >
            <Star className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${sizeClass} text-yellow-400`} />
      ))}
      
      {/* Optional rating number */}
      {showNumber && (
        <span className="ml-1 text-xs sm:text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

