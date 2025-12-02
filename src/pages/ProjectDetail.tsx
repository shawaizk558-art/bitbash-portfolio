import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug as getHardcodedProject } from "@/data/projects";
import { getProjectBySlug as getStrapiProject } from "@/lib/strapi";
import { useState, useEffect } from "react";
import type { Project } from "@/data/projects";
import {
  getMediaAssets,
} from "@/lib/mediaAssets";
import { truncateDescription } from "@/lib/utils";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
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

      // If not found in hardcoded, check Strapi
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

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${project.name} - BitBash Project`}
        description={project.description.substring(0, 160)}
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
        title={project.name}
        subtitle={truncateDescription(project.description)}
        variant="compact"
        buttons={[
          { label: "See Our Work", href: "/projects", variant: "outline" },
          { label: "Get a Quote", href: "/contact", variant: "default" }
        ]}
      />

      {/* Content Section - Description, Technologies, etc */}
      <section className="container-responsive pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">

          {/* Description */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
              Description
            </h2>
            <div className="prose prose-lg lg:prose-lg max-w-none">
              <p className="text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700 leading-relaxed lg:leading-relaxed">
                {project.description}
              </p>
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
                  <li key={index} className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700">
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
                  <li key={index} className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700">
                    <span className="text-purple-600 leading-[1] mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {project.technologies.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5 lg:gap-4 justify-start">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm lg:text-sm xl:text-base font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlights */}
          {project.architectureHighlights && project.architectureHighlights.length > 0 && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8">
                Architecture Highlights
              </h2>
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4">
                {project.architectureHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3 text-base sm:text-lg lg:text-lg xl:text-xl text-gray-700">
                    <span className="text-purple-600 leading-[1] mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rating */}
          <div className="pt-4 lg:pt-6 border-t border-gray-200 flex items-center justify-center gap-2 lg:gap-3">
            <span className="text-gray-700 font-semibold text-base sm:text-lg lg:text-lg xl:text-xl">Rating:</span>
            <div className="flex gap-1 lg:gap-1.5">
              {[...Array(project.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl lg:text-xl xl:text-2xl">★</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default ProjectDetail;

