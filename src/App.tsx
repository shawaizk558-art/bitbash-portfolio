import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RoutePreloader } from "@/components/RoutePreloader";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const AutomationServices = lazy(() => import("./pages/AutomationServices"));
const DevelopmentServices = lazy(() => import("./pages/DevelopmentServices"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Blog = lazy(() => import("./pages/Blog"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
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

const ToastContainer = lazy(() =>
  import("@/components/ui/toaster").then((module) => ({
    default: module.Toaster,
  }))
);

const SonnerToaster = lazy(() =>
  import("@/components/ui/sonner").then((module) => ({
    default: module.Toaster,
  }))
);

const App = () => (
  <TooltipProvider>
    <Suspense fallback={null}>
      <MobileViewport />
      <MobileOptimizations />
      <ToastContainer />
      <SonnerToaster />
    </Suspense>
    <BrowserRouter>
      <RoutePreloader />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/automation-services" element={<AutomationServices />} />
          <Route path="/development-services" element={<DevelopmentServices />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
