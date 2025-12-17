import { useEffect, useRef, useState } from 'react';

/**
 * Hook to preload logo images for visible project cards
 * Uses Intersection Observer to detect when cards come into view
 * and preloads their logo images
 */
export function useLogoPreload(logoUrl: string | undefined, isAboveFold: boolean = false) {
  const [shouldPreload, setShouldPreload] = useState(isAboveFold);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If above fold or already should preload, skip observer
    if (shouldPreload || !logoUrl) return;

    // Create Intersection Observer to detect when element is near viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldPreload(true);
            // Disconnect observer once we start preloading
            if (observerRef.current && elementRef.current) {
              observerRef.current.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        // Start preloading when element is 200px away from viewport
        rootMargin: '200px',
        threshold: 0,
      }
    );

    // Observe the element if it exists
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, [shouldPreload, logoUrl]);

  // Preload the image when shouldPreload is true
  useEffect(() => {
    if (!shouldPreload || !logoUrl || isLoaded) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Mark as loaded even on error to prevent retries
    img.src = logoUrl;
  }, [shouldPreload, logoUrl, isLoaded]);

  return {
    elementRef,
    shouldPreload,
    isLoaded,
    fetchPriority: isAboveFold ? 'high' as const : 'low' as const,
  };
}

