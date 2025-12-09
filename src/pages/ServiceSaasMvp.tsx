import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const bullets = [
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

const ServiceSaasMvp = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans">
              SAAS MVP
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto text-center max-w-[780px] leading-relaxed">
              Launch-ready SaaS builds delivered quickly with billing, auth, and ops in place.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container-responsive">
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

      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">What we build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {saasCategories.map((category) => (
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
              We get you to market fast with a solid foundation—auth, billing, roles, analytics, and support tools included.
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
              Modern web stacks (React/Next), API + DB layers, payment integrations (Stripe), auth, and deployment pipelines ready to scale.
            </p>
            <p className="text-base text-gray-700">
              We prioritize maintainability—clean architecture, tests where it counts, and clear handoff so you can grow post-launch.
            </p>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceSaasMvp;

