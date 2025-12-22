import { lazy, Suspense, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { LazySection } from "@/components/LazySection";

// Lazy load schema generation to defer heavy JSON-LD work
const HomepageSchema = lazy(() => import("@/components/HomepageSchema").then(m => ({ default: m.HomepageSchema })));

// Lazy load below-the-fold components to reduce critical request chain
const Showcase = lazy(() => import("@/components/Showcase"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));

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
      {/* Defer schema generation until after initial render */}
      <Suspense fallback={null}>
        <HomepageSchema />
      </Suspense>
      <Navigation />
      <Hero />
      <Features />
      {/* Lazy-loaded below-the-fold components with Intersection Observer */}
      {/* On mobile, Showcase waits for user interaction to reduce initial JS execution */}
      <LazySection waitForInteraction={true}>
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
