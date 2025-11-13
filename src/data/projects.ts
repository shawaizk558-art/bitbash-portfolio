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
    slug: "twitter-bot",
    name: "Twitter Bot",
    role: "Social Media Automation",
    quote: "BitBash developed a Twitter automation bot for content scheduling, engagement, and growth. Features include tweet scheduling, auto-retweets, replies, follower management, and trend monitoring.",
    description: "An advanced Twitter automation solution that empowers businesses and content creators to manage their social media presence efficiently. The bot handles scheduling, engagement, and growth strategies automatically.",
    technologies: ["Python", "Twitter API", "FastAPI", "React", "PostgreSQL", "Celery"],
    videoPlaceholder: "purple",
    youtubeVideoId: "MKem1ZQ2SkE",
    rating: 5
  },
  {
    slug: "spotify-bot",
    name: "Spotify Bot",
    role: "Music Platform Automation",
    quote: "BitBash created a Spotify automation bot for playlist management, music discovery, and analytics. Features include auto-playlist creation, track recommendations, listening statistics, and cross-platform integration.",
    description: "A powerful Spotify automation platform that simplifies playlist management, provides intelligent music recommendations, and delivers comprehensive listening analytics for music enthusiasts and businesses.",
    technologies: ["Python", "Spotify API", "FastAPI", "React", "MongoDB", "Machine Learning"],
    videoPlaceholder: "purple",
    youtubeVideoId: "PGcOVSEdLME",
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
    slug: "project-8",
    name: "Project 8",
    role: "Automation Project",
    quote: "Coming soon - A new project showcasing innovative automation solutions and cutting-edge technology.",
    description: "A new project showcasing innovative automation solutions and cutting-edge technology. More details coming soon.",
    technologies: [],
    videoPlaceholder: "green",
    rating: 5
  },
  {
    slug: "project-9",
    name: "Project 9",
    role: "Automation Project",
    quote: "Coming soon - A new project showcasing innovative automation solutions and cutting-edge technology.",
    description: "A new project showcasing innovative automation solutions and cutting-edge technology. More details coming soon.",
    technologies: [],
    videoPlaceholder: "orange",
    rating: 5
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

