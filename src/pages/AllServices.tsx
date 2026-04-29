import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock, Users } from "@/lib/icons";
import { HeroBackground } from "@/components/HeroBackground";
import { Zap, Database, Code, Bot, Rocket } from "@/lib/icons";
import { SEO } from "@/components/SEO";

const services = [
  {
    icon: Zap,
    title: "Automation",
    description: "Browser, mobile, and workflow automation",
    features: ["Browser automation", "Mobile automation", "Workflow automation", "API integration"],
    href: "/services/automation",
  },
  {
    icon: Database,
    title: "Scraping",
    description: "Data extraction and enrichment at scale",
    features: ["Custom scrapers", "Data cleaning", "Stealth & proxies", "Real-time feeds"],
    href: "/services/scraping",
  },
  {
    icon: Code,
    title: "Full Stack Development",
    description: "Frontend, backend, and infrastructure builds",
    features: ["Web apps", "APIs & integrations", "Cloud & DevOps", "Performance & security"],
    href: "/services/full-stack",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description: "Agents, copilots, and ML pipelines tailored to you",
    features: ["Custom AI agents", "RAG & embeddings", "Copilot UX", "Model integration"],
    href: "/services/ai-solutions",
  },
  {
    icon: Rocket,
    title: "SAAS MVP",
    description: "Launch-ready SaaS builds delivered fast",
    features: ["Product scoping", "MVP delivery", "Billing & auth", "Analytics & ops"],
    href: "/services/saas-mvp",
  },
];

const AllServices = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="All Services - Automation, Scraping, Full Stack Development & AI Solutions | BitBash"
        description="Explore everything we offer — from automation and scraping to full-stack builds, AI solutions, and launch-ready SaaS MVPs. Get a scoped plan in 24 hours."
        canonical="/services"
      />
      <Navigation />

      <section className="relative min-h-[clamp(220px,42vh,340px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
            <div className="space-responsive-sm">
              <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans px-2 sm:px-0">
                All Services
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-muted-foreground mx-auto text-center max-w-[820px] leading-relaxed px-4 sm:px-0">
                Explore everything we offer — from automation and scraping to full-stack builds, AI solutions, and launch-ready SaaS MVPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="group p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover-mobile h-full flex flex-col overflow-hidden border border-gray-200 bg-white hover:border-purple-200"
              >
                <Link to={service.href} className="block h-full flex flex-col">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 mb-4 group-hover:from-purple-200 group-hover:to-purple-100 transition-colors">
                      <service.icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="space-y-2.5 mt-auto pt-4 border-t border-gray-100">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 text-sm sm:text-base text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0"></div>
                        <span className="leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              </Card>
            ))}
            <Card
              className="p-6 sm:p-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/50 hover:shadow-xl transition-all duration-300 hover-mobile flex flex-col gap-6 h-full hover:border-purple-300"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Start Today</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Tell us what you want to build or automate. We'll scope it fast and get your project moving.
                  </p>
                </div>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="leading-relaxed">Get a scoped plan in 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="leading-relaxed">Dedicated PM + engineers on day one</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Showcase limit={9} />
      <Footer isHomepage={false} />
    </div>
  );
};

export default AllServices;

