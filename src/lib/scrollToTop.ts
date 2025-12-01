import Lenis from "lenis";

/**
 * scrollToTopImmediate
 * Scrolls viewport to the top, using Lenis if available, otherwise falling back to native scroll.
 * Can be used on clicks even when routing to the same page.
 */
export const scrollToTopImmediate = () => {
  if (typeof window === "undefined") return;

  const anyWindow = window as any;
  const lenisInstance: Lenis | undefined = anyWindow.lenis;

  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }
};


