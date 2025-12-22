import { useEffect } from 'react';

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

export default MobileViewport;

