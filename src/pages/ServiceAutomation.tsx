import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

const headlineBullets = [
  "Stealth browser and mobile automation",
  "Workflow automation with retries and alerts",
  "API orchestration and data delivery",
  "Fast kickoff: scoped plan in 24 hours",
];

const automationCategories = [
  {
    title: "AI & LLM Automation",
    description: "Projects involving AI pipelines, AI evaluation, LLM workflows, or AI-driven logic.",
    items: [
      "Evaluation of an AI Solution",
      "Real-Time Voice Streaming Upgrade (LLM + TTS automation)",
      "App for Automated Meeting Transcription & Note Generation",
      "LLM Pipeline Engineer (multi-step reasoning workflow)",
      "BotPress AI Chatbot Developer",
      "AI Specialist for Custom Module Architecture & Integration",
      "Build Automated Daily Au Pair Schedule Generator (OpenAI + Google Calendar)",
    ],
  },
  {
    title: "Chatbot & Messaging Automation",
    description: "Bots that interact with users, schedule actions, or retrieve data.",
    items: [
      "Appointment Booking Bot Developer",
      "WhatsApp Bot for Membership Tracking & Reimbursement",
      "Discord Bot for Ticket Availability Tracking",
      "Telegram Arbitrage Signal Bot (manual execution only)",
    ],
  },
  {
    title: "Browser Automation / Bot Development",
    description: "Bots that mimic human interaction, perform tasks, or run automated flows.",
    items: [
      "Appointment Booking Bot (Playwright/Puppeteer/Selenium)",
      "Fast Item Purchase Bot",
      "NinjaTrader Indicator Automation / Strategy Work",
      "Forex Arbitrage Alert Bot (DEX monitoring, no auto-trade)",
      "Bot to Detect Arbitrage Spreads (DEX monitoring)",
      "WooCommerce Fake-Order Bot Protection",
      "Shopify Bot Traffic Mitigation / Cloudflare Hardening",
    ],
  },
  {
    title: "Trading Bots & Market Automation",
    description: "Any system involving stocks, forex, futures, or automated strategies.",
    items: [
      "Python-Based Stock Market Excel Trading Bot (Zerodha/Angel/Fyers)",
      "NinjaTrader Scalping Strategy Development",
      "Forex Auto Trading Bot Developer",
      "MT5 EA Modification (Spread Filter, Risk %, News Filter)",
      "Stock Market Data Visualization + API Integration",
      "Sports Betting Data Pipeline (SportsDataIO ML system)",
    ],
  },
  {
    title: "Workflow Automation & Systems Integration",
    description: "Process automation using APIs, Zapier, SaaS tools, or custom scripts.",
    items: [
      "Invoice Document Parsing + Xero Integration",
      "Teamwork → ChatGPT Monthly Report Automation",
      "Jobber + QuickBooks + Google Sheets (Zapier)",
      "Stripe + HubSpot + Skool + Zapier Automation",
      "Go High Level → Google Sheets Automation",
      "SmartSuite + Google Workspace + Gemini AI Integration",
      "Automated Tenant Enrollment/Unenrollment Script (API-based)",
      "Create Dynamic HubSpot Pages via HubDB + Zapier",
      "Employee Task List System (task automation & integrations)",
    ],
  },
  {
    title: "API Integration & Scripting",
    description: "Focused primarily on API setup, installation, or script configuration.",
    items: [
      "Python Script Installation for eBird Monitoring",
      "Real Estate Data Monitoring Output to Google Sheets or DB",
      "REST API Data Fetching + Recursive Parsing Project",
      "Any smaller script-based automation that doesn't fit other buckets",
    ],
  },
];

const cardKey = (title: string, index: number) => `automation-${index}-${title}`;

const ServiceAutomation = () => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedMap((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Debug: track toggle action, previous state, next state
      // eslint-disable-next-line no-console
      console.log("[ServiceAutomation] toggleExpand", {
        key,
        wasOpen: !!prev[key],
        nowOpen: !!next[key],
        openKeysNext: Object.keys(next).filter((k) => next[k]),
        openCountNext: Object.values(next).filter(Boolean).length,
      });
      return next;
    });
  };

  // Log whenever expansion state changes to trace unexpected coupling
  useEffect(() => {
    const openKeys = Object.keys(expandedMap).filter((k) => expandedMap[k]);
    if (openKeys.length > 0) {
      // eslint-disable-next-line no-console
      console.log("[ServiceAutomation] expandedMap change", { openKeys, map: expandedMap });
    }
  }, [expandedMap]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Automation Services
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Browser, mobile, and workflow automation built with stealth, reliability, and scale.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <ServiceCtaCard
            title="Automation + AI Ops"
            description="Bespoke automation with stealth, monitoring, and reliability so your workflows stay online."
            priceLabel="Custom scope"
            bullets={headlineBullets}
          />
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we build</h2>
            <p className="text-base text-gray-700 max-w-2xl leading-[1.65]">
              The core automation stacks we deliver. Expand to see full coverage.
            </p>
          </div>
          <div className="columns-1 md:columns-2 gap-6 sm:gap-7 [column-fill:_balance]">
            {automationCategories.map((category, index) => {
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
            {automationCategories.length % 2 === 0 && (
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
              We ship automation that survives real-world friction: anti-bot walls, shifting layouts, and scale. From capture to delivery, we harden every step.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {headlineBullets.map((item) => (
                <div key={item} className="flex items-start gap-2 text-base text-gray-800">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 space-y-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tech & approach</h3>
            <p className="text-base text-gray-700 leading-[1.65] max-w-[620px]">
              Selenium, Playwright, Puppeteer, Appium, FastAPI/Node, proxy management, resilient schedulers, and observability by default.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Config-driven", "Retries/backoff", "Structured logging", "Circuit breakers", "Alerts/metrics"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-800"
                  >
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    {chip}
                  </span>
                ),
              )}
            </div>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceAutomation;

