import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Custom hook for implementing smooth scroll using Lenis
 * 
 * What this does:
 * - Creates a smooth, momentum-based scroll experience
 * - Uses requestAnimationFrame for optimal performance (60fps)
 * - Automatically cleans up when component unmounts
 * - Optimized for desktop devices (touch devices use native smooth scrolling)
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis with configuration
    const lenis = new Lenis({
      duration: 1.2,        // How long scroll animations take (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing curve (exponential ease-out)
      orientation: 'vertical', // Only smooth vertical scrolling
      gestureOrientation: 'vertical', // Only capture vertical gestures
      smoothWheel: true,    // Enable smooth scrolling for mouse wheel
      wheelMultiplier: 1,   // Adjust scroll speed (1 = normal)
      touchMultiplier: 2,   // Touch scroll multiplier
      infinite: false,      // Don't loop scroll (no infinite scroll)
      prevent: (node) => {
        // Prevent smooth scroll on video elements to avoid jitter
        return node.tagName === 'VIDEO' || node.closest('video') !== null;
      },
    });

    /**
     * Animation loop using requestAnimationFrame (RAF)
     * 
     * Why RAF?
     * - Syncs with browser's repaint cycle (~60fps)
     * - Automatically pauses when tab is inactive (saves CPU)
     * - Better performance than setInterval/setTimeout
     * - Smoother animations aligned with screen refresh
     */
    function raf(time: number) {
      lenis.raf(time); // Update Lenis scroll position
      requestAnimationFrame(raf); // Schedule next frame
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup function when component unmounts
    return () => {
      lenis.destroy(); // Remove event listeners and stop animation
    };
  }, []); // Empty dependency array = runs once on mount
};

