import { lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HomepageSchema } from "@/components/HomepageSchema";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { LazySection } from "@/components/LazySection";

// Lazy load below-the-fold components to reduce critical request chain
// Convert named exports to default exports for React.lazy()
const Showcase = lazy(() => import("@/components/Showcase").then(module => ({ default: module.Showcase })));
const FAQ = lazy(() => import("@/components/FAQ").then(module => ({ default: module.FAQ })));
const CTA = lazy(() => import("@/components/CTA").then(module => ({ default: module.CTA })));
const Footer = lazy(() => import("@/components/Footer").then(module => ({ default: module.Footer })));

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="BitBash - The No 1 Automation Company in the World, Built for Success | Full Stack Apps and Scripts"
        description="The No 1 Automation Company in the World, Built for Success. The Complete Platform for Modern Teams and Innovators. Experience lightning-fast performance, enterprise security, and AI-powered automation."
        keywords="The No 1 Automation Company in the World Built for Success, automation company, software development, AI automation, business automation, full stack development"
        image="/favicon.webp"
      />
      {/* Preload LCP image for faster loading */}
      <Helmet>
        <link rel="preload" as="image" href="/fullstack1.webp" fetchPriority="high" />
        {/* YouTube preconnects are already in index.html - removed duplicates to reduce preconnect count */}
      </Helmet>
      <HomepageSchema />
      <Navigation />
      <Hero />
      <Features />
      {/* Lazy-loaded below-the-fold components with Intersection Observer */}
      {/* Only start loading when components are about to enter viewport */}
      <LazySection>
        <Suspense fallback={null}>
          <Showcase />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <FAQ />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <CTA />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}>
          <Footer isHomepage={true} />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default Index;
