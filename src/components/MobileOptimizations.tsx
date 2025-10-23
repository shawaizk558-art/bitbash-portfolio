import { useEffect } from 'react';

// Mobile-specific optimizations and utilities
export const MobileOptimizations = () => {
  useEffect(() => {
    // Prevent zoom on double tap for iOS
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add touch event listeners
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });

    // Optimize scroll performance
    const optimizeScroll = () => {
      (document.body.style as any).webkitOverflowScrolling = 'touch';
    };

    optimizeScroll();

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  return null;
};

// Mobile viewport meta tag optimization
export const MobileViewport = () => {
  useEffect(() => {
    // Ensure proper viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }
  }, []);

  return null;
};

// Touch-friendly interaction utilities
export const TouchOptimizations = {
  // Add touch feedback to elements
  addTouchFeedback: (element: HTMLElement) => {
    const touchStartHandler = () => {
      element.style.transform = 'scale(0.98)';
    };
    
    const touchEndHandler = () => {
      element.style.transform = 'scale(1)';
    };

    // Store handlers on the element for later removal
    (element as any)._touchStartHandler = touchStartHandler;
    (element as any)._touchEndHandler = touchEndHandler;
    
    element.addEventListener('touchstart', touchStartHandler);
    element.addEventListener('touchend', touchEndHandler);
  },

  // Remove touch feedback
  removeTouchFeedback: (element: HTMLElement) => {
    const touchStartHandler = (element as any)._touchStartHandler;
    const touchEndHandler = (element as any)._touchEndHandler;
    
    if (touchStartHandler) {
      element.removeEventListener('touchstart', touchStartHandler);
      delete (element as any)._touchStartHandler;
    }
    
    if (touchEndHandler) {
      element.removeEventListener('touchend', touchEndHandler);
      delete (element as any)._touchEndHandler;
    }
  }
};

// Mobile performance optimizations
export const MobilePerformance = {
  // Lazy load images
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Optimize animations for mobile
  optimizeAnimations: () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }
};
