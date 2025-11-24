import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getProjects } from "@/lib/strapi";
import { Play, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import type { Project } from "@/data/projects";
import { projects as hardcodedProjects } from "@/data/projects";
import { HeroBackground } from "@/components/HeroBackground";

const Projects = () => {
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchDynamicProjects() {
      try {
        const strapiProjects = await getProjects({
          sort: 'displayOrder:asc,publishedAt:desc'
        });

        // Filter out any projects that have the same slug as hardcoded projects
        // (hardcoded projects take precedence)
        const hardcodedSlugs = new Set(hardcodedProjects.map(p => p.slug));
        const filteredProjects = strapiProjects.filter(
          project => !hardcodedSlugs.has(project.slug)
        );

        setDynamicProjects(filteredProjects);
      } catch (error) {
        console.error('Error fetching dynamic projects:', error);
        setDynamicProjects([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDynamicProjects();
  }, []);

  // Reorder projects (swap 2nd and 3rd for homepage consistency)
  const reorderedHardcodedProjects = [...hardcodedProjects];
  if (reorderedHardcodedProjects.length > 2) {
    [reorderedHardcodedProjects[1], reorderedHardcodedProjects[2]] = [reorderedHardcodedProjects[2], reorderedHardcodedProjects[1]];
  }

  // Combine all projects: hardcoded first, then dynamic
  const allProjects = [...reorderedHardcodedProjects, ...dynamicProjects];

  const setHighPriority = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      node.setAttribute("fetchpriority", "high");
    }
  }, []);

  const getMediaAssets = (slug: string) => {
    switch (slug) {
      case "petla":
        return {
          gif: "/petla.gif",
          alt: "Petla website preview",
          avatarSrc: "/petla.svg",
          avatarAlt: "Petla Logo",
          avatarWrapperClass: "bg-white p-1"
        };
      case "actuary-list":
        return {
          gif: "/actuarylist.gif",
          alt: "Actuary List website preview",
          avatarSrc: "/actuarylist-logo.png",
          avatarAlt: "Actuary List Logo",
          avatarWrapperClass: "bg-white"
        };
      case "scraper-glass":
        return {
          gif: "/scraperglass.gif",
          alt: "Scraper Glass website preview",
          avatarSrc: "/scraperglass-logo.png",
          avatarAlt: "Scraper Glass Logo",
          avatarWrapperClass: "bg-white"
        };
      case "threads-scraper":
        return {
          gif: "/thread-scraper.gif",
          alt: "Threads Scraper preview",
          avatarSrc: "https://cdn.simpleicons.org/threads/000000",
          avatarAlt: "Threads Logo",
          avatarWrapperClass: "bg-white p-1.5"
        };
      case "twitter-bot":
        return {
          gif: "/twitter.gif",
          alt: "Twitter Bot preview",
          avatarSrc: "https://cdn.simpleicons.org/x/000000",
          avatarAlt: "Twitter/X Logo",
          avatarWrapperClass: "bg-white p-1.5"
        };
      case "ttinit":
        return {
          gif: "/ttinit.gif",
          alt: "TTinit TikTok Shop Affiliate Outreach Bot preview",
          avatarSrc: "/ttinit-logo.png",
          avatarAlt: "TTinit Logo",
          avatarWrapperClass: "bg-white"
        };
      case "spotify-bot":
        return {
          gif: "/spotify.gif",
          alt: "Spotify Bot preview",
          avatarSrc: "https://cdn.simpleicons.org/spotify/1DB954",
          avatarAlt: "Spotify Logo",
          avatarWrapperClass: "bg-white p-1.5"
        };
      case "purepeak":
        return {
          gif: "/purepeak.gif",
          alt: "PurePeak TikTok Shop scaling preview",
          avatarSrc: "/purepeak_ltd_logo.jpeg",
          avatarAlt: "PurePeak Logo",
          avatarWrapperClass: "bg-white"
        };
      case "facebook-scraper":
        return {
          gif: "/facebook.gif",
          alt: "Facebook Scraper preview",
          avatarSrc: "https://cdn.simpleicons.org/facebook/1877F2",
          avatarAlt: "Facebook Logo",
          avatarWrapperClass: "bg-white p-1.5"
        };
      case "linkedin-automation":
        return {
          gif: "/linkedin_automation-system.gif",
          alt: "LinkedIn Automation System preview",
          avatarSrc: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
          avatarAlt: "LinkedIn Logo",
          avatarWrapperClass: "bg-white p-1.5"
        };
      default:
        return {
          gif: "",
          alt: `${slug} preview`,
          avatarSrc: "",
          avatarAlt: `${slug} logo`,
          avatarWrapperClass: "bg-gradient-to-br from-purple-400 to-purple-600"
        };
    }
  };

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
      <Navigation />

      {/* Projects Hero Section - match Blog hero hierarchy/sizes */}
      <section className="relative min-h-[clamp(220px,42vh,340px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)] flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8 lg:pb-12">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-responsive-lg">
            <div className="mt-4 sm:mt-6 lg:mt-10">
              <h1 className="text-3xl sm:text-responsive-3xl sm:text-responsive-4xl md:text-6xl font-bold text-gray-900">
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
              const hasCustomGif = Boolean(mediaAssets.gif);
              const shouldEagerLoad = index === 0;

              return (
                <div
                  key={project.slug}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Video Thumbnail - Mobile Optimized */}
                  <div
                    className="relative aspect-video bg-gradient-to-br overflow-hidden group cursor-pointer"
                    onClick={() => {
                      if (project.youtubeVideoId) {
                        setPlayingVideoIndex(playingVideoIndex === index ? null : index);
                      }
                    }}
                  >
                    {project.youtubeVideoId ? (
                      /* Cards with GIF/YouTube video */
                      <>
                        {playingVideoIndex === index ? (
                          /* YouTube video embed - shows YouTube's own play button */
                          <div className="absolute inset-0 w-full h-full z-0">
                            <iframe
                              src={`https://www.youtube.com/embed/${project.youtubeVideoId}?rel=0`}
                              className="w-full h-full"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={`${project.name} Video`}
                            ></iframe>
                          </div>
                        ) : (
                          /* GIF Display with play button overlay */
                          <>
                            {hasCustomGif && (
                              <div className="absolute inset-0 w-full h-full z-0">
                                <img
                                  src={mediaAssets.gif}
                                  alt={mediaAssets.alt}
                                  className="w-full h-full object-cover"
                                  loading={shouldEagerLoad ? "eager" : "lazy"}
                                  decoding="async"
                                  style={{ imageRendering: "auto" }}
                                />
                              </div>
                            )}
                            {/* Play Button Overlay */}
                            <div
                              className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                              onClick={() => {
                                setPlayingVideoIndex(index);
                              }}
                            >
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg touch-target">
                                <Play className="w-5 h-5 sm:w-7 sm:w-7 text-gray-900 ml-1" fill="currentColor" />
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ) : hasCustomGif ? (
                      <div className="absolute inset-0 w-full h-full z-0">
                        <img
                          ref={shouldEagerLoad ? setHighPriority : null}
                          src={mediaAssets.gif}
                          alt={mediaAssets.alt}
                          className="w-full h-full object-cover"
                          loading={shouldEagerLoad ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>
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
                    {/* Quote */}
                    <p className="text-gray-700 text-xs sm:text-sm lg:text-sm leading-relaxed mb-4 line-clamp-3">
                      "{project.quote}"
                    </p>

                    {/* Author Info - Mobile Optimized */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        {/* Avatar Placeholder */}
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

                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-sm truncate">
                            {project.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {project.role}
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


