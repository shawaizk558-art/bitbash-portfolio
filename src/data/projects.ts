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
    quote: "BitBash built Petla Vet Finder, a high-performance veterinary practice locator that connects pet owners with over 9,700 practices across Germany, featuring real-time availability and secure booking tools.",
    description: "Petla Vet Finder Germany is a specialized platform designed to bridge the gap between pet owners and veterinary healthcare providers. The system manages a massive database of over 9,700 practices, offering advanced geographic search with radius-based filtering to help users find the nearest care. It provides real-time insights into practice status, including 'Open Now' indicators and 24/7 emergency shift tracking, ensuring pet owners can find help when it's most critical.\n\nThe platform integrates secure booking tools for both physical and video consultations, along with an intelligent search system that processes complex medical synonyms. Built with a robust security architecture, Petla implements a progressive friction rate limiting system using token buckets and multi-level verification (Turnstile, hCaptcha, email) to protect sensitive data while maintaining a smooth user experience. The entire application is optimized for performance, achieving a 78% reduction in bundle size through strategic chunking and lazy loading.",
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Supabase Edge Functions",
      "Tailwind CSS",
      "TanStack Query",
      "Lucide React",
      "Leaflet",
      "PostHog",
      "Lottie",
      "Shadcn UI",
      "Express"
    ],
    targetAudience: [
      "Pet owners in Germany",
      "Veterinary practices and clinics",
      "Emergency veterinary services",
      "Pet owners seeking digital health management and video consultations"
    ],
    keyFeatures: [
      "Geographic radius-based search for 9,700+ veterinary practices",
      "Real-time 'Open Now' status and 24/7 emergency shift tracking",
      "Integrated booking system for physical and video consultations",
      "Intelligent search synonym processing (e.g., 'CT' to 'Computertomografie')",
      "Advanced security with progressive friction rate limiting and bot detection",
      "Comprehensive admin dashboard for veterinary practice management",
      "SEO-optimized landing pages for cities and individual vet profiles",
      "High-performance interface with optimized bundle sizes and lazy loading",
      "Practice knowledge base (Ratgeber) for pet health information"
    ],
    architectureHighlights: [
      "Progressive Friction Security: Multi-level challenge system (Turnstile, hCaptcha, Email) with token buckets",
      "Row-Level Security (RLS) for fine-grained database access control",
      "Serverless Architecture using Supabase Edge Functions",
      "Advanced Web Performance: Strategic manual chunking, lazy loading, and asset integrity checking",
      "Component-based architecture with clean separation of concerns and business logic hooks",
      "Real-time data synchronization using Supabase subscriptions for availability status"
    ],
    videoPlaceholder: "purple",
    youtubeVideoId: "T--1C-VUY9g",
    rating: 5
  },
  {
    slug: "scraper-glass",
    name: "ScraperGlass",
    role: "Premium Instagram Data Extraction Platform",
    quote: "BitBash built ScraperGlass, a comprehensive Instagram data extraction platform that automates the collection of followers, following lists, posts, hashtags, likers, and commenters with advanced filtering capabilities. Features a coin-based payment system, real-time progress tracking, multiple export formats, and seamless integration with Stripe and cryptocurrency payments.",
    description: "ScraperGlass is a production-ready web application designed to extract and analyze Instagram data at scale. Built for digital marketing agencies, brand strategists, and researchers, the platform eliminates hours of manual data collection by automating Instagram data extraction with precision filtering and real-time monitoring. The system supports six extraction types: followers, following lists, post likers, commenters, hashtag posts, and individual post data. Each extraction can be filtered by verification status, privacy settings, follower count ranges, business account status, profile picture presence, and even extract contact information like emails and phone numbers from bios. The platform implements a transparent coin-based payment system where users purchase coins and pay only for what they extract. Real-time progress tracking shows live updates during extractions, and all data can be exported in JSON, CSV, or TXT formats. The architecture includes a factory pattern supporting multiple scraping services (HikerAPI, RapidAPI, Parser.im) with automatic failover, optimized pagination for handling datasets exceeding 1000 rows, and seamless integration with both traditional (Stripe) and cryptocurrency (NOWPayments) payment methods. An admin dashboard provides complete platform control including user management, coin allocation, extraction type toggling, and comprehensive analytics.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Stripe",
      "NOWPayments",
      "Resend",
      "HikerAPI",
      "RapidAPI",
      "Parser.im",
      "Vercel",
      "JWT",
      "bcryptjs",
      "Chart.js",
      "React Icons",
      "Axios",
      "Node.js"
    ],
    targetAudience: [
      "Digital marketing agencies",
      "Brand strategists",
      "Influencer marketing professionals",
      "Social media researchers",
      "Data analysts",
      "Marketing researchers",
      "Content creators",
      "Business intelligence teams"
    ],
    keyFeatures: [
      "Six extraction types: followers, following, likers, commenters, hashtags, and posts",
      "Advanced filtering system with 15+ filter options including verification status, privacy, follower ranges, business accounts, and contact extraction",
      "Coin-based payment system with transparent pricing and real-time balance tracking",
      "Real-time progress monitoring with live updates every 2 seconds during extractions",
      "Multiple data export formats: JSON, CSV, and TXT for flexible data integration",
      "Multi-scraper architecture with factory pattern supporting HikerAPI, RapidAPI, and Parser.im with automatic failover",
      "Dual payment integration: Stripe for traditional payments and NOWPayments for 300+ cryptocurrencies",
      "Admin dashboard with user management, coin allocation, extraction type control, and platform analytics",
      "Pagination system optimized for handling datasets exceeding 1000 rows",
      "Background processing with webhook and polling systems for extraction progress",
      "Account management with ban/unban system, password reset, and email notifications",
      "Coin limit controls allowing users to set maximum spending per extraction"
    ],
    architectureHighlights: [
      "Factory pattern for multi-scraper architecture: Supports HikerAPI, RapidAPI, and Parser.im with unified interface",
      "Pagination optimization: Handles Supabase row limits with efficient batching for large datasets",
      "Real-time updates: Polling system with 2-second intervals and webhook integration for live progress tracking",
      "Payment abstraction: Seamless integration of Stripe and NOWPayments with unified coin credit system",
      "Component-based architecture: Reusable React components with TypeScript for type safety",
      "API routes for backend logic: Next.js API routes handling authentication, extractions, payments, and admin functions",
      "Server-side rendering (SSR): Next.js 15 with React 19 for optimal performance and SEO",
      "Database optimization: Efficient queries with proper indexing, pagination, and batching strategies",
      "Error handling: Comprehensive error types (ScraperError, RateLimitError, NotFoundError, PrivateError) with retry logic",
      "Background processing: Extraction worker system processes data asynchronously while maintaining real-time UI updates",
      "Admin-configurable extraction types: Database-driven enable/disable system for extraction types",
      "JWT-based authentication: Secure session management with Iron Session for state persistence"
    ],
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

