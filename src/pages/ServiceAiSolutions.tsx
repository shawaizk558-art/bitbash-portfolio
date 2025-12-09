import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "@/lib/icons";
import { ServiceCtaCard } from "@/components/ServiceCtaCard";

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

const ServiceAiSolutions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="relative min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex items-center justify-center overflow-hidden pt-14">
        <HeroBackground />
        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans">
              AI Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mx-auto text-center max-w-[780px] leading-relaxed">
              Agents, copilots, and ML pipelines designed for your data and workflows—built with safety and observability.
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 md:py-10 bg-white">
        <div className="container-responsive">
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

      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="container-responsive">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">What we build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {aiCategories.map((category) => (
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
              We build AI that ships: agents and copilots with retrieval, tools, and guardrails that fit your stack and compliance needs.
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
              LangChain/LangGraph, vector stores, function calling, tool use, evals, monitoring, and secure deployments.
            </p>
            <p className="text-base text-gray-700">
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

