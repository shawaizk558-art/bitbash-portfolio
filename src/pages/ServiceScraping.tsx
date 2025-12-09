import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const bullets = [
  "Custom scrapers with stealth (headers, fingerprints, proxies)",
  "Data cleaning, normalization, and enrichment pipelines",
  "Real-time feeds, alerts, and retries with observability",
  "Export to APIs, DBs, files, or your data warehouse",
];

const ServiceScraping = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans">
              Scraping Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto text-center max-w-[780px] leading-relaxed">
              High-fidelity data extraction with stealth, cleaning, enrichment, and delivery built-in.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container-responsive">
          <ServiceCtaCard
            title="Managed Scraping"
            description="High-fidelity data extraction with stealth, cleaning, enrichment, and delivery you can rely on."
            priceLabel="Custom scope"
            bullets={[
              "Stealth scrapers with rotating proxies",
              "Data cleaning, enrichment, and QA",
              "Real-time feeds, alerts, and retries",
              "Delivery to APIs, DBs, or warehouses",
            ]}
          />
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-14 bg-white">
        <div className="container-responsive grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10">
          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we deliver</h2>
            <p className="text-base sm:text-lg text-gray-700">
              We build scrapers that stay online: rotating proxies, headless/stealth modes, adaptive parsers, and structured outputs ready for analytics.
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
              Playwright, Selenium, Scrapy, FastAPI/Node, proxy orchestration, schedulers, and pipelines with retries, backoff, and monitoring.
            </p>
            <p className="text-base text-gray-700">
              We design for resilience and maintainability—versioned selectors, schema-first outputs, logging/metrics, and alerting to catch breakage fast.
            </p>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceScraping;
