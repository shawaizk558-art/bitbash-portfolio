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
            setShouldPlay(true);
            node.play().catch(() => {
              // Autoplay might still fail; keep poster visible.
            });
          } else {
            node.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
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
      autoPlay={shouldPlay}
      aria-label={alt}
    >
      {sources.map((source) => (
        <source key={source.type} src={source.src} type={source.type} />
      ))}
    </video>
  );
};

