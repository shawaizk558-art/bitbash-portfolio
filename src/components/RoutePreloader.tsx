import { useEffect } from "react";

/**
 * RoutePreloader component
 * Intelligently prefetches route chunks on hover to improve navigation performance
 * Removed automatic prefetching to avoid creating critical request chains
 */
export const RoutePreloader = () => {
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
                "/services": () => import("@/pages/AllServices"),
                "/services/automation": () => import("@/pages/ServiceAutomation"),
                "/services/scraping": () => import("@/pages/ServiceScraping"),
                "/services/full-stack": () => import("@/pages/ServiceFullStack"),
                "/services/ai-solutions": () => import("@/pages/ServiceAiSolutions"),
                "/services/saas-mvp": () => import("@/pages/ServiceSaasMvp"),
                "/pricing": () => import("@/pages/Pricing"),
                "/contact": () => import("@/pages/Contact"),
                "/projects": () => import("@/pages/Projects"),
                "/blog": () => import("@/pages/Blog"),
                "/partners": () => import("@/pages/Partners"),
                "/our-work-model": () => import("@/pages/OurWorkModel"),
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
