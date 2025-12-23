import React from 'react';

interface ImageConfig {
  src: string;
  alt: string;
  colSpan?: number;
  rowSpan?: number;
  aspectRatio?: string;
}

interface ImageGridProps {
  images?: ImageConfig[];
}

const defaultImages: ImageConfig[] = [
  { 
    src: '/images/image-grid/1.webp', 
    alt: 'Team activity',
    colSpan: 1,
    rowSpan: 2,
    aspectRatio: '5/7'
  },
  { 
    src: '/images/image-grid/2.webp', 
    alt: 'Team collaboration',
    colSpan: 1,
    rowSpan: 1,
    aspectRatio: '8/5'
  },
  { 
    src: '/images/image-grid/3.webp', 
    alt: 'Team adventure',
    colSpan: 1,
    rowSpan: 1,
    aspectRatio: '8/5'
  },
  { 
    src: '/images/image-grid/4.webp', 
    alt: 'Team presentation',
    colSpan: 2,
    rowSpan: 2,
    aspectRatio: '8/5'
  },
  { 
    src: '/images/image-grid/5.webp', 
    alt: 'Team group photo',
    colSpan: 1,
    rowSpan: 1,
    aspectRatio: '8/5'
  },
];

export const ImageGrid: React.FC<ImageGridProps> = ({ 
  images = defaultImages
}) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-responsive">
        <div className="max-w-7xl mx-auto px-4 sm:px-0">
          {/* Image Grid - Flexible layout with configurable sizes */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  gridColumn: `span ${image.colSpan || 1}`,
                  gridRow: `span ${image.rowSpan || 1}`,
                }}
              >
                <div 
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-md group cursor-pointer"
                  style={{ aspectRatio: image.aspectRatio || '1/1' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

