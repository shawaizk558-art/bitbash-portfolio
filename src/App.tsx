import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RoutePreloader } from "@/components/RoutePreloader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster as ToastContainer } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { HelmetProvider } from "react-helmet-async";
import { ProjectsSearchProvider } from "@/contexts/ProjectsSearchContext";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AllServices = lazy(() => import("./pages/AllServices"));
const ServiceAutomation = lazy(() => import("./pages/ServiceAutomation"));
const ServiceScraping = lazy(() => import("./pages/ServiceScraping"));
const ServiceFullStack = lazy(() => import("./pages/ServiceFullStack"));
const ServiceAiSolutions = lazy(() => import("./pages/ServiceAiSolutions"));
const ServiceSaasMvp = lazy(() => import("./pages/ServiceSaasMvp"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const Partners = lazy(() => import("./pages/Partners"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const Jobs = lazy(() => import("./pages/Jobs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const MobileViewport = lazy(() =>
  import("@/components/MobileOptimizations").then((module) => ({
    default: module.MobileViewport,
  }))
);

const MobileOptimizations = lazy(() =>
  import("@/components/MobileOptimizations").then((module) => ({
    default: module.MobileOptimizations,
  }))
);

const App = () => {
  // Initialize smooth scrolling globally for all pages
  useSmoothScroll();

  return (
    <HelmetProvider>
      <TooltipProvider>
        <ProjectsSearchProvider>
          <Suspense fallback={null}>
            <MobileViewport />
            <MobileOptimizations />
          </Suspense>
          <ToastContainer />
          <SonnerToaster />
          <BrowserRouter>
            <ScrollToTop />
            <RoutePreloader />
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<AllServices />} />
                <Route path="/services/automation" element={<ServiceAutomation />} />
                <Route path="/services/scraping" element={<ServiceScraping />} />
                <Route path="/services/full-stack" element={<ServiceFullStack />} />
                <Route path="/services/ai-solutions" element={<ServiceAiSolutions />} />
                <Route path="/services/saas-mvp" element={<ServiceSaasMvp />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostDetail />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/how-we-work" element={<HowWeWork />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route path="/jobs" element={<Jobs />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ProjectsSearchProvider>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
