import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { HowWeWorkFeatures } from "@/components/HowWeWorkFeatures";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const HowWeWork = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="How We Work - BitBash"
        description="Discover our transparent, efficient, and results-driven software development process. From client communication to deep work execution."
        canonical="/how-we-work"
      />
      <Navigation />
      <Hero
        title="Transparent, Efficient, and Results-Driven"
        subtitle="See how we turn complex requirements into polished software through our proven process."
        buttons={[
          { label: "Start Your Project", href: "/contact", variant: "default" },
          { label: "View Our Work", href: "/projects", variant: "outline" }
        ]}
      />
      <HowWeWorkFeatures />
      <Footer />
    </div>
  );
};

export default HowWeWork;


