import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ContactButton } from "@/components/ContactButton";
import { Clock, Users } from "@/lib/icons";
import { HeroBackground } from "@/components/HeroBackground";
import { Zap, Database, Code, Bot, Rocket } from "@/lib/icons";

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

      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="p-0 hover:shadow-lg transition-shadow hover-mobile h-full flex flex-col overflow-hidden"
              >
                <Link to={service.href} className="block h-full p-7 sm:p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <service.icon className="w-11 h-11 text-purple-600" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-base text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 mt-auto">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-base text-gray-700">
                        <span className="text-purple-600 leading-none pt-1 inline-block">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              </Card>
            ))}
            <Card
              className="p-7 sm:p-8 border border-purple-100 bg-gradient-to-br from-purple-100 via-white to-white hover:shadow-lg transition-shadow hover-mobile flex flex-col gap-5 h-full"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">Start Today</h3>
                <p className="text-base text-gray-700">
                  Tell us what you want to build or automate. We’ll scope it fast and get your project moving.
                </p>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start gap-2 text-base text-gray-700">
                    <Clock className="w-4.5 h-4.5 text-purple-600 mt-0.5" />
                    <span>Get a scoped plan in 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2 text-base text-gray-700">
                    <Users className="w-4.5 h-4.5 text-purple-600 mt-0.5" />
                    <span>Dedicated PM + engineers on day one</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <Link to="/contact" className="inline-block">
                  <ContactButton
                    label="Contact us"
                    fullWidth={false}
                  />
                </Link>
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

