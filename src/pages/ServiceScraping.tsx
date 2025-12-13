import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";
import { SEO } from "@/components/SEO";

const bullets = [
  "Custom scrapers with stealth (headers, fingerprints, proxies)",
  "Data cleaning, normalization, and enrichment pipelines",
  "Real-time feeds, alerts, and retries with observability",
  "Export to APIs, DBs, files, or your data warehouse",
];

const scrapingCategories = [
  {
    title: "Web Scraping & Data Extraction",
    description: "Scrapers, crawlers, and data collectors of any kind.",
    items: [
      "Data Collection Specialist for Product Research",
      "Zillow Status-Filtered Scraper (Apify)",
      "Web Scraping for Laptop Data",
      "Automated Real Estate Data Monitoring & Change Detection",
      "Camper Van Listing Scraper",
      "Data Scraper / Web Research Analyst",
      "Large-Scale Profile Extraction (143k profiles)",
      "Bank Statement Extraction for ERP",
      "Private Tool for LLC Ownership Identification",
      "Clone Website / Scrape Frontend",
      "App with Web Scraping Functionality",
      "Google Maps Scraper",
      "Price Scraper + Excel Output for E-commerce Owner",
      "Data Scraping Expert for Multi-Website Extraction",
    ],
  },
  {
    title: "Specialized Scraping Services",
    description: "Domain-specific scraping for e-commerce, social media, and more.",
    items: [
      "E-commerce product catalog extraction",
      "Social media profile and post scraping",
      "Job board and career site scraping",
      "News article and content aggregation",
      "Review and rating data collection",
      "Directory and listing site extraction",
      "Financial data and market information scraping",
    ],
  },
  {
    title: "Real-Time Monitoring & Change Detection",
    description: "Continuous monitoring, alerts, and change tracking systems.",
    items: [
      "Real-time price monitoring with instant alerts",
      "Website change detection and notification systems",
      "Competitor monitoring and tracking dashboards",
      "Inventory level monitoring and restock alerts",
      "Content change detection and diff reporting",
      "Automated monitoring dashboards with Slack/Email integration",
    ],
  },
  {
    title: "Stealth & Anti-Detection Scraping",
    description: "Advanced techniques to bypass bot detection and rate limits.",
    items: [
      "Rotating proxy management and IP rotation",
      "Browser fingerprint randomization",
      "CAPTCHA solving integration",
      "Rate limiting and request throttling",
      "Header rotation and user-agent management",
      "Session management and cookie handling",
      "Residential proxy integration",
    ],
  },
  {
    title: "Data Delivery & Export Formats",
    description: "Structured data delivery in multiple formats and destinations.",
    items: [
      "CSV, JSON, Excel, and XML export pipelines",
      "Direct database insertion and updates",
      "API endpoint delivery and webhook integration",
      "Google Sheets and Airtable synchronization",
      "S3, Google Cloud Storage, and Azure blob exports",
      "Real-time streaming data feeds",
      "Scheduled batch exports and deliveries",
    ],
  },
  {
    title: "Data Processing, Cleanup & Normalization",
    description: "Transforming, cleaning, or structuring data for use.",
    items: [
      "Database Cleanup & Conversion Automation",
      "Senior Engineer for Parsing, Normalization & Diff Engine",
      "Spreadsheet Rebuild with Search & Data Extraction Logic",
    ],
  },
];

const cardKey = (title: string, index: number) => `scraping-${index}-${title}`;

const ServiceScraping = () => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedMap((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  useEffect(() => {
    const openKeys = Object.keys(expandedMap).filter((k) => expandedMap[k]);
    if (openKeys.length > 0) {
      // eslint-disable-next-line no-console
      console.log("[ServiceScraping] expandedMap change", { openKeys, map: expandedMap });
    }
  }, [expandedMap]);
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Data Scraping Services - Custom Scrapers & Data Extraction | BitBash"
        description="Custom scrapers with stealth technology, data cleaning and normalization pipelines, real-time feeds and alerts. Export to APIs, databases, or your data warehouse."
        canonical="/services/scraping"
      />
      <Navigation />

      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Scraping Services
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              High-fidelity data extraction with stealth, cleaning, enrichment, and delivery built-in.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
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

      <section className="py-12 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we build</h2>
            <p className="text-base text-gray-700 max-w-2xl leading-[1.65]">
              The core scraping and data extraction services we deliver. Expand to see full coverage.
            </p>
          </div>
          <div className="columns-1 md:columns-2 gap-6 sm:gap-7 [column-fill:_balance]">
            {scrapingCategories.map((category, index) => {
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
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-[1.6]">
                        {category.description.replace(/\n/g, " ")}
                      </p>
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
            {scrapingCategories.length % 2 === 0 && (
              <div className="break-inside-avoid-column mb-6 sm:mb-7" aria-hidden="true" />
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-7 sm:gap-10">
          <Card className="p-6 sm:p-8 space-y-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we deliver</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-[1.65] max-w-2xl">
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

          <Card className="p-6 sm:p-8 space-y-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tech & approach</h3>
            <p className="text-base text-gray-700 leading-[1.65] max-w-[620px]">
              Playwright, Selenium, Scrapy, FastAPI/Node, proxy orchestration, schedulers, and pipelines with retries, backoff, and monitoring.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Versioned selectors",
                "Schema-first outputs",
                "Logging/metrics",
                "Alerts",
                "Retries/backoff",
                "Stealth/headless",
              ].map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800"
                >
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
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

export default ServiceScraping;
