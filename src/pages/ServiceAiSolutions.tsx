import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";
import { SEO } from "@/components/SEO";

const bullets = [
  "Custom AI agents and copilots tailored to your workflows",
  "RAG pipelines, embeddings, and retrieval tuned for your data",
  "Model integration (OpenAI, Anthropic, open source) with guardrails",
  "Evaluation, monitoring, and prompt/version management",
];

const aiCategories = [
  {
    title: "AI Evaluation & Audits",
    items: ["HCAI assessments", "System review", "Ethical/fairness checks"],
  },
  {
    title: "AI-Powered Web & App Experiences",
    items: ["Astrology apps", "Personalized guidance", "User profiling"],
  },
  {
    title: "ChatGPT / LLM Integrations",
    items: ["Chat interfaces", "Knowledge-based assistants", "Business tool connections"],
  },
  {
    title: "LLM Engineering & Pipeline Design",
    items: ["Multi-step workflows", "RAG pipelines", "Model orchestration"],
  },
  {
    title: "AI SaaS Development",
    items: ["Full-stack MVPs", "Stripe billing", "User systems"],
  },
  {
    title: "AI Voice & IVR Systems",
    items: ["Retell AI builds", "Voice agents", "Call routing"],
  },
  {
    title: "Agentic Workflows",
    items: ["Multi-agent logic", "Task automation", "Decision pipelines"],
  },
  {
    title: "Automation & Workflow Engineering",
    items: ["Zapier/Make/n8n", "CRM sync", "Process automation"],
  },
  {
    title: "Teamwork / Software Integrations",
    items: ["Report automation", "Data sync", "Cross-tool workflows"],
  },
  {
    title: "Generative AI Apps",
    items: ["Social media automation", "Content generation", "Insight extraction"],
  },
  {
    title: "Custom-Trained Assistants",
    items: ["Course-based AI coaches", "Private knowledge models", "Style-consistent guidance"],
  },
  {
    title: "Memory-Enhanced LLM Systems",
    items: ["Multi-agent memory", "Long-context workflows", "Knowledge retention"],
  },
  {
    title: "AI Debugging & Optimization",
    items: ["Prompt tuning", "Schema fixes", "Failed workflow repair"],
  },
  {
    title: "Smart Consumer Product AI",
    items: ["Sensor integration", "Adaptive hardware", "ML-enabled devices"],
  },
  {
    title: "AI Security & Verification",
    items: ["Liveness checks", "Identity validation", "Cybersecurity data capture"],
  },
  {
    title: "AI Concierge & Agent Platforms",
    items: ["Enterprise assistants", "AI for operations", "Real-estate workflow automation"],
  },
  {
    title: "AI Image & Video Generation",
    items: ["Realistic photography", "UGC video workflows", "Sora/ElevenLabs pipelines"],
  },
  {
    title: "Conversational Bots & Virtual Staff",
    items: ["AI receptionists", "Appointment handling", "FAQ responders"],
  },
  {
    title: "LLM + Google Drive / Gemini Integrations",
    items: ["Custom connectors", "Document-aware AI", "Enterprise knowledge access"],
  },
  {
    title: "Backend Systems with AI Logic",
    items: ["World-data generation", "Update validation", "Lightweight agent backends"],
  },
  {
    title: "AI Architecture Consulting",
    items: ["System review", "Risk analysis", "Scalability planning"],
  },
  {
    title: "RAG & Agentic Content Engines",
    items: ["Image/video pipelines", "Complex variable handling", "Marketing asset generation"],
  },
  {
    title: "Audio AI & Voice Transformation",
    items: ["Cover-song APIs", "Style transfer", "Webhooks"],
  },
  {
    title: "BotPress AI Development",
    items: ["Data lookup bots", "Secure chat systems", "MySQL integrations"],
  },
  {
    title: "Insight & Research AI Tools",
    items: ["Document upload", "Auto-insights", "Data chat"],
  },
  {
    title: "Clinical Decision AI",
    items: ["Structured medical outputs", "Safety filters", "LLM validation"],
  },
  {
    title: "Computer Vision & Real-Time AI",
    items: ["Screen detection", "Low-latency processing", "Best-move prediction"],
  },
  {
    title: "AI Coaching & Guidance Apps",
    items: ["Mobile coach bots", "Personalized routines", "Gamified learning"],
  },
  {
    title: "AI Prompt Engineering",
    items: ["Cybersecurity content", "Structured outputs", "Role-based prompts"],
  },
  {
    title: "Adaptive Learning Systems",
    items: ["Personalization engines", "ML-driven curriculum", "Student-specific insights"],
  },
  {
    title: "AI-Assisted Coding & Micro-SaaS",
    items: ["Rapid MVPs", "Next.js builds", "AI-boosted development"],
  },
  {
    title: "AI Marketing & Social Automations",
    items: ["Content scheduling", "Channel distribution", "Multi-platform flow"],
  },
  {
    title: "AI Image Prompt Crafting",
    items: ["Portrait/Photoshoot prompts", "Style replication", "Nano Banana expertise"],
  },
  {
    title: "AI Ops & Media Automation",
    items: ["CMS automation", "Content pipelines", "Multi-channel posting"],
  },
  {
    title: "Lead Capture & CRM Automation",
    items: ["Form ingestion", "Smart routing", "Follow-up logic"],
  },
];

const cardKey = (title: string, index: number) => `ai-${index}-${title}`;

const ServiceAiSolutions = () => {
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedMap((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI Solutions Services - Custom AI Agents & ML Pipelines | BitBash"
        description="Custom AI agents and copilots tailored to your workflows. RAG pipelines, embeddings, and retrieval tuned for your data. Model integration with guardrails."
        canonical="/services/ai-solutions"
      />
      <Navigation />

      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Solutions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Agents, copilots, and ML pipelines designed for your data and workflows—built with safety and observability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <ServiceCtaCard
            title="AI Solutions"
            description="Agents, copilots, and ML pipelines tailored to your data with guardrails, evals, and observability."
            priceLabel="Custom scope"
            bullets={[
              "Custom agents and copilots with tool use",
              "RAG pipelines, embeddings, and retrieval",
              "Guardrails, evals, and monitoring in place",
              "Deployments with prompt/version control",
            ]}
          />
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-screen-xl mx-auto px-4 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we build</h2>
            <p className="text-base text-gray-700 max-w-2xl leading-[1.65]">
              AI product patterns and workflows—from audits to agentic systems—built with guardrails.
            </p>
          </div>
          <div className="columns-1 md:columns-2 gap-6 sm:gap-7 [column-fill:_balance]">
            {aiCategories.map((category, index) => {
              const key = cardKey(category.title, index);
              const isExpanded = !!expandedMap[key];
              const items = isExpanded ? category.items : category.items.slice(0, 3);
              const hiddenCount = Math.max(0, category.items.length - 3);
              return (
                <div key={key} className="break-inside-avoid-column mb-6 sm:mb-7">
                  <Card className="p-5 sm:p-7 space-y-3 border border-gray-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(15,23,42,0.28)]">
                  <div className="space-y-1.5">
                    <h3 className="text-[19px] sm:text-xl font-semibold text-gray-900 tracking-tight">{category.title}</h3>
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
            {aiCategories.length % 2 === 0 && (
              <div className="break-inside-avoid-column mb-6 sm:mb-7" aria-hidden="true" />
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-7 sm:gap-10">
          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What we deliver</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-[1.65] max-w-2xl">
              We build AI that ships: agents and copilots with retrieval, tools, and guardrails that fit your stack and compliance needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bullets.map((item) => (
                <div key={item} className="flex items-start gap-2 text-base text-gray-800">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 space-y-4 sm:space-y-5 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-100/60 border border-purple-100 shadow-md overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Tech & approach</h3>
            <p className="text-base text-gray-700 leading-[1.65]">
              LangChain/LangGraph, vector stores, function calling, tool use, evals, monitoring, and secure deployments.
            </p>
            <p className="text-base text-gray-700 leading-[1.65]">
              We focus on reliability—prompt/version control, testing, telemetry, and fallback strategies so AI features stay stable in production.
            </p>
          </Card>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ServiceAiSolutions;

