import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug as getHardcodedProject } from "@/data/projects";
import { getProjectBySlug as getStrapiProject, getMongoProjectBySlug } from "@/lib/strapi";
import { useState, useEffect } from "react";
import type { Project } from "@/data/projects";
import { getMediaAssets } from "@/lib/mediaAssets";
import { truncateDescription } from "@/lib/utils";
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
        console.error('Error loading project from MongoDB:', error);
      }

      // Fallback to Strapi if not found in MongoDB
      try {
        const strapiProject = await getStrapiProject(slug);
        setProject(strapiProject);
      } catch (error) {
        console.error('Error loading project from Strapi:', error);
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
  const defaultSidebarContent = {
    pricing: "$300–700 (one-time fee)",
    timeline: "7–10 days for delivery",
    postDeliverySupport: "Available at $4/hr",
    paymentMethods: "Wise, Payoneer, Bank Transfer (USD/EUR/GBP), and Crypto (USDT TRC20/ERC20)",
    moreDetails: "Schedule a quick demo anytime.",
    developer: "Zeeshan Ahmad"
  };

  const sidebarContent = {
    pricing: project.pricing ?? defaultSidebarContent.pricing,
    timeline: project.timeline ?? defaultSidebarContent.timeline,
    postDeliverySupport: project.postDeliverySupport ?? defaultSidebarContent.postDeliverySupport,
    paymentMethods: project.paymentMethods ?? defaultSidebarContent.paymentMethods,
    moreDetails: project.moreDetails ?? defaultSidebarContent.moreDetails,
    developer: project.developer ?? defaultSidebarContent.developer
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${toTitleCase((project as any).title || project.name)} - BitBash Project`}
        description={((project as any).description || project.description).substring(0, 160)}
        canonical={`/project/${project.slug}`}
        image={mediaAssets.avatarSrc}
      />
      <Navigation />

      {/* Back Button */}
      <div className="container-responsive pt-6 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
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
        <section className="container-responsive pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto grid lg:grid-cols-[320px,minmax(0,1fr)] gap-10">
            <aside className="order-1">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7 lg:p-8 space-y-6 lg:space-y-7 lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 font-medium">Pricing</span>
                    <span className="text-gray-900 font-semibold text-right">{sidebarContent.pricing}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 font-medium">Timeline</span>
                    <span className="text-gray-900 font-semibold text-right">{sidebarContent.timeline}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-2">Technology Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 font-medium">Post-Delivery Support</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.postDeliverySupport}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Payment Methods</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.paymentMethods}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">More Details</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.moreDetails}</p>
                  </div>
                </div>
              </div>
            </aside>
            <div className="order-2">
              <article className="prose prose-slate max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {telegramWeatherMarkdown}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>
      ) : (
        <section className="container-responsive pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto grid lg:grid-cols-[320px,minmax(0,1fr)] gap-10">
            <aside className="order-first lg:order-none">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-7 lg:p-8 space-y-6 lg:space-y-7 lg:sticky lg:top-28">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 font-medium">Pricing</span>
                    <span className="text-gray-900 font-semibold text-right">{sidebarContent.pricing}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-600 font-medium">Timeline</span>
                    <span className="text-gray-900 font-semibold text-right">{sidebarContent.timeline}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-2">Technology Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 font-medium">Post-Delivery Support</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.postDeliverySupport}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Payment Methods</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.paymentMethods}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">More Details</p>
                    <p className="text-gray-900 font-semibold">{sidebarContent.moreDetails}</p>
                  </div>
                </div>
              </div>
            </aside>
            <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
              {/* Description - Use readme from MongoDB if available, otherwise use description */}
              <div className="-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-14">
                <div className="prose prose-lg lg:prose-lg max-w-none [&>h2:first-child]:mt-0">
                  {(project as any).readme ? (
                    <div className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 leading-relaxed lg:leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {removeLeadingSpacing(cleanMarkdownContent(removeDirectoryStructureTree(removeContentBeforeIntroduction((project as any).readme))))}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 leading-relaxed lg:leading-relaxed">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Target Audience / Niche */}
              {project.targetAudience && project.targetAudience.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                    Target Audience
                  </h2>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {project.targetAudience.map((audience, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700"
                      >
                        <span className="text-purple-600 leading-[1] mt-1">•</span>
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                    Key Features
                  </h2>
                  <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {project.keyFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700"
                      >
                        <span className="text-purple-600 leading-[1] mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture Highlights */}
              {project.architectureHighlights &&
                project.architectureHighlights.length > 0 && (
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                      Architecture Highlights
                    </h2>
                    <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                      {project.architectureHighlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700"
                        >
                          <span className="text-purple-600 leading-[1] mt-1">
                            •
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Rating */}
              <div className="pt-4 lg:pt-6 border-t border-gray-200 flex items-center justify-center gap-2 lg:gap-3">
                <span className="text-gray-700 font-semibold text-base sm:text-lg lg:text-lg xl:text-xl">
                  Rating:
                </span>
                <div className="flex gap-1 lg:gap-1.5">
                  {[...Array(project.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="text-yellow-400 text-xl lg:text-xl xl:text-2xl"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer isHomepage={false} />
    </div>
  );
};

export default ProjectDetail;

