import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Play } from "lucide-react";

const projects = Array.from({ length: 15 }).map((_, idx) => ({
  title: `Project ${idx + 1}`,
  quote:
    "High-impact engineering delivered on time. Tailored automation and product development with measurable results.",
  placeholder: idx % 5 === 0 ? "purple" : idx % 5 === 1 ? "blue" : idx % 5 === 2 ? "green" : idx % 5 === 3 ? "orange" : "teal",
}));

const gradient: Record<string, string> = {
  purple: "from-purple-400 to-purple-600",
  blue: "from-blue-400 to-blue-600",
  green: "from-green-400 to-green-600",
  orange: "from-orange-400 to-orange-600",
  teal: "from-teal-400 to-teal-600",
};

const Projects = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Projects Hero Section - match Blog hero hierarchy/sizes */}
      <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8 lg:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60 pointer-events-none" />
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="container-responsive relative z-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-responsive-lg">
            <div className="mt-4 sm:mt-6 lg:mt-10">
              <h1 className="text-3xl sm:text-responsive-3xl sm:text-responsive-4xl md:text-6xl font-bold text-gray-900">
                BitBash <span className="text-purple-600">Projects</span>
              </h1>
            </div>
            <div className="hidden sm:block space-responsive-sm">
              <div className="space-y-1 sm:space-y-1.5">
                <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black font-semibold whitespace-nowrap">
                  500+ completed systems delivered with precision engineering and measurable impact
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black whitespace-nowrap">
                  Explore recent work across automation, scraping, data platforms, and SaaS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-12 sm:pb-16 md:pb-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((p, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient[p.placeholder]} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 sm:w-7 sm:h-7 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 truncate">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                    {p.quote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Projects;


