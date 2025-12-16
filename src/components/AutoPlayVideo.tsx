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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.play().catch(() => { });
          } else {
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
    
    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

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
        backfaceVisibility: 'hidden' as const
      }}
    >
      {sources.map((source) => (
        <source key={source.type} src={source.src} type={source.type} />
      ))}
    </video>
  );
};

