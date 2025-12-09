export interface Project {
  slug: string;
  name: string;
  role: string;
  quote: string;
  description: string;
  technologies: string[];
  videoPlaceholder: "purple" | "blue" | "green" | "orange" | "pink" | "teal";
  youtubeVideoId?: string;
  rating: number;
  // Optional detailed content
  targetAudience?: string[];
  keyFeatures?: string[];
  architectureHighlights?: string[];
  // Optional sidebar details
  pricing?: string;
  timeline?: string;
  postDeliverySupport?: string;
  paymentMethods?: string;
  moreDetails?: string;
  developer?: string;
}

export const projects: Project[] = [
  {
    slug: "petla",
    name: "Petla",
    role: "Veterinarian Discovery Platform",
    quote: "BitBash built Petla, a comprehensive platform for finding veterinarians in Germany. Features include location-based search, interactive maps, advanced filtering by specialty and services, and real-time availability tracking.",
    description: "Petla is a comprehensive platform designed to help pet owners in Germany find the perfect veterinarian for their furry friends. The platform combines advanced search capabilities with interactive mapping technology to provide users with a seamless experience when looking for veterinary services.",
    technologies: ["React", "Node.js", "PostgreSQL", "Google Maps API", "TypeScript", "Express"],
    videoPlaceholder: "purple",
    youtubeVideoId: "T--1C-VUY9g",
    rating: 5
  },
  {
    slug: "scraper-glass",
    name: "Scraper Glass",
    role: "Data Extraction Platform",
    quote: "BitBash built Scraper Glass, a luxury-grade Instagram data extraction tool with unmatched speed and security. Features include no-code scraping, advanced filtering, and enterprise-level data export capabilities.",
    description: "Scraper Glass is a premium Instagram data extraction platform that enables businesses and researchers to collect valuable social media data efficiently. Built with enterprise-grade security and performance in mind, it offers no-code solutions for complex data extraction needs.",
    technologies: ["Python", "Selenium", "FastAPI", "React", "MongoDB", "Redis"],
    videoPlaceholder: "purple",
    youtubeVideoId: "gDeo6V3VIbY",
    rating: 5
  },
  {
    slug: "actuary-list",
    name: "Actuary List",
    role: "Automated Job Board for Actuaries",
    quote: "BitBash built Actuary List, a web application job board for actuaries that scrapes jobs and posts daily, all automated. Features login/signup, admin dashboards, and an email newsletter feature that sends personalized emails every week.",
    description: "Actuary List is a specialized job board platform connecting actuaries with career opportunities. An automated scraping engine continuously gathers new roles from partnered sources, enriches them with structured metadata, and posts them directly to the platform with the correct filters already applied. The system then routes each listing through the staging/production workflow for quality control before it goes live. The experience serves actuaries at all levels (trainee, part-qualified, qualified), actuarial technicians, and data scientists on actuarial teams. It also includes Google Jobs integration, SEO-optimized listings, job alerts via email, company profiles, and a comprehensive admin dashboard for job management.",
    technologies: ["Next.js", "React", "Python", "PostgreSQL", "Supabase", "Tailwind CSS", "Resend", "Vercel", "Heroku", "OpenAI", "Iron Session", "SWR", "Radix UI"],
    videoPlaceholder: "purple",
    youtubeVideoId: "c2HLeZPcbpE",
    rating: 5,
    targetAudience: [
      "Actuaries (trainee, part-qualified, qualified)",
      "Actuarial technicians",
      "Data scientists on actuarial teams",
      "Employers hiring actuarial talent"
    ],
    keyFeatures: [
      "Automated scraping pipeline continuously collects new actuarial roles and posts them to the platform",
      "Advanced filtering by experience level, technical skills, location, and sector",
      "Company profiles and branding",
      "Automated job posting with staging/production workflow",
      "Google Jobs integration",
      "SEO-optimized listings",
      "Job alerts via email",
      "Blog for industry content",
      "Admin dashboard for job management",
      "Similarity search with semantic job matching"
    ],
    architectureHighlights: [
      "Staging/Production workflow: Jobs go through staging before production",
      "Automated cron jobs for job management and SEO",
      "SEO-first approach with schema markup, optimized URLs, and breadcrumbs",
      "Component-based architecture with reusable React components",
      "API routes for backend logic",
      "Server-side rendering (SSR) for SEO and performance"
    ]
  },
  {
    slug: "threads-scraper",
    name: "Threads Scraper",
    role: "Threads Automation Platform",
    quote: "BitBash delivered a Threads blogger monitor that scrapes creators, tracks engagement, and schedules outreach in one dashboard.",
    description: "A comprehensive Threads automation platform that helps businesses monitor creators, track engagement metrics, and manage outreach campaigns all from a single intuitive dashboard.",
    technologies: ["Python", "Playwright", "FastAPI", "React", "PostgreSQL", "WebSockets"],
    videoPlaceholder: "purple",
    youtubeVideoId: "EtKwnFJ9sRU",
    rating: 5
  },
  {
    slug: "ttinit",
    name: "TTinit",
    role: "TikTok Shop Affiliate Outreach Automation",
    quote: "BitBash built TTinit, a powerful TikTok Shop outreach automation tool that connects to a database of 900k+ creators and automates messaging, filtering, and follow-ups. With smart targeting and campaign tracking, it boosts outreach speed by 10–15×, delivering fast, predictable affiliate growth for e-commerce teams.",
    description: "TTinit is a powerful TikTok Shop outreach automation tool built to help brands and agencies recruit affiliates at scale. It connects to a database of 900k+ creators and automates messaging, filtering, and follow-ups. With smart targeting and campaign tracking, it boosts outreach speed by 10–15×. Designed and maintained by Bitbash, it delivers fast, predictable affiliate growth for e-commerce teams.",
    technologies: ["Python", "TikTok API", "FastAPI", "React", "PostgreSQL", "Automation"],
    videoPlaceholder: "purple",
    youtubeVideoId: "s5UtdtL8rRM",
    rating: 5
  },
  {
    slug: "purepeak",
    name: "PurePeak",
    role: "TikTok Shop E-Commerce Scaling",
    quote: "BitBash scaled PurePeak's TikTok Shop from $1K to $900K in just 9 months using our in-house TTinit system. With automated affiliate outreach, creator sourcing, and daily pipeline management, we delivered consistent, high-volume growth.",
    description: "PurePeak is a fitness and nutrition brand whose TikTok Shop we scaled using our in-house TTinit system, taking it from $1K to $900K in just 9 months. With automated affiliate outreach, creator sourcing, and daily pipeline management, Bitbash delivered consistent, high-volume growth. This project became one of our fastest scaling TikTok Shop case studies and a clear example of how Bitbash turns lean operations into major e-commerce revenue.",
    technologies: ["TTinit System", "TikTok Shop", "Affiliate Automation", "E-Commerce", "Growth Marketing"],
    videoPlaceholder: "purple",
    youtubeVideoId: "haP0_E4LnmY",
    rating: 5
  },
  {
    slug: "facebook-scraper",
    name: "Facebook Scraper",
    role: "Data Extraction Platform",
    quote: "BitBash built a powerful Facebook scraper for data extraction and market research. Features include profile data collection, post scraping, comment extraction, group member lists, and advanced filtering with stealth technology to ensure reliable data access.",
    description: "A robust Facebook data extraction tool designed for market research and business intelligence. Built with stealth technology to ensure reliable data collection while respecting platform guidelines.",
    technologies: ["Python", "Selenium", "Scrapy", "FastAPI", "React", "PostgreSQL"],
    videoPlaceholder: "blue",
    youtubeVideoId: "iJgDAiV6OuM",
    rating: 5
  },
  {
    slug: "linkedin-automation",
    name: "LinkedIn Automation System",
    role: "Recruitment & Talent Acquisition Automation",
    quote: "BitBash built a LinkedIn automation system that scrapes profiles of users actively looking for jobs, filters them by role or location, stores the data in a structured database, and automatically sends personalized email campaigns. This gives recruiters and agencies a continuous pipeline of high-intent candidates without manual effort.",
    description: "We built a LinkedIn automation system that scrapes profiles of users actively looking for jobs, filters them by role or location, stores the data in a structured database, and automatically sends personalized email campaigns. This gives recruiters and agencies a continuous pipeline of high-intent candidates without manual effort. The system handles data collection, segmentation, and outreach end-to-end, making talent acquisition faster, scalable, and fully automated.",
    technologies: ["Python", "LinkedIn API", "Web Scraping", "Email Automation", "Database Management", "FastAPI"],
    videoPlaceholder: "blue",
    youtubeVideoId: "YXatRFOTP1U",
    rating: 5
  },
  {
    slug: "api-scraper",
    name: "Telegram News Automation Bot",
    role: "Telegram Content Automation System",
    quote: "The Telegram News Bot Automation System automatically collects, filters, translates, and posts curated content to Telegram channels. With an intelligent backend pipeline and a clean admin dashboard, it eliminates manual posting and keeps every channel consistently updated with high-quality content.",
    description: "The Telegram News Bot Automation System automatically collects, filters, translates, and posts curated content to Telegram channels. It uses an intelligent backend pipeline for classification and scheduling, supported by a clean admin dashboard to manage channels, quotas, categories, and translation settings. Designed for efficiency and reliability, it eliminates manual posting and ensures consistent, high-quality content delivery across multiple channels and languages.",
    technologies: ["Python", "FastAPI", "Telegram Bot API", "PostgreSQL", "React", "Automation", "Translation APIs"],
    videoPlaceholder: "orange",
    youtubeVideoId: "0k-NNkDWMsE",
    rating: 5
  },
  {
    slug: "telegram-weather-alert-bot",
    name: "Telegram Weather Alert Bot",
    role: "Automated Weather Alert Telegram Bot",
    quote:
      "Telegram Weather Alert Bot sends automated weather alerts and real-time updates so users and teams stay prepared without constantly checking apps.",
    description:
      "This project builds a simple yet powerful automation system that pushes timely weather updates straight into Telegram. It monitors weather data, checks for significant changes, and sends alerts directly to Telegram. The whole idea behind this bot is to keep people informed with real-time weather alerts, especially when conditions shift quickly. It supports multiple regions, scheduled checks, configurable thresholds, and robust error handling so communities, teams, and home users can stay prepared with almost no manual effort.",
    technologies: [
      "Python",
      "Async schedulers",
      "Weather APIs",
      "Telegram Bot API",
      "Appilot",
      "UI Automator",
      "Appium (optional)",
      "Logging & Proxy Management"
    ],
    videoPlaceholder: "green",
    rating: 5
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

