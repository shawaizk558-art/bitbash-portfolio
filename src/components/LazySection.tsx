import { useState, useEffect, useRef, ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  waitForInteraction?: boolean; // On mobile, wait for user interaction before loading
  className?: string;
  style?: React.CSSProperties;
}

/**
 * LazySection - Intersection Observer wrapper for true lazy loading
 * Only loads children when they're about to enter the viewport
 * On mobile, can optionally wait for user interaction to reduce initial JS execution
 * This breaks the critical request chain by deferring component loading
 */
export const LazySection = ({
  children,
  fallback = null,
  rootMargin = "200px", // Start loading 200px before visible
  waitForInteraction = false, // Set to true for mobile-heavy components
  className = "",
  style
}: LazySectionProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // On mobile with waitForInteraction, wait for first user interaction
  useEffect(() => {
    if (!isMobile || !waitForInteraction || hasInteracted) return;

    const handleInteraction = () => {
      setHasInteracted(true);
    };

    // Listen for first user interaction
    const events = ['scroll', 'touchstart', 'click', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, [isMobile, waitForInteraction, hasInteracted]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // On mobile with waitForInteraction, don't load until user has interacted
    if (isMobile && waitForInteraction && !hasInteracted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: isMobile ? "100px" : rootMargin } // Smaller margin on mobile
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, isMobile, waitForInteraction, hasInteracted]);

  return <div ref={ref} className={className} style={style}>{shouldLoad ? children : fallback}</div>;
};

