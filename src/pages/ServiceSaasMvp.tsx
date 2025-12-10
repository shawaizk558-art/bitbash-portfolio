import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const headlineBullets = [
  "Rapid scoping, user flows, and UX to ship fast",
  "Auth, billing, subscriptions, and roles baked in",
  "Analytics, email, notifications, and support tooling",
  "Staging, CI/CD, and a clean handoff with docs",
];

const saasCategories = [
  {
    title: "Product & Workflow Systems",
    items: [
      "Founder’s assistant + operations support",
      "Product manager & workflow automation",
      "Project planning and admin tooling",
    ],
  },
  {
    title: "AI-Powered Apps",
    items: [
      "Astrology + AI chat app",
      "AI insight engine (InsightWise-style)",
      "RAG/agentic AI systems",
      "Liveness detection AI MVP",
    ],
  },
  {
    title: "SaaS Infrastructure & Core Platforms",
    items: [
      "Full-stack billing + user management",
      "Stripe subscription integration",
      "Multi-tenant business tools",
      "Deep parsing & diff engine",
      "Aviation cost management",
      "Real-time convenience store OS cleanup",
    ],
  },
  {
    title: "Marketing, Funnels & Growth",
    items: [
      "B2B lead-gen campaigns",
      "Growth marketing & paid acquisition",
      "Landing page funnel building",
    ],
  },
  {
    title: "Design & Interface",
    items: [
      "SVG icon set for SaaS",
      "Web design & responsive pages",
      "UI/UX dashboard builds",
      "Conversational learning platform UX",
      "Fintech MVP design",
    ],
  },
  {
    title: "Mobile & On-Demand Services",
    items: [
      "Farm-matching mobile app",
      "Local service marketplace app",
      "On-demand maintenance app (Saudi Fix)",
      "Safety app with BLE panic button",
    ],
  },
  {
    title: "E-commerce & Marketplace Systems",
    items: [
      "Mystery box trading platform",
      "Custom-service workshop marketplace",
      "Charter & marina management SaaS",
    ],
  },
  {
    title: "Developer-Focused & High-Performance Tools",
    items: [
      "High-performance data grid (TanStack)",
      "Specialized calculation engine MVP",
      "Next.js + Nest.js SaaS architecture lead",
    ],
  },
  {
    title: "No-Code MVPs",
    items: [
      "Meal-planning app with Softr + Airtable",
    ],
  },
  {
    title: "AI-Integrated SaaS Products",
    items: [
      "Vertex-powered design generator",
      "AI-enhanced CRM/operations tools",
    ],
  },
];

const cardKey = (title: string, index: number) => `saas-${index}-${title}`;

const ServiceSaasMvp = () => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedMap((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              SAAS MVP
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Launch-ready SaaS builds delivered quickly with billing, auth, and ops in place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <ServiceCtaCard
            title="SaaS MVP in Weeks"
            description="Launch-ready SaaS with auth, billing, analytics, and ops set up from day one."
            priceLabel="Custom scope"
            bullets={[
              "Rapid scoping, UX, and product delivery",
              "Auth, billing, subscriptions, and roles included",
              "Analytics, emails, notifications, and support tools",
              "CI/CD, staging, and clean handoff",
            ]}
          />
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we build</h2>
            <p className="text-base text-gray-700 max-w-2xl">
              Core SaaS patterns we deliver fast. Expand to see the full list.
            </p>
          </div>
          <div className="columns-1 md:columns-2 gap-6 sm:gap-7 [column-fill:_balance]">
            {saasCategories.map((category, index) => {
              const key = cardKey(category.title, index);
              const isExpanded = !!expandedMap[key];
              const items = isExpanded ? category.items : category.items.slice(0, 3);
              const hiddenCount = Math.max(0, category.items.length - 3);
              return (
                <div key={key} className="break-inside-avoid-column mb-6 sm:mb-7">
                  <Card className="p-5 sm:p-7 space-y-3 border border-gray-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(15,23,42,0.28)]">
                    <div className="space-y-1.5">
                      <h3 className="text-[19px] sm:text-xl font-semibold text-gray-900 tracking-tight">
                        {category.title}
                      </h3>
                      <div className="h-1 w-12 rounded-full bg-purple-200" />
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-[15px] sm:text-base text-gray-800 leading-[1.55]"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300/90" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    {hiddenCount > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(key)}
                        className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-800 px-3 py-1.5 rounded-full border border-purple-100 hover:border-purple-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        {isExpanded ? "Show less" : `See more (${hiddenCount})`}
                      </button>
                    )}
                  </Card>
                </div>
              );
            })}
            {saasCategories.length % 2 === 0 && (
              <div className="break-inside-avoid-column mb-6 sm:mb-7" aria-hidden="true" />
            )}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10">
          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we deliver</h2>
            <p className="text-base sm:text-lg text-gray-700">
              We get you to market fast with a solid foundation—auth, billing, roles, analytics, and support tools included.
            </p>
            <div className="space-y-3">
              {headlineBullets.map((item) => (
                <div key={item} className="flex items-start gap-3 text-base text-gray-800">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tech & approach</h3>
            <p className="text-base text-gray-700">
              Modern web stacks (React/Next), API + DB layers, payment integrations (Stripe), auth, and deployment pipelines ready to scale.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Stripe billing", "Auth/roles", "CI/CD", "Analytics", "Support tooling"].map((chip) => (
                <span key={chip} className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800">
                  {chip}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceSaasMvp;

