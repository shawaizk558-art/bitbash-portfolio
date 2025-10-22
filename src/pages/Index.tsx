import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Showcase } from "@/components/Showcase";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Showcase />
      <FAQ />
      <CTA />
      <Footer isHomepage={true} />
    </div>
  );
};

export default Index;
