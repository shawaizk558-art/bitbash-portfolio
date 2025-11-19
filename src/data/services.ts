import { Bot, Code, Database, Zap, BarChart3 } from "@/lib/icons";

export type ServiceIcon = typeof Code;

export interface ServiceOffering {
  slug: string;
  name: string;
  label: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  icon: ServiceIcon;
  deliverables: string[];
  startingPrice: number;
  priceCurrency: string;
  typicalDurationWeeks: string;
  ctaLabel: string;
  ctaHref: string;
}

export const coreServices: ServiceOffering[] = [
  {
    slug: "full-stack-development",
    name: "Full-Stack Development",
    label: "Web & Mobile Apps",
    category: "Product Engineering",
    summary: "Full stack development covers both front-end and back-end technologies.",
    description: "Complete product teams that deliver modern web & mobile apps, APIs, and cloud deployments.",
    image: "/fullstack1.png",
    icon: Code,
    deliverables: [
      "UX/UI, frontend, and backend development",
      "API & database engineering",
      "Cloud deployment with CI/CD"
    ],
    startingPrice: 12000,
    priceCurrency: "USD",
    typicalDurationWeeks: "4-12",
    ctaLabel: "View Development Services →",
    ctaHref: "/development-services"
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    label: "Machine Learning",
    category: "Applied AI",
    summary: "Custom AI models and machine learning solutions for your business.",
    description: "Predictive analytics, NLP, and intelligent assistants that plug into your workflows.",
    image: "/aisolutions2.png",
    icon: Bot,
    deliverables: [
      "Model design & fine-tuning",
      "Data pipelines & analytics",
      "LLM-powered copilots and chatbots"
    ],
    startingPrice: 15000,
    priceCurrency: "USD",
    typicalDurationWeeks: "6-14",
    ctaLabel: "Explore AI Solutions →",
    ctaHref: "/automation-services"
  },
  {
    slug: "automation-system",
    name: "Automation System",
    label: "Process Automation",
    category: "Automation Engineering",
    summary: "Intelligent automation systems that streamline your workflows.",
    description: "Browser, desktop, and workflow automation that eliminate repetitive tasks with governance built-in.",
    image: "/automation3.png",
    icon: Zap,
    deliverables: [
      "Browser automation & RPA scripts",
      "Task scheduling & alerting",
      "Security hardening & monitoring"
    ],
    startingPrice: 8000,
    priceCurrency: "USD",
    typicalDurationWeeks: "3-10",
    ctaLabel: "Explore Automation →",
    ctaHref: "/automation-services"
  },
  {
    slug: "data-scraping",
    name: "Data Scraping",
    label: "Data Extraction",
    category: "Data Engineering",
    summary: "Automated data collection from any source.",
    description: "Stealth scraping infrastructure with rotating proxies, anti-bot bypass, and clean delivery formats.",
    image: "/webscraping4.png",
    icon: Database,
    deliverables: [
      "Custom scrapers & crawlers",
      "Stealth proxy networks",
      "Data delivery APIs & files"
    ],
    startingPrice: 6000,
    priceCurrency: "USD",
    typicalDurationWeeks: "2-8",
    ctaLabel: "Learn More →",
    ctaHref: "/automation-services"
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS & MVP Development",
    label: "Analytics & Insights",
    category: "Product Acceleration",
    summary: "Launch-ready SaaS products and MVPs built for scale.",
    description: "Rapid prototyping and launch support for early-stage SaaS, analytics dashboards, and internal tools.",
    image: "/dataanalytics5.png",
    icon: BarChart3,
    deliverables: [
      "Product discovery & UX sprints",
      "MVP build with analytics",
      "Post-launch monitoring"
    ],
    startingPrice: 10000,
    priceCurrency: "USD",
    typicalDurationWeeks: "4-10",
    ctaLabel: "View SaaS Solutions →",
    ctaHref: "/development-services"
  }
];

