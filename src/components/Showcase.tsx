import { Play, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const gradientClasses = {
  purple: "from-purple-400 to-purple-600",
  blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-green-600",
  orange: "from-orange-400 to-orange-600",
  pink: "from-pink-400 to-pink-600",
  teal: "from-teal-400 to-teal-600",
};

interface ShowcaseProps {
  limit?: number;
  showHeader?: boolean;
  showViewAllLink?: boolean;
  showTestimonials?: boolean;
  paddingClass?: string;
}

export const Showcase = ({
  limit,
  showHeader = true,
  showViewAllLink = true,
  showTestimonials = true,
  paddingClass,
}: ShowcaseProps) => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isSyedTestimonialPlaying, setIsSyedTestimonialPlaying] = useState<boolean>(false);
  const [isOdetaTestimonialPlaying, setIsOdetaTestimonialPlaying] = useState<boolean>(false);
  const [isHugoTestimonialPlaying, setIsHugoTestimonialPlaying] = useState<boolean>(false);
  const [isKareemTestimonialPlaying, setIsKareemTestimonialPlaying] = useState<boolean>(false);

  const reorderedProjects = [...projects];
  if (reorderedProjects.length > 2) {
    [reorderedProjects[1], reorderedProjects[2]] = [reorderedProjects[2], reorderedProjects[1]];
  }

  const projectsToDisplay = limit ? reorderedProjects.slice(0, limit) : reorderedProjects;

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

  return (
    <section className={`${paddingClass ?? "py-12 sm:py-16 md:py-24"} bg-white`}>
      <div className="container-responsive">
        {/* Header */}
        {showHeader && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-purple-600">500+</span> Completed Projects. Proven Engineering.
            </h2>
            <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Every system below was designed, built, and delivered by our in-house development team
            </p>
          </div>
        )}
        {/* Testimonial Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {projectsToDisplay.map((project, index) => {
            const mediaAssets = getMediaAssets(project.slug);
            const hasCustomGif = Boolean(mediaAssets.gif);

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
                              loading="eager"
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
                      ref={setHighPriority}
                      src={mediaAssets.gif}
                      alt={mediaAssets.alt}
                      className="w-full h-full object-cover"
                      loading="eager"
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

        {/* View All Projects - Button */}
        {showViewAllLink && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a href="/projects" className="text-black hover:text-black font-bold">
              View all projects →
            </a>
          </div>
        )}

        {/* Testimonials Section Heading */}
        {showTestimonials && (
          <div className="mt-32 sm:mt-40 mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 text-center">
              Stories From the People We Build For
            </h2>
          </div>
        )}

        {showTestimonials && (
          <>
        {/* Kareem Testimonial Card */}
        <div className="mt-0">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "Need a custom solution? This is the only team I'd trust without blinking."
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    "Every workflow, integration, and hand-off was engineered from scratch around how we operate. If you need a custom solution, this is the crew that actually builds it."
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {isKareemTestimonialPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/m-dRE1dj5-k?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Kareem Testimonial"
                    ></iframe>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      ref={setHighPriority}
                      src="/kareem.gif"
                      alt="Kareem testimonial preview"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                )}

                {!isKareemTestimonialPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img
                            src="/kareem.jpg"
                            alt="Kareem profile photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Kareem</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">CTO @TechNova</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 backdrop-blur-sm shadow-lg w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 transition-transform transition-colors duration-300 ease-out flex-shrink-0"
                        aria-label="Play testimonial video"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsKareemTestimonialPlaying(true);
                        }}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "2,100+ Monthly Users in the Actuarial Niche"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    They delivered exactly what we needed, when we needed it, with exceptional quality and support.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {/* Toggle between GIF placeholder and embedded YouTube Shorts */}
                {isSyedTestimonialPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/6AwB5omXrIM?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Actuary List Testimonial - Syed"
                    ></iframe>
                  </div>
                ) : (
                  <>
                {/* Video placeholder with play button */}
                <div className="absolute inset-0">
                  <img
                    ref={setHighPriority}
                    src="/Syed_Actuary-list.gif"
                    alt="Actuary List testimonial preview"
                        className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                    loading="eager"
                        decoding="async"
                  />
                </div>
                  </>
                )}

                {/* Author info overlay */}
                {!isSyedTestimonialPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                    {/* Profile picture */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img
                            src="/syed-pfp.png"
                            alt="Syed profile photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Syed</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">Founder @ActuaryList</p>
                        </div>
                    </div>
                      {/* Small play button on the right */}
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 backdrop-blur-sm shadow-lg w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 transition-transform transition-colors duration-300 ease-out flex-shrink-0"
                        aria-label="Play testimonial video"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSyedTestimonialPlaying(true);
                        }}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Second Testimonial Card */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "They made it simple — and got it done right"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    BitBash worked with us like a true partner. They took our ideas, kept
                    everything clear and easy, moved fast, and delivered work we could count on.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {/* Toggle between GIF and embedded YouTube video */}
                {isOdetaTestimonialPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/8-tw8Omw9qk?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Odeta Testimonial"
                    ></iframe>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      ref={setHighPriority}
                      src="/odeta.gif"
                      alt="Odeta testimonial preview"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                      loading="eager"
                      decoding="async"
                    />
                </div>
                )}
                {/* Author info overlay with small play button on the right */}
                {!isOdetaTestimonialPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      {/* Profile + name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img
                            src="/odeta-pfp.png"
                            alt="Odeta profile photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Odeta</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">Head of Media @WNP</p>
                        </div>
                    </div>
                      {/* Small play button */}
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 backdrop-blur-sm shadow-lg w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 transition-transform transition-colors duration-300 ease-out flex-shrink-0"
                        aria-label="Play testimonial video"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOdetaTestimonialPlaying(true);
                        }}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Third Testimonial Card */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "We stopped thinking about fixing — and we started growing"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    BitBash made growth feel simple. They cleared the noise, moved fast,
                    and delivered results we’d been chasing for months.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {/* Toggle between GIF and embedded YouTube video */}
                {isHugoTestimonialPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/MLkvGB8ZZIk?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Hugo Saunder Testimonial"
                    ></iframe>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img
                      ref={setHighPriority}
                      src="/hugo.gif"
                      alt="Hugo Saunder testimonial preview"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                      loading="eager"
                      decoding="async"
                    />
                </div>
                )}
                {/* Author info overlay with small play button on the right */}
                {!isHugoTestimonialPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      {/* Profile + name */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img
                            src="/hugo-pfp.jpeg"
                            alt="Hugo Saunder profile photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Hugo Saunder</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">UI/UX Engineer @Cruva</p>
                        </div>
                    </div>
                      {/* Small play button */}
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 backdrop-blur-sm shadow-lg w-9 h-9 sm:w-10 sm:h-10 hover:scale-105 transition-transform transition-colors duration-300 ease-out flex-shrink-0"
                        aria-label="Play testimonial video"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsHugoTestimonialPlaying(true);
                        }}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

          </>
        )}
      </div>
    </section>
  );
};

