import { Play, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote: "BitBash built Petla, a comprehensive platform for finding veterinarians in Germany. Features include location-based search, interactive maps, advanced filtering by specialty and services, and real-time availability tracking.",
    name: "Petla",
    role: "Veterinarian Discovery Platform",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash built Scraper Glass, a luxury-grade Instagram data extraction tool with unmatched speed and security. Features include no-code scraping, advanced filtering, and enterprise-level data export capabilities.",
    name: "Scraper Glass",
    role: "Data Extraction Platform",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash built Actuary List, a web application job board for actuaries that scrapes jobs and posts daily, all automated. Features login/signup, admin dashboards, and an email newsletter feature that sends personalized emails every week.",
    name: "Actuary List",
    role: "Full-Stack Web App",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash delivered a Threads blogger monitor that scrapes creators, tracks engagement, and schedules outreach in one dashboard.",
    name: "Threads Scraper",
    role: "Threads Automation Platform",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash developed a Twitter automation bot for content scheduling, engagement, and growth. Features include tweet scheduling, auto-retweets, replies, follower management, and trend monitoring.",
    name: "Twitter Bot",
    role: "Social Media Automation",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash created a Spotify automation bot for playlist management, music discovery, and analytics. Features include auto-playlist creation, track recommendations, listening statistics, and cross-platform integration.",
    name: "Spotify Bot",
    role: "Music Platform Automation",
    company: "",
    rating: 5,
    videoPlaceholder: "purple"
  },
  {
    quote: "BitBash built a powerful Facebook scraper for data extraction and market research. Features include profile data collection, post scraping, comment extraction, group member lists, and advanced filtering with stealth technology to ensure reliable data access.",
    name: "Facebook Scraper",
    role: "Data Extraction Platform",
    company: "",
    rating: 5,
    videoPlaceholder: "blue"
  },
  {
    quote: "Coming soon - A new project showcasing innovative automation solutions and cutting-edge technology.",
    name: "Project 8",
    role: "Automation Project",
    company: "",
    rating: 5,
    videoPlaceholder: "green"
  },
  {
    quote: "Coming soon - A new project showcasing innovative automation solutions and cutting-edge technology.",
    name: "Project 9",
    role: "Automation Project",
    company: "",
    rating: 5,
    videoPlaceholder: "orange"
  }
];

const gradientClasses = {
  purple: "from-purple-400 to-purple-600",
  blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-green-600",
  orange: "from-orange-400 to-orange-600",
  pink: "from-pink-400 to-pink-600",
  teal: "from-teal-400 to-teal-600"
};

export const Showcase = () => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const [isSyedTestimonialPlaying, setIsSyedTestimonialPlaying] = useState<boolean>(false);
  const [isOdetaTestimonialPlaying, setIsOdetaTestimonialPlaying] = useState<boolean>(false);
  const [isHugoTestimonialPlaying, setIsHugoTestimonialPlaying] = useState<boolean>(false);
  const youtubeVideoIds: { [key: number]: string } = {
    0: "T--1C-VUY9g", // Petla
    1: "gDeo6V3VIbY", // Scraper Glass
    2: "c2HLeZPcbpE", // Actuary List
    3: "EtKwnFJ9sRU", // Threads Scraper
    4: "MKem1ZQ2SkE", // Twitter Bot
    5: "PGcOVSEdLME", // Spotify Bot
    6: "iJgDAiV6OuM"  // Facebook Scraper
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-purple-600">500+</span> Completed Projects. Proven Engineering.
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Every system below was designed, built, and delivered by our in-house development team
          </p>
        </div>
        {/* Testimonial Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Video Thumbnail - Mobile Optimized */}
              <div className="relative aspect-video bg-gradient-to-br overflow-hidden group cursor-pointer">
                {(index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5 || index === 6) && youtubeVideoIds[index] ? (
                  /* Cards with GIF/YouTube video (Actuary List, Scraper Glass, Petla, Instagram Bot, Twitter Bot, Spotify Bot, Facebook Scraper) */
                  <>
                    {playingVideoIndex === index ? (
                      /* YouTube video embed - shows YouTube's own play button */
                      <div className="absolute inset-0 w-full h-full z-0">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeVideoIds[index]}?rel=0`}
                          className="w-full h-full"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={
                            index === 0 ? "Petla Video" : 
                            index === 1 ? "Scraper Glass Video" : 
                            index === 2 ? "Actuary List Video" :
                            index === 3 ? "Instagram Bot Video" :
                            index === 4 ? "Twitter Bot Video" :
                            index === 5 ? "Spotify Bot Video" :
                            "Facebook Scraper Video"
                          }
                        ></iframe>
                      </div>
                    ) : (
                      /* GIF Display with play button overlay */
                      <>
                        <div className="absolute inset-0 w-full h-full z-0">
                          <img 
                            src={
                              index === 0 ? "/petla.gif" : 
                              index === 1 ? "/scraperglass.gif" : 
                              index === 2 ? "/actuarylist.gif" :
                              index === 3 ? "/thread-scraper.gif" :
                              index === 4 ? "/twitter.gif" :
                              index === 5 ? "/spotify.gif" :
                              "/facebook.gif"
                            } 
                            alt={
                              index === 0 ? "Petla website preview" : 
                              index === 1 ? "Scraper Glass website preview" : 
                              index === 2 ? "Actuary List website preview" :
                              index === 3 ? "Threads Scraper preview" :
                              index === 4 ? "Twitter Bot preview" :
                              index === 5 ? "Spotify Bot preview" :
                              "Facebook Scraper preview"
                            } 
                            className="w-full h-full object-cover"
                            loading="eager"
                            style={{ imageRendering: 'auto' }}
                          />
                        </div>
                        {/* Play Button Overlay */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
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
                ) : index === 3 ? (
                  <div className="absolute inset-0 w-full h-full z-0">
                    <img
                      src="/thread-scraper.gif"
                      alt="Threads Scraper preview"
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[testimonial.videoPlaceholder as keyof typeof gradientClasses]} opacity-80`}></div>
                    
                    {/* Play Button - Mobile Optimized */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg touch-target">
                        <Play className="w-5 h-5 sm:w-7 sm:w-7 text-gray-900 ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Card Content - Mobile Optimized */}
              <div className="p-4 sm:p-6">
                {/* Quote */}
                <p className="text-gray-700 text-xs sm:text-sm lg:text-sm leading-relaxed mb-4 line-clamp-3">
                  "{testimonial.quote}"
                </p>

                {/* Author Info - Mobile Optimized */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {/* Avatar Placeholder */}
                    {index === 0 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-1">
                        <img 
                          src="/petla.svg" 
                          alt="Petla Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : index === 1 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                        <img 
                          src="/scraperglass-logo.png" 
                          alt="Scraper Glass Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : index === 2 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                        <img 
                          src="/actuarylist-logo.png" 
                          alt="Actuary List Logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : index === 3 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-1.5">
                        <img 
                          src="https://cdn.simpleicons.org/threads/000000" 
                          alt="Threads Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : index === 4 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-1.5">
                        <img 
                          src="https://cdn.simpleicons.org/x/000000" 
                          alt="Twitter/X Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : index === 5 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-1.5">
                        <img 
                          src="https://cdn.simpleicons.org/spotify/1DB954" 
                          alt="Spotify Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : index === 6 ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white p-1.5">
                        <img 
                          src="https://cdn.simpleicons.org/facebook/1877F2" 
                          alt="Facebook Logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating - Mobile Optimized */}
                  <div className="flex gap-0.5 flex-shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects - Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <a href="/projects" className="text-black hover:text-black font-bold">
            View all projects →
          </a>
        </div>

        {/* Testimonials Section Heading */}
        <div className="mt-32 sm:mt-40 mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 text-center">
            Stories From the People We Build For
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mt-0">
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
                    src="/Syed_Actuary-list.gif"
                    alt="Actuary List testimonial preview"
                        className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                    loading="eager"
                        decoding="async"
                        fetchPriority="high"
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
                      src="/odeta.gif"
                      alt="Odeta testimonial preview"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
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
                      src="/hugo.gif"
                      alt="Hugo Saunder testimonial preview"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
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
      </div>
    </section>
  );
};

