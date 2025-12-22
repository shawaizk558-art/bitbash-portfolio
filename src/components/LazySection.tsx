import { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

/**
 * LazySection - Intersection Observer wrapper for true lazy loading
 * Only loads children when they're about to enter the viewport
 * This breaks the critical request chain by deferring component loading
 */
export const LazySection = ({ 
  children, 
  fallback = null,
  rootMargin = "200px" // Start loading 200px before visible
}: LazySectionProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return <div ref={ref}>{shouldLoad ? children : fallback}</div>;
};

