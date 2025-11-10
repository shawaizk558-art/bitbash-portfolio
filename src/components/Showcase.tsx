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
    quote: "BitBash built an Instagram automation bot that handles posting, engagement, and follower management. Features include scheduled posts, auto-likes, comments, DMs, and advanced analytics tracking.",
    name: "Instagram Bot",
    role: "Social Media Automation",
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
  const youtubeVideoIds: { [key: number]: string } = {
    0: "T--1C-VUY9g", // Petla
    1: "gDeo6V3VIbY", // Scraper Glass
    2: "c2HLeZPcbpE", // Actuary List
    3: "_g8e-Rme5mo", // Instagram Bot
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
                              index === 3 ? "/instagram.gif" :
                              index === 4 ? "/twitter.gif" :
                              index === 5 ? "/spotify.gif" :
                              "/facebook.gif"
                            } 
                            alt={
                              index === 0 ? "Petla website preview" : 
                              index === 1 ? "Scraper Glass website preview" : 
                              index === 2 ? "Actuary List website preview" :
                              index === 3 ? "Instagram Bot preview" :
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
                          src="https://cdn.simpleicons.org/instagram/E4405F" 
                          alt="Instagram Logo" 
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
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full">
                <div className="max-w-[40rem] ml-8">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "2,100+ Monthly Users in the Actuarial Niche"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    They delivered exactly what we needed, when we needed it, with exceptional quality and support.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 h-full rounded-r-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden">
                {/* Video placeholder with play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Author info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    {/* Profile picture */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">SA</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base">Syed</p>
                      <p className="text-white/80 text-xs sm:text-sm">Founder @ActuaryList</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Testimonial Card */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full">
                <div className="max-w-[40rem] ml-8">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "10,000+ Instagram Tasks Automated Daily"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    Their innovative approach and technical expertise exceeded all our expectations.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 h-full rounded-r-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden">
                {/* Video placeholder with play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Author info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    {/* Profile picture */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">JK</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base">Jackee</p>
                      <p className="text-white/80 text-xs sm:text-sm">Founder @InstaAppilot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Testimonial Card */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] h-full">
              {/* Left side - Text content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full">
                <div className="max-w-[40rem] ml-8">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "500+ Appointments Every Week"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    Professional, reliable, and always available when we needed support or updates.
                  </p>
                </div>
              </div>

              {/* Right side - Video thumbnail */}
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 h-full rounded-r-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden">
                {/* Video placeholder with play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Author info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                  <div className="flex items-center gap-3">
                    {/* Profile picture */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-base">LC</span>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm sm:text-base">Linda</p>
                      <p className="text-white/80 text-xs sm:text-sm">CEO @Petla</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

