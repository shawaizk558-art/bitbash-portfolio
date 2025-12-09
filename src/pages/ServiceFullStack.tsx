import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const bullets = [
  "Product discovery, UX, and architecture design",
  "Frontend + backend + infra shipped together",
  "APIs, auth, billing, analytics, observability",
  "CI/CD, staging, and handoff with documentation",
];

const fullStackCategories = [
  {
    title: "Blockchain & Web3",
    items: [
      "Blockchain-focused builds",
      "NFT and DeFi platforms",
      "Smart contract development",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "AI-powered web apps",
      "Data parsing & normalization tools",
      "Voice/LLM streaming upgrades",
      "AI-assisted SaaS systems",
      "n8n workflow automation",
      "AI-integrated dashboards",
    ],
  },
  {
    title: "SaaS Platforms",
    items: [
      "Subscription billing systems",
      "Multi-tenant admin dashboards",
      "Licensing & inspection portals",
      "Internal tools and backend-heavy apps",
      "Rebuilds of existing SaaS codebases",
    ],
  },
  {
    title: "E-Commerce & Marketplace",
    items: [
      "Mystery box e-commerce setups",
      "Ride-hailing platforms",
      "Two-sided service marketplaces",
      "Bitcoin/crypto purchase systems",
    ],
  },
  {
    title: "Web Apps & Custom Tools",
    items: [
      "Assessment and form logic tools",
      "Engineering calculators & generators",
      "Real-time video/web player apps",
      "Website integrations (DNS, CRM, automation)",
      "Specialized business websites",
    ],
  },
  {
    title: "Mobile App Development",
    items: [
      "Consumer/driver mobile apps",
      "Delivery/ordering backend integrations",
      "Loyalty program apps",
      "Scanner-based mobile tools",
    ],
  },
  {
    title: "API Integrations",
    items: [
      "Messaging APIs (WhatsApp, SMS, etc.)",
      "Payment integrations (Stripe, POS systems)",
      "WordPress plugin API work",
      "Social media API connections",
      "External service sync layers",
    ],
  },
  {
    title: "Frontend Engineering",
    items: [
      "React/Next.js dashboards",
      "Angular/React UI builds",
      "High-performance data grids (Vue/TanStack)",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Deployment and CI/CD setup",
      "Device-to-cloud data pipelines",
      "Cloud-hosted backend services",
    ],
  },
];

const ServiceFullStack = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans">
              Full Stack Development
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto text-center max-w-[780px] leading-relaxed">
              End-to-end product builds—frontend, backend, infra, and DevOps delivered as one.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container-responsive">
          <ServiceCtaCard
            title="Full Stack Delivery"
            description="Frontend, backend, and infra delivered together—fast, reliable, and production-ready."
            priceLabel="Custom scope"
            bullets={[
              "Product scoping, UX, and architecture",
              "Frontend + backend + infra in one team",
              "Auth, billing, analytics, and observability",
              "Staging, CI/CD, and documented handoff",
            ]}
          />
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">What we build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {fullStackCategories.map((category) => (
              <Card key={category.title} className="p-5 sm:p-6 space-y-3 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-800">
                      <CheckCircle className="w-4.5 h-4.5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="container-responsive grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10">
          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we deliver</h2>
            <p className="text-base sm:text-lg text-gray-700">
              We ship full products, not just code. UX, APIs, infra, auth, billing, analytics, and reliability come baked in.
            </p>
            <div className="space-y-3">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-3 text-base text-gray-800">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tech & approach</h3>
            <p className="text-base text-gray-700">
              React/Next, Node/FastAPI, PostgreSQL, Redis, cloud (AWS/GCP), CI/CD, IaC, and security best practices.
            </p>
            <p className="text-base text-gray-700">
              We favor modular, testable architectures, clear APIs, and strong observability so you can operate and scale confidently.
            </p>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceFullStack;

