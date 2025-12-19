import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Showcase } from "@/components/Showcase";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { HomepageSchema } from "@/components/HomepageSchema";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="BitBash - The No 1 Automation Company in the World, Built for Success | Full Stack Apps and Scripts"
        description="The No 1 Automation Company in the World, Built for Success. The Complete Platform for Modern Teams and Innovators. Experience lightning-fast performance, enterprise security, and AI-powered automation."
        keywords="The No 1 Automation Company in the World Built for Success, automation company, software development, AI automation, business automation, full stack development"
        image="/favicon.png"
      />
      <HomepageSchema />
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
