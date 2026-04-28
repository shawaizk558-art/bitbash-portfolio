import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ServiceModels } from "@/components/ServiceModels";
import { DevelopmentLifecycle } from "@/components/DevelopmentLifecycle";
import { ConsistentDelivery } from "@/components/ConsistentDelivery";
import { HowWeWorkFeatures } from "@/components/HowWeWorkFeatures";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const OurWorkModel = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Our Work Model - BitBash"
        description="Discover our transparent, efficient, and results-driven software development process. From client communication to deep work execution."
        canonical="/our-work-model"
      />
      <Navigation />
      <Hero
        title="Transparent, Efficient, and Results-Driven"
        subtitle="See how we turn complex requirements into polished software through our proven process."
       //remove start your project button
        buttons={[
          { label: "View Our Work", href: "/projects", variant: "default" }
        ]}
      />
      <ServiceModels />
      <DevelopmentLifecycle />
      <ConsistentDelivery />
      <HowWeWorkFeatures />
      <CTA />
      <Footer isHomepage={true} />
    </div>
  );
};

export default OurWorkModel;

