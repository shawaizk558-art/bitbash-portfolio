import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const bullets = [
  "Browser automation with stealth and anti-bot tactics",
  "Mobile automation and testing (iOS/Android)",
  "Workflow automation and API integration",
  "Monitoring, alerts, and reliability baked in",
];

const automationCategories = [
  {
    title: "AI & LLM Automation",
    description: "AI pipelines, LLM workflows,\nevaluation, and AI-driven logic.",
    items: [
      "Evaluation of an AI Solution",
      "Real-Time Voice Streaming Upgrade (LLM + TTS)",
      "Automated Meeting Transcription & Notes",
      "LLM Pipeline Engineer (multi-step reasoning)",
      "BotPress AI Chatbot Developer",
      "AI Module Architecture & Integration",
      "Automated Daily Au Pair Schedule (OpenAI + Google Calendar)",
    ],
  },
  {
    title: "Chatbot & Messaging Automation",
    description: "Bots that interact with users,\nschedule actions, or retrieve data.",
    items: [
      "Appointment Booking Bot Developer",
      "WhatsApp Bot for Membership Tracking",
      "Discord Bot for Ticket Availability",
      "Telegram Arbitrage Signal Bot (manual execution)",
      "Slack Bot for Internal Alerts & Summaries",
      "SMS / Email Reminder Bots",
    ],
  },
  {
    title: "Web Scraping & Data Extraction",
    description: "Scrapers, crawlers, and collectors\nwith cleaning and delivery.",
    items: [
      "Product Research Data Collection",
      "Zillow Status-Filtered Scraper",
      "Laptop Data Scraping",
      "Real Estate Monitoring & Change Detection",
      "Camper Van Listing Scraper",
      "Profile Extraction (143k profiles)",
      "Bank Statement Extraction for ERP",
      "LLC Ownership Identification Tool",
      "Google Maps / Price Scrapers",
    ],
  },
  {
    title: "Browser Automation / Bot Development",
    description: "Human-like bots that navigate, fill, and execute tasks.",
    items: [
      "Appointment Booking Bot (Playwright/Puppeteer/Selenium)",
      "Fast Item Purchase Bot",
      "NinjaTrader Indicator Automation",
      "Arbitrage Alert Bots (DEX monitoring, no auto-trade)",
      "WooCommerce / Shopify bot mitigation & hardening",
      "Browser QA / Form Filling Bots",
    ],
  },
  {
    title: "Trading Bots & Market Automation",
    description: "Stocks, forex, futures, or strategy automation.",
    items: [
      "Python Excel Trading Bot (Zerodha/Angel/Fyers)",
      "NinjaTrader Scalping Strategy",
      "Forex Auto Trading Bot",
      "MT5 EA Mods (spread, risk, news filters)",
      "Market Data Visualization + API Integration",
      "Sports Betting Data Pipelines",
    ],
  },
  {
    title: "Workflow Automation & Integration",
    description: "API-first, SaaS, and Zapier-based process automation.",
    items: [
      "Invoice Parsing + Xero Integration",
      "Teamwork → ChatGPT Monthly Reports",
      "Jobber + QuickBooks + Google Sheets (Zapier)",
      "Stripe + HubSpot + Skool + Zapier",
      "SmartSuite + Google Workspace + Gemini AI",
      "Tenant Enrollment/Unenrollment Scripts",
      "Dynamic HubSpot Pages via HubDB + Zapier",
      "Employee Task Automation & Integrations",
    ],
  },
  {
    title: "Data Processing & Normalization",
    description: "Transforming, cleaning, and structuring data for use.",
    items: [
      "Database Cleanup & Conversion Automation",
      "Parsing, Normalization & Diff Engines",
      "Spreadsheet Rebuilds with Search & Extraction",
      "PDF/CSV Normalization & Structuring",
      "Entity Deduplication & Matching",
      "Data QA & Validation Pipelines",
    ],
  },
  {
    title: "API Integration & Scripting",
    description: "Scripted automations and API hookups.",
    items: [
      "eBird Monitoring Script Install",
      "Real Estate Data → Sheets/DB",
      "REST API Fetching + Recursive Parsing",
      "Any script-based automation that needs wiring",
      "Webhook Listeners & Transformers",
      "Scheduled ETL / Cron Jobs",
    ],
  },
  {
    title: "E-commerce & Website Automation",
    description: "Storefront automation, scraping, and security hardening.",
    items: [
      "WooCommerce Security (bot blocking)",
      "Shopify Cloudflare Firewall Setup",
      "Frontend Extraction / Cloning workflows",
      "Price Monitoring with Alerts",
      "Inventory Sync & Catalog Automation",
      "Checkout Flow QA / Bot Monitoring",
    ],
  },
];

const ServiceAutomation = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans">
              Automation Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto text-center max-w-[780px] leading-relaxed">
              Browser, mobile, and workflow automation built with stealth, reliability, and scale.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container-responsive">
          <ServiceCtaCard
            title="Automation + AI Ops"
            description="Bespoke automation built with stealth, monitoring, and reliability so your workflows stay online."
            priceLabel="Custom scope"
            bullets={[
              "Stealth browser and mobile automation",
              "Workflow automation with retries and alerts",
              "API orchestration and data delivery",
              "Fast kickoff: scoped plan in 24 hours",
            ]}
          />
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">What we build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {automationCategories.map((category) => (
              <Card key={category.title} className="p-5 sm:p-6 space-y-3 border border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 whitespace-nowrap">{category.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 mt-1 whitespace-pre-line">{category.description}</p>
                </div>
                <div className="space-y-2">
                  {(expanded[category.title] ? category.items : category.items.slice(0, 6)).map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-800">
                      <CheckCircle className="w-4.5 h-4.5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {category.items.length > 6 && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(category.title)}
                    className="text-sm font-semibold text-purple-700 hover:text-purple-800"
                  >
                    {expanded[category.title] ? "Show less" : `See more (${category.items.length - 6})`}
                  </button>
                )}
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
              We ship automation that survives real-world friction: anti-bot walls, shifting layouts, and scale. From capture to delivery, we harden every step.
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
              Selenium, Playwright, Puppeteer, Appium, FastAPI/Node, proxy management, resilient schedulers, and observability by default.
            </p>
            <p className="text-base text-gray-700">
              We design for maintainability—config-driven, modular flows, retries, circuit breakers, and structured logging so you can operate with confidence.
            </p>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceAutomation;

