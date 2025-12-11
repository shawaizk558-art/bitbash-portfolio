import { Navigation } from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { getMongoProjects } from "@/lib/strapi";
import { Play, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { Project } from "@/data/projects";
import { projects as hardcodedProjects } from "@/data/projects";
import { HeroBackground } from "@/components/HeroBackground";
import { AutoPlayVideo } from "@/components/AutoPlayVideo";
import { LiteYouTubeEmbed } from "@/components/LiteYouTubeEmbed";
import {
  getMediaAssets,
  getPosterPath,
  getVideoSources,
} from "@/lib/mediaAssets";

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
 * Extract the Introduction section from readme markdown
 * The Introduction section starts with "## Introduction" and ends at the next "##" heading
 */
function extractIntroductionFromReadme(readme: string): string | null {
  if (!readme) return null;
  
  // Find the Introduction section
  const introMatch = readme.match(/##\s+Introduction\s*\n\n([\s\S]*?)(?=\n##\s+|$)/i);
  
  if (introMatch && introMatch[1]) {
    // Clean up the text: remove markdown formatting, extra whitespace
    let introText = introMatch[1]
      .trim()
      // Remove markdown links but keep text: [text](url) -> text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      // Remove markdown bold/italic: **text** -> text, *text* -> text
      .replace(/\*\*([^\*]+)\*\*/g, '$1')
      .replace(/\*([^\*]+)\*/g, '$1')
      // Remove markdown headers
      .replace(/^###+\s+/gm, '')
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // Remove list markers at start of lines
      .replace(/^[\s]*[-*+]\s+/gm, '')
      // Remove extra newlines (max 2 consecutive)
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Take first paragraph or first 200 characters
    const firstParagraph = introText.split('\n\n')[0];
    return firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200).trim() + '...'
      : firstParagraph;
  }
  
  return null;
}

const Projects = () => {
  const [mongoProjects, setMongoProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDynamicProjects() {
      try {
        // Fetch MongoDB projects only (no Strapi projects below top 9)
        const mongoProjectsData = await getMongoProjects();
        setMongoProjects(mongoProjectsData);
      } catch (error) {
        console.error('Error fetching MongoDB projects:', error);
        setMongoProjects([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDynamicProjects();
  }, []);

  // Filter out Telegram Weather Alert Bot and reorder projects (swap 2nd and 3rd for homepage consistency)
  const filteredHardcodedProjects = hardcodedProjects.filter(
    project => project.slug !== 'telegram-weather-alert-bot'
  );
  const reorderedHardcodedProjects = [...filteredHardcodedProjects];
  if (reorderedHardcodedProjects.length > 2) {
    [reorderedHardcodedProjects[1], reorderedHardcodedProjects[2]] = [reorderedHardcodedProjects[2], reorderedHardcodedProjects[1]];
  }

  // Combine all projects: hardcoded first, then MongoDB only
  // Filter out duplicates by slug (hardcoded takes precedence)
  const hardcodedSlugs = new Set(reorderedHardcodedProjects.map(p => p.slug));
  
  const filteredMongoProjects = mongoProjects.filter(
    project => !hardcodedSlugs.has(project.slug)
  );
  
  const allProjects = [
    ...reorderedHardcodedProjects, 
    ...filteredMongoProjects
  ];

  const setHighPriority = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      node.setAttribute("fetchpriority", "high");
    }
  }, []);

  const gradientClasses = {
    purple: "from-purple-400 to-purple-600",
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    pink: "from-pink-400 to-pink-600",
    teal: "from-teal-400 to-teal-600",
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Our Projects - BitBash"
        description="Explore our portfolio of successful software development and automation projects. See how we help businesses grow."
        canonical="/projects"
        image="/stack1.png"
      />
      <Navigation />

      {/* Projects Hero Section - match Blog hero hierarchy/sizes */}
      <section className="relative min-h-[clamp(220px,42vh,340px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)] flex items-center justify-center overflow-hidden pt-14 pb-6 sm:pb-8 lg:pb-12">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-responsive-lg">
            <div className="mt-4 sm:mt-6 lg:mt-10">
              <h1 className="text-3xl sm:text-responsive-3xl sm:text-responsive-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                BitBash <span className="text-purple-600">Projects</span>
              </h1>
            </div>
            <div className="hidden sm:block space-responsive-sm">
              <div className="space-y-2 sm:space-y-2.5 md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-0">
                <p className="text-base sm:text-lg md:text-lg lg:text-[21px] text-black font-semibold leading-relaxed">
                  500+ completed systems delivered with precision engineering and measurable impact
                </p>
                <p className="text-base sm:text-lg md:text-lg lg:text-[21px] text-black leading-relaxed">
                  Explore recent work across automation, scraping, data platforms, and SaaS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects - Unified Grid */}
      <section className="pt-0 sm:pt-2 md:pt-4 pb-12 sm:pb-16 md:pb-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {allProjects.map((project, index) => {
              const mediaAssets = getMediaAssets(project.slug);
              const hasVideo = Boolean(mediaAssets.videoKey);
              // Use screenshot for projects after top 9 (index >= 9)
              const shouldUseScreenshot = index >= 9 && !project.youtubeVideoId && !hasVideo;
              const screenshotPath = shouldUseScreenshot 
                ? `/project-screenshots/${project.slug}.png`
                : null;

              return (
                <div
                  key={project.slug}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Video Thumbnail - Mobile Optimized */}
                  <div
                    className="relative aspect-video bg-gradient-to-br overflow-hidden group"
                  >
                    {project.youtubeVideoId ? (
                      <div className="absolute inset-0 w-full h-full z-0">
                        <LiteYouTubeEmbed
                          videoId={project.youtubeVideoId}
                          title={`${project.name} Video`}
                          isPlaying={playingVideoIndex === index}
                          onPlay={() => setPlayingVideoIndex(index)}
                          className="w-full h-full"
                          placeholderClassName="relative block w-full h-full text-left"
                        >
                          <>
                            {hasVideo ? (
                              <AutoPlayVideo
                                sources={getVideoSources(mediaAssets.videoKey!)}
                                poster={getPosterPath(mediaAssets.videoKey!)}
                                alt={mediaAssets.alt}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[project.videoPlaceholder]} opacity-80`} />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg touch-target">
                                <Play className="w-5 h-5 sm:w-7 text-gray-900 ml-1" fill="currentColor" />
                              </div>
                            </div>
                          </>
                        </LiteYouTubeEmbed>
                        {playingVideoIndex === index && (
                          <button
                            type="button"
                            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md"
                            aria-label="Close video"
                            onClick={() => setPlayingVideoIndex(null)}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ) : hasVideo ? (
                      <div className="absolute inset-0 w-full h-full z-0">
                        <AutoPlayVideo
                          sources={getVideoSources(mediaAssets.videoKey!)}
                          poster={getPosterPath(mediaAssets.videoKey!)}
                          alt={mediaAssets.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : shouldUseScreenshot && screenshotPath ? (
                      <>
                        {/* Project Screenshot Thumbnail - Centered with ultra-compact padding */}
                        <div className="absolute inset-0 w-full h-full bg-white flex items-center justify-center p-0 sm:p-1">
                          <img
                            src={screenshotPath}
                            alt={`${project.name} preview`}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to gradient if screenshot fails to load
                              const target = e.currentTarget as HTMLImageElement;
                              const wrapper = target.parentElement as HTMLElement | null;
                              if (wrapper) {
                                wrapper.style.display = 'none';
                                const fallback = wrapper.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = 'block';
                              }
                            }}
                          />
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[project.videoPlaceholder]} opacity-80 hidden`}></div>
                      </>
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[project.videoPlaceholder]} opacity-80`}></div>

                        {/* Play Button - Mobile Optimized */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg touch-target">
                            <Play className="w-5 h-5 sm:w-7 sm:w-7 text-gray-900 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Content - Mobile Optimized - Clickable to navigate */}
                  <Link to={`/project/${project.slug}`} className="block p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    {/* Title - Use title from MongoDB if available, otherwise use name, convert to title case */}
                    <p className="text-gray-700 text-xs sm:text-sm lg:text-sm leading-relaxed mb-2 font-semibold line-clamp-2">
                      {toTitleCase((project as any).title || project.name)}
                    </p>
                    {/* Description - Use Introduction from readme, then description, then quote */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {extractIntroductionFromReadme((project as any).readme) || 
                       (project as any).description || 
                       project.quote}
                    </p>

                    {/* Author Info - Mobile Optimized */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {/* Avatar Placeholder - Hidden for projects 10+ */}
                        {index < 9 && (
                          <>
                            {mediaAssets.avatarSrc ? (
                              <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${mediaAssets.avatarWrapperClass}`}
                              >
                                <img
                                  ref={setHighPriority}
                                  src={mediaAssets.avatarSrc}
                                  alt={mediaAssets.avatarAlt}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xs sm:text-sm">
                                  {project.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            )}
                          </>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-sm truncate">
                            {toTitleCase((project as any).title || project.name)}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {toTitleCase((project as any).category || project.role)}
                          </p>
                        </div>
                      </div>

                      {/* Rating - Mobile Optimized */}
                      <div className="flex gap-0.5 flex-shrink-0">
                        {[...Array(project.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loading or Empty State */}
      {isLoading && (
        <section className="pb-12 sm:pb-16 md:pb-20">
          <div className="container-responsive">
            <div className="text-center text-gray-600">
              Loading projects...
            </div>
          </div>
        </section>
      )}

      <Footer isHomepage={false} />
    </div>
  );
};

export default Projects;


