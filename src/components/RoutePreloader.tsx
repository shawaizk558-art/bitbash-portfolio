import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * RoutePreloader component
 * Intelligently prefetches route chunks to improve navigation performance
 */
export const RoutePreloader = () => {
    const location = useLocation();

    useEffect(() => {
        // Preload common routes after initial page load
        const preloadCommonRoutes = () => {
            // Only preload if we're on the homepage
            if (location.pathname === "/") {
                // Preload most commonly visited routes
                const commonRoutes = [
                    () => import("@/pages/AutomationServices"),
                    () => import("@/pages/DevelopmentServices"),
                    () => import("@/pages/Contact"),
                ];

                // Use requestIdleCallback to preload during idle time
                if ("requestIdleCallback" in window) {
                    window.requestIdleCallback(
                        () => {
                            commonRoutes.forEach((route) => route());
                        },
                        { timeout: 3000 }
                    );
                } else {
                    // Fallback for browsers without requestIdleCallback
                    setTimeout(() => {
                        commonRoutes.forEach((route) => route());
                    }, 2000);
                }
            }
        };

        preloadCommonRoutes();
    }, [location.pathname]);

    // Add hover prefetching for navigation links
    useEffect(() => {
        const handleLinkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (!link || !link.href) return;

            const url = new URL(link.href);
            const path = url.pathname;

            // Map paths to their lazy-loaded components
            const routeMap: Record<string, () => Promise<any>> = {
                "/automation-services": () => import("@/pages/AutomationServices"),
                "/development-services": () => import("@/pages/DevelopmentServices"),
                "/pricing": () => import("@/pages/Pricing"),
                "/contact": () => import("@/pages/Contact"),
                "/projects": () => import("@/pages/Projects"),
                "/blog": () => import("@/pages/Blog"),
                "/how-we-work": () => import("@/pages/HowWeWork"),
            };

            if (routeMap[path]) {
                // Prefetch the route chunk on hover
                routeMap[path]();
            }
        };

        // Add event listener with passive flag for better performance
        document.addEventListener("mouseover", handleLinkHover, { passive: true });

        return () => {
            document.removeEventListener("mouseover", handleLinkHover);
        };
    }, []);

    return null;
};
