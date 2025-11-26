import { useEffect, useRef, useState } from "react";

interface VideoSource {
  src: string;
  type: string;
}

interface AutoPlayVideoProps {
  sources: VideoSource[];
  poster: string;
  alt: string;
  className?: string;
  loop?: boolean;
}

export const AutoPlayVideo = ({
  sources,
  poster,
  alt,
  className,
  loop = true,
}: AutoPlayVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Detect scroll stop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Wait 150ms after scroll stops
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPlay(true);
          } else {
            setShouldPlay(false);
            node.pause();
            node.currentTime = 0;
          }
        });
      },
      { 
        threshold: 0.6,
        rootMargin: '0px'
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Only play video when visible AND scroll has stopped
  useEffect(() => {
    const node = videoRef.current;
    if (!node || prefersReducedMotion) return;

    if (shouldPlay && !isScrolling) {
      // Delay play slightly to ensure scroll has fully stopped
      const playTimeout = setTimeout(() => {
        node.play().catch(() => {});
      }, 50);
      
      return () => clearTimeout(playTimeout);
    } else if (!shouldPlay || isScrolling) {
      node.pause();
    }
  }, [shouldPlay, isScrolling, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <img
        src={poster}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop={loop}
      playsInline
      preload="metadata"
      aria-label={alt}
      style={{ 
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden' as const,
        willChange: isScrolling ? 'auto' : 'transform'
      }}
    >
      {sources.map((source) => (
        <source key={source.type} src={source.src} type={source.type} />
      ))}
    </video>
  );
};

