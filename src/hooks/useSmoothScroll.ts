import { useEffect } from 'react';
import Lenis from 'lenis';

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

