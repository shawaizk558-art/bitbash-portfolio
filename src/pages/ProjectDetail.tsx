import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProjectBySlug as getHardcodedProject } from "@/data/projects";
import { getProjectBySlug as getStrapiProject, getMongoProjectBySlug } from "@/lib/strapi";
import { useState, useEffect } from "react";
import type { Project } from "@/data/projects";
import { getMediaAssets } from "@/lib/mediaAssets";
import { truncateDescription } from "@/lib/utils";
import { formatTagsAsKeywords, getPrimaryTags } from "@/lib/seoUtils";
import { buildProjectSchema, buildProjectBreadcrumbSchema } from "@/lib/schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import telegramWeatherMarkdown from "../../content/projects/project1.md?raw";

/**
 * Convert a string to title case (capitalize first letter of each word)
 * Handles hyphens, underscores, and spaces
 */
function toTitleCase(str: string): string {
  if (!str) return str;
  
  return str
    // Replace hyphens and underscores with spaces
    .replace(/[-_]/g, ' ')
    // Split by spaces and capitalize first letter of each word
    .split(' ')
    .map(word => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .trim();
}

/**
 * Extract the opening paragraph from readme (between main title and ## Introduction)
 */
function extractOpeningParagraph(readme: string): string | null {
  if (!readme) return null;
  
  // Match content between the main title (# Title) and ## Introduction
  // This captures the opening paragraph
  const openingMatch = readme.match(/^#\s+[^\n]+\n\n([\s\S]*?)(?=\n##\s+Introduction)/i);
  
  if (openingMatch && openingMatch[1]) {
    return openingMatch[1].trim();
  }
  
  return null;
}

/**
 * Remove everything before ## Introduction heading from markdown content
 * This removes the main title (# Title), opening paragraph, and any content before Introduction
 */
function removeContentBeforeIntroduction(markdown: string): string {
  if (!markdown) return markdown;
  
  // Find ## Introduction and keep everything from there (including the heading)
  const introMatch = markdown.match(/(##\s+Introduction[\s\S]*)/i);
  
  if (introMatch && introMatch[1]) {
    // Return everything from ## Introduction onwards
    return introMatch[1].trim();
  }
  
  // If no Introduction found, remove the main title (# Title) and everything until first ## heading
  // This handles cases where the structure might be slightly different
  let cleaned = markdown
    // Remove the main title line (# Title) - matches from start of string
    .replace(/^#\s+[^\n]+/m, '')
    // Remove any newlines after the title
    .replace(/^\n+/m, '')
    // Remove everything (including the opening paragraph) until the first ## heading
    .replace(/^[\s\S]*?(?=\n##\s+)/, '');
  
  return cleaned.trim();
}

/**
 * Remove Directory Structure Tree section from markdown content
 */
function removeDirectoryStructureTree(markdown: string): string {
  // Match "## Directory Structure Tree" or "## Directory Structure" heading and everything until next heading or end
  const directoryStructureRegex = /##\s+Directory\s+Structure\s+Tree[\s\S]*?(?=##\s+|$)/gi;
  return markdown.replace(directoryStructureRegex, '').trim();
}

/**
 * Clean up markdown content - remove extra leading whitespace and newlines
 */
function cleanMarkdownContent(markdown: string): string {
  if (!markdown) return markdown;
  // Remove all leading whitespace, newlines, and ensure it starts with the heading
  return markdown.replace(/^\s+/, '').trim();
}

/**
 * Remove extra spacing from the start of markdown - specifically for Introduction heading
 */
function removeLeadingSpacing(markdown: string): string {
  if (!markdown) return markdown;
  // If it starts with ## Introduction, ensure no leading whitespace
  if (markdown.trim().startsWith('## Introduction')) {
    return markdown.trim();
  }
  // Remove any leading newlines or spaces
  return markdown.replace(/^[\s\n]+/, '');
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<(Project & { title?: string; description?: string; readme?: string; [key: string]: any }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      // First, check hardcoded projects (they take precedence)
      const hardcodedProject = getHardcodedProject(slug);
      if (hardcodedProject) {
        setProject(hardcodedProject);
        setIsLoading(false);
        return;
      }

      // If not found in hardcoded, check MongoDB projects
      try {
        const mongoProject = await getMongoProjectBySlug(slug);
        if (mongoProject) {
          setProject(mongoProject);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // Silently handle error
      }

      // Fallback to Strapi if not found in MongoDB
      try {
        const strapiProject = await getStrapiProject(slug);
        setProject(strapiProject);
      } catch (error) {
        // Silently handle error
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container-responsive py-20 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading project...</p>
        </div>
        <Footer isHomepage={false} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container-responsive py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← Back to Projects
          </Link>
        </div>
        <Footer isHomepage={false} />
      </div>
    );
  }

  const mediaAssets = getMediaAssets(project.slug);
  
  // Helper function to detect project category - reads from category field primarily
  const detectProjectCategory = () => {
    // Read category directly from project's category field
    const category = String((project as any).category || '').toLowerCase().trim();
    
    // If category field exists and is "automation", return automation
    if (category === 'automation') {
      return 'automation';
    }
    
    // If category field exists and is "scraper" or "scraping", return scraping
    if (category === 'scraper' || category === 'scraping') {
      return 'scraping';
    }
    
    // Fallback: check other fields if category field is not set
    // Check for automation indicators (bot, automation keywords)
    const role = String(project.role || '').toLowerCase().trim();
    const name = String(project.name || '').toLowerCase().trim();
    const slug = String(project.slug || '').toLowerCase().trim();
    const allText = `${category} ${role} ${name} ${slug}`.toLowerCase();
    
    // Check for "bot" keyword (automation indicator)
    const hasBot = /\bbot\b/.test(allText) || 
                   name.includes(' bot') || 
                   name.endsWith('bot') ||
                   slug.includes('-bot') ||
                   slug.endsWith('-bot') ||
                   role.includes('bot');
    
    // Check for automation keywords
    const hasAutomation = category.includes('automation') ||
                         role.includes('automation') ||
                         name.includes('automation') ||
                         slug.includes('automation');
    
    if (hasBot || hasAutomation) {
      return 'automation';
    }
    
    // Default to scraping if category is not automation
    return 'scraping';
  };

  // Determine pricing based on category - works for all projects (hardcoded and MongoDB)
  const getCategoryBasedPricing = () => {
    // Check if project has explicit pricing
    if (project.pricing) {
      return project.pricing;
    }

    const detectedCategory = detectProjectCategory();

    if (detectedCategory === 'scraping') {
      return "$100-$300 (one-time fee)";
    }

    // Automation category
    return "$500-$1,500 (one-time fee)";
  };

  // Determine timeline based on category - works for all projects
  // Always use category-based timeline (ignore explicit timeline to ensure dynamic behavior)
  const getCategoryBasedTimeline = () => {
    const detectedCategory = detectProjectCategory();

    if (detectedCategory === 'scraping') {
      return "7–10 days for delivery";
    }

    // Automation category
    return "15–20 days for delivery";
  };

  const defaultSidebarContent = {
    pricing: getCategoryBasedPricing(),
    timeline: getCategoryBasedTimeline(),
    postDeliverySupport: "Available at $4/hr",
    paymentMethods: "Wise, Payoneer, Bank Transfer (USD/EUR/GBP), and Crypto (USDT TRC20/ERC20)",
    moreDetails: "Schedule a quick demo anytime.",
    developer: "Zeeshan Ahmad"
  };

  const sidebarContent = {
    pricing: project.pricing ?? defaultSidebarContent.pricing,
    // Always use category-based timeline for dynamic behavior
    timeline: defaultSidebarContent.timeline,
    postDeliverySupport: project.postDeliverySupport ?? defaultSidebarContent.postDeliverySupport,
    paymentMethods: project.paymentMethods ?? defaultSidebarContent.paymentMethods,
    moreDetails: project.moreDetails ?? defaultSidebarContent.moreDetails,
    developer: project.developer ?? defaultSidebarContent.developer
  };

  // Check if this is a hardcoded (top 9) project
  // Only projects from src/data/projects.ts are considered hardcoded
  // MongoDB projects will have isHardcodedProject = false
  const isHardcodedProject = slug ? Boolean(getHardcodedProject(slug)) : false;

  // Process technologies for SEO
  const technologies = project.technologies || [];
  const primaryTags = getPrimaryTags(technologies, 15);
  const keywordsString = formatTagsAsKeywords(primaryTags);

  // Build structured data schemas
  const projectUrl = `https://bitbash.dev/project/${project.slug}`;
  const projectName = toTitleCase((project as any).title || project.name);
  const projectDescription = ((project as any).description || project.description).substring(0, 160);
  
  const projectSchema = buildProjectSchema({
    name: projectName,
    description: projectDescription,
    technologies: primaryTags,
    pricing: sidebarContent.pricing,
    role: project.role,
    rating: project.rating,
    developer: sidebarContent.developer
  }, projectUrl);

  const breadcrumbSchema = buildProjectBreadcrumbSchema(projectName, project.slug);

  // Combine schemas for structured data
  const structuredData = [projectSchema, breadcrumbSchema];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEO
        title={`${projectName} - BitBash Project`}
        description={projectDescription}
        canonical={`/project/${project.slug}`}
        image={mediaAssets.avatarSrc}
        keywords={keywordsString}
        structuredData={structuredData}
      />
      <Navigation />

      {/* Breadcrumbs */}
      <div className="container-responsive pt-4 pb-3 sm:pt-6 sm:pb-4 px-4 sm:px-0">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: projectName, href: `/project/${project.slug}` }
          ]}
        />
      </div>

      {/* Hero Section with Project Name and Description */}
      <Hero 
        title={toTitleCase((project as any).title || project.name)}
        subtitle={
          (project as any).readme 
            ? (extractOpeningParagraph((project as any).readme) || truncateDescription((project as any).description || project.description))
            : truncateDescription((project as any).description || project.description)
        }
        variant="compact"
        buttons={[
          { label: "See Our Work", href: "/projects", variant: "outline" },
          { label: "Get a Quote", href: "/contact", variant: "default" }
        ]}
      />

      {/* Content Section - Description, Technologies, etc */}
      {slug === "telegram-weather-alert-bot" ? (
        // Special case: render full markdown from content/projects/project1.md
        <section className="container-responsive pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-0 overflow-x-hidden">
          <div className={`max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full ${!isHardcodedProject ? 'grid lg:grid-cols-[320px,minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10' : ''}`}>
            {!isHardcodedProject && (
            <aside className="order-1 w-full lg:w-auto">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 lg:sticky lg:top-28 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Project Details</h3>
                </div>
                <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-3 md:gap-4">
                    <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Pricing</span>
                    <span className="text-gray-900 font-semibold text-left sm:text-right text-xs sm:text-sm md:text-base break-words sm:whitespace-nowrap">{sidebarContent.pricing}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-3 md:gap-4">
                    <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Timeline</span>
                    <span className="text-gray-900 font-semibold text-left sm:text-right text-xs sm:text-sm md:text-base break-words">{sidebarContent.timeline}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">Technology Used</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Post-Delivery Support</p>
                    <p className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base break-words">{sidebarContent.postDeliverySupport}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Payment Methods</p>
                    <p className="text-gray-900 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base break-words leading-snug">{sidebarContent.paymentMethods}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">More Details</p>
                    <a
                      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ29FECFRffucAqab3OFhlt5h5AeB8cs4irUQoDWTF3ZqfZs4pUaNRvWa8GYpRbm7RjV_1z8ldeR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-semibold hover:text-purple-600 transition-colors cursor-pointer text-xs sm:text-sm md:text-base break-words"
                    >
                      {sidebarContent.moreDetails}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
            )}
            <div className={!isHardcodedProject ? "order-2 w-full overflow-x-hidden" : "w-full overflow-x-hidden max-w-4xl mx-auto"}>
              <article className="prose prose-slate max-w-none px-0 sm:px-0 overflow-x-hidden">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {telegramWeatherMarkdown}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>
      ) : (
        <section className="container-responsive pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-0 overflow-x-hidden">
          <div className={`max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full ${!isHardcodedProject ? 'grid lg:grid-cols-[320px,minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10' : ''}`}>
            {!isHardcodedProject && (
            <aside className="order-first lg:order-none w-full lg:w-auto">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 lg:sticky lg:top-28 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">Project Details</h3>
                </div>
                <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-3 md:gap-4">
                    <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Pricing</span>
                    <span className="text-gray-900 font-semibold text-left sm:text-right text-xs sm:text-sm md:text-base break-words sm:whitespace-nowrap">{sidebarContent.pricing}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-3 md:gap-4">
                    <span className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Timeline</span>
                    <span className="text-gray-900 font-semibold text-left sm:text-right text-xs sm:text-sm md:text-base break-words">{sidebarContent.timeline}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base">Technology Used</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-purple-50 text-purple-700 rounded-full text-[10px] sm:text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Post-Delivery Support</p>
                    <p className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base break-words">{sidebarContent.postDeliverySupport}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Payment Methods</p>
                    <p className="text-gray-900 font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base break-words leading-snug">{sidebarContent.paymentMethods}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">More Details</p>
                    <a
                      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ29FECFRffucAqab3OFhlt5h5AeB8cs4irUQoDWTF3ZqfZs4pUaNRvWa8GYpRbm7RjV_1z8ldeR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 font-semibold hover:text-purple-600 transition-colors cursor-pointer text-xs sm:text-sm md:text-base break-words"
                    >
                      {sidebarContent.moreDetails}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
            )}
            <div className={`w-full overflow-x-hidden ${!isHardcodedProject ? 'order-2 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-14' : 'max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 xl:space-y-16'}`}>
              {/* Description - Use readme from MongoDB if available, otherwise use description */}
              {/* For hardcoded projects (top 9): small positive margin for spacing */}
              {/* For MongoDB projects: negative margin to pull content up (works with sidebar layout) */}
              <div className={`w-full overflow-x-hidden ${!isHardcodedProject ? '-mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12 xl:-mt-14' : 'mt-4 sm:mt-6 md:mt-8'}`}>
                {isHardcodedProject && (
                  <>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-0">
                      Introduction
                    </h2>
                    <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mb-6 sm:mb-8 md:mb-10 mt-3 sm:mt-4"></div>
                  </>
                )}
                <div className={`prose prose-lg lg:prose-lg max-w-none [&>h2:first-child]:mt-0 overflow-x-hidden ${isHardcodedProject ? 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed' : ''}`}>
                  {(project as any).readme ? (
                    <div className={`text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 leading-relaxed lg:leading-relaxed ${isHardcodedProject ? 'bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-100' : ''}`}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {removeLeadingSpacing(cleanMarkdownContent(removeDirectoryStructureTree(removeContentBeforeIntroduction((project as any).readme))))}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className={`text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 leading-relaxed lg:leading-relaxed ${isHardcodedProject ? 'bg-gray-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-100' : ''}`}>
                      {project.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Technologies Showcase - Only for hardcoded projects */}
              {isHardcodedProject && project.technologies && project.technologies.length > 0 && (
                <div className="w-full">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 rounded-xl text-sm sm:text-base font-semibold border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Audience / Niche */}
              {project.targetAudience && project.targetAudience.length > 0 && (
                <div className={isHardcodedProject ? 'bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm' : ''}>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                    Target Audience
                  </h2>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {project.targetAudience.map((audience, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-700 ${isHardcodedProject ? 'pl-2' : ''}`}
                      >
                        <span className="text-purple-600 leading-[1] mt-1 flex-shrink-0 text-lg sm:text-xl">•</span>
                        <span className="break-words">{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className={isHardcodedProject ? 'bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm' : ''}>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                    Key Features
                  </h2>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {project.keyFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-700 ${isHardcodedProject ? 'pl-2' : ''}`}
                      >
                        <span className="text-purple-600 leading-[1] mt-1 flex-shrink-0 text-lg sm:text-xl">•</span>
                        <span className="break-words">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture Highlights */}
              {project.architectureHighlights &&
                project.architectureHighlights.length > 0 && (
                  <div className={isHardcodedProject ? 'bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 shadow-sm' : ''}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                      Architecture Highlights
                    </h2>
                    <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {project.architectureHighlights.map((highlight, index) => (
                        <li
                          key={index}
                          className={`flex items-start gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-700 ${isHardcodedProject ? 'pl-2' : ''}`}
                        >
                          <span className="text-purple-600 leading-[1] mt-1 flex-shrink-0 text-lg sm:text-xl">
                            •
                          </span>
                          <span className="break-words">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

            </div>
          </div>
        </section>
      )}

      <Footer isHomepage={false} />

      {/* Floating Social Icons - Bottom Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2 sm:gap-3">
          {/* WhatsApp Icon */}
          <a
            href="https://api.whatsapp.com/send/?phone=923249868488&text=Hi+Zeeshan%2C+I%27m+interested+in+automation.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Contact us on WhatsApp"
          >
            <img 
              src="/logos/whatsapp.svg" 
              alt="WhatsApp" 
              className="w-7 h-7 sm:w-9 sm:h-9 brightness-0 invert"
            />
          </a>

          {/* Telegram Icon */}
          <a
            href="https://t.me/Bitbash333"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#26A5E4] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Contact us on Telegram"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-8 h-8 sm:w-11 sm:h-11 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
    </div>
  );
};

export default ProjectDetail;

