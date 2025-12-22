/**
 * scrollToTopImmediate
 * Scrolls viewport to the top, using Lenis if available (desktop only), otherwise falling back to native scroll.
 * Can be used on clicks even when routing to the same page.
 * On mobile, always uses native scroll since Lenis is not loaded.
 */
export const scrollToTopImmediate = () => {
  if (typeof window === "undefined") return;

  const anyWindow = window as any;
  const lenisInstance = anyWindow.lenis;

  // Use Lenis if available (desktop), otherwise use native scroll (mobile)
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }
};


