import { useState } from "react";
import { Play } from "lucide-react";
import { AutoPlayVideo } from "@/components/AutoPlayVideo";
import { getVideoSources, getPosterPath } from "@/lib/mediaAssets";

export const Testimonials = () => {
  const [isKareemPlaying, setIsKareemPlaying] = useState(false);
  const [isOdetaPlaying, setIsOdetaPlaying] = useState(false);
  const [isHugoPlaying, setIsHugoPlaying] = useState(false);
  const [isSyedPlaying, setIsSyedPlaying] = useState(false);

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mt-8 sm:mt-0">
            Real feedback from people we've worked with
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20">
          {/* Kareem Testimonial */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
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
              <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {isKareemPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/m-dRE1dj5-k?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Kareem Testimonial"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <AutoPlayVideo
                      sources={getVideoSources("kareem")}
                      poster={getPosterPath("kareem")}
                      alt="Kareem testimonial preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!isKareemPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img src="/kareem.webp" alt="Kareem" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Kareem</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">CTO @TechNova</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 shadow-lg w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-300 ease-out flex-shrink-0"
                        onClick={() => setIsKareemPlaying(true)}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Odeta Testimonial */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "They made it simple — and got it done right"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    BitBash worked with us like a true partner. They took our ideas, kept everything clear and easy, moved fast, and delivered work we could count on.
                  </p>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {isOdetaPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/8-tw8Omw9qk?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Odeta Testimonial"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <AutoPlayVideo
                      sources={getVideoSources("odeta")}
                      poster={getPosterPath("odeta")}
                      alt="Odeta testimonial preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!isOdetaPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img src="/odeta-pfp.webp" alt="Odeta" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Odeta</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">Head of Media @WNP</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 shadow-lg w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-300 ease-out flex-shrink-0"
                        onClick={() => setIsOdetaPlaying(true)}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hugo Testimonial */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
              <div className="p-8 sm:p-12 flex flex-col justify-center h-full items-center lg:items-start">
                <div className="max-w-[40rem] w-full lg:ml-8 text-center lg:text-left">
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                    "Outstanding quality and professionalism"
                  </blockquote>
                  <p className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed">
                    The team delivered exceptional results with great attention to detail and clear communication throughout the project.
                  </p>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-green-100 to-teal-100 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {isHugoPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/MLkvGB8ZZIk?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Hugo Sanders Testimonial"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <AutoPlayVideo
                      sources={getVideoSources("hugo")}
                      poster={getPosterPath("hugo")}
                      alt="Hugo Sanders testimonial preview"
                      className="w-full h-full object-cover"
                      loop={true}
                    />
                  </div>
                )}
                {!isHugoPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img src="/hugo-pfp.webp" alt="Hugo Sanders" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Hugo Sanders</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">CTO @Krov Tech</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 shadow-lg w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-300 ease-out flex-shrink-0"
                        onClick={() => setIsHugoPlaying(true)}
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 text-black ml-0.5" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Syed Testimonial */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden min-h-[340px] sm:min-h-[400px] lg:h-[400px] border border-gray-200">
            <div className="flex flex-col lg:grid lg:grid-cols-[63%_37%] h-full">
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
              <div className="relative bg-gradient-to-br from-purple-100 to-purple-200 h-64 sm:h-72 lg:h-full rounded-3xl lg:rounded-l-3xl lg:rounded-r-none lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 group">
                {isSyedPlaying ? (
                  <div className="absolute inset-0 w-full h-full z-0 bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/6AwB5omXrIM?rel=0&modestbranding=1&autoplay=1&playsinline=1&mute=1"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title="Actuary List Testimonial - Syed"
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 z-0" style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}>
                      <AutoPlayVideo
                        sources={getVideoSources("syed")}
                        poster={getPosterPath("syed")}
                        alt="Actuary List testimonial preview background"
                        className="w-full h-full object-cover object-[center_35%]"
                        loop={true}
                      />
                    </div>
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <div className="relative w-full h-full max-w-[50%] sm:max-w-[55%] lg:max-w-[60%] max-h-full">
                        <AutoPlayVideo
                          sources={getVideoSources("syed")}
                          poster={getPosterPath("syed")}
                          alt="Actuary List testimonial preview"
                          className="w-full h-full object-contain"
                          loop={true}
                        />
                      </div>
                    </div>
                  </>
                )}
                {!isSyedPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6 z-20">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <img src="/syed-pfp.webp" alt="Syed" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-bold text-sm sm:text-base truncate">Syed</p>
                          <p className="text-white/80 text-xs sm:text-sm truncate">Founder @ActuaryList</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-full bg-white/90 group-hover:bg-red-600 shadow-lg w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-300 ease-out flex-shrink-0"
                        onClick={() => setIsSyedPlaying(true)}
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

