import { useEffect } from 'react';
import { useIsMobile } from './use-mobile';

export const useSmoothScroll = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip Lenis on mobile - native mobile scrolling is fine and more performant
    if (isMobile) {
      return;
    }

    // Dynamically import Lenis only on desktop to reduce mobile bundle size
    import('lenis').then(({ default: Lenis }) => {
      // Defer Lenis initialization to avoid forced reflows during React render phase
      // Lenis may query scroll properties during initialization, so we defer until after layout
      const initLenis = () => {
        // Initialize Lenis with configuration - optimized for performance
        const lenis = new Lenis({
          duration: 1.2,        // How long scroll animations take (in seconds)
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing curve (exponential ease-out)
          orientation: 'vertical', // Only smooth vertical scrolling
          gestureOrientation: 'vertical', // Only capture vertical gestures
          smoothWheel: true,    // Enable smooth scrolling for mouse wheel
          wheelMultiplier: 2,   // Adjust scroll speed (1 = normal)
          touchMultiplier: 2,   // Touch scroll multiplier
          infinite: false,      // Don't loop scroll (no infinite scroll)
          syncTouch: false,     // Disable touch sync for better performance
        });

        function raf(time: number) {
          // Update Lenis scroll position
          lenis.raf(time);
          
          requestAnimationFrame(raf); // Schedule next frame
        }

        // Expose Lenis instance globally so other components (e.g. ScrollToTop) can use it
        (window as any).lenis = lenis;

        // Start the animation loop
        requestAnimationFrame(raf);

        return lenis;
      };

      // Defer initialization until after layout is complete to avoid forced reflows
      // Double RAF ensures we're definitely past the render phase
      let lenisInstance: Lenis | null = null;
      let rafId1: number | null = null;
      let rafId2: number | null = null;

      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          lenisInstance = initLenis();
          rafId1 = null;
          rafId2 = null;
        });
      });

      // Cleanup function when component unmounts
      return () => {
        // Cancel pending RAF calls if component unmounts before initialization completes
        if (rafId1 !== null) {
          cancelAnimationFrame(rafId1);
        }
        if (rafId2 !== null) {
          cancelAnimationFrame(rafId2);
        }
        if (lenisInstance) {
          lenisInstance.destroy(); // Remove event listeners and stop animation
        }
        (window as any).lenis = undefined;
      };
    });
  }, [isMobile]); // Re-run if mobile status changes
};
