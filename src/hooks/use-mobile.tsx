import * as React from "react";

// Enhanced breakpoint system for comprehensive responsive design
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`);
    const onChange = () => {
      // Use matchMedia.matches instead of window.innerWidth to avoid forced reflow
      setIsMobile(mql.matches);
    };
    mql.addEventListener("change", onChange);
    // Use matchMedia.matches for initial state - doesn't force reflow (cached value)
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

// Enhanced responsive hook with multiple breakpoints
export function useResponsive() {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('xs');

  React.useEffect(() => {
    // Create matchMedia queries for each breakpoint (using min-width, checking largest to smallest)
    // This avoids forced reflows by using cached matchMedia.matches values
    const queries = {
      '2xl': window.matchMedia(`(min-width: ${BREAKPOINTS['2xl']}px)`),
      xl: window.matchMedia(`(min-width: ${BREAKPOINTS.xl}px)`),
      lg: window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`),
      md: window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`),
      sm: window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px)`),
    };

    const updateBreakpoint = () => {
      // Use matchMedia.matches instead of window.innerWidth to avoid forced reflow
      // Check from largest to smallest breakpoint
      if (queries['2xl'].matches) setBreakpoint('2xl');
      else if (queries.xl.matches) setBreakpoint('xl');
      else if (queries.lg.matches) setBreakpoint('lg');
      else if (queries.md.matches) setBreakpoint('md');
      else if (queries.sm.matches) setBreakpoint('sm');
      else setBreakpoint('xs');
    };

    // Set initial breakpoint using matchMedia.matches (doesn't force reflow)
    updateBreakpoint();

    // Listen to all media query changes
    const handlers: Array<() => void> = [];
    Object.values(queries).forEach((mql) => {
      const handler = () => updateBreakpoint();
      mql.addEventListener('change', handler);
      handlers.push(() => mql.removeEventListener('change', handler));
    });

    return () => {
      handlers.forEach((cleanup) => cleanup());
    };
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    isSmallMobile: breakpoint === 'xs',
    isLargeMobile: breakpoint === 'sm',
  };
}

// Hook for touch device detection
export function useIsTouch() {
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}
