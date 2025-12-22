import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopImmediate } from "@/lib/scrollToTop";

/**
 * ScrollToTop
 * Ensures that on every route change we scroll to the top of the page.
 * Works both with native scroll and Lenis-powered smooth scroll.
 */
export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Defer scroll to top to avoid forced reflows during route transitions
    // requestAnimationFrame ensures layout is complete before scrolling
    requestAnimationFrame(() => {
      scrollToTopImmediate();
    });
  }, [location.pathname]);

  return null;
};


