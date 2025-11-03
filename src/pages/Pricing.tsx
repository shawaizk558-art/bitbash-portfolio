import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
// No CTA buttons in hero to match blog hero styling
import {
  Shield,
  Users,
  DollarSign,
  Code
} from "lucide-react";

const Pricing = () => {
  // Removed detailed pricing datasets to simplify the page per request
  // Dollar rain removed per request

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - match Blog hero sizes and structure */}
      <section className="relative min-h-[50vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8 lg:pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60 pointer-events-none" />
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="container-responsive relative z-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center space-y-4 sm:space-responsive-lg">
            <div className="mt-4 sm:mt-6 lg:mt-10">
              <h1 className="text-3xl sm:text-responsive-3xl sm:text-responsive-4xl md:text-6xl font-bold text-gray-900">
                Pricing
              </h1>
            </div>
            <div className="hidden sm:block space-responsive-sm">
              <div className="space-y-1 sm:space-y-1.5">
                <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black font-semibold whitespace-nowrap">
                  Transparent, value‑based pricing tailored to your project scope and timeline
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black whitespace-nowrap">
                  No hidden fees. Clear deliverables. Enterprise‑grade quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models (style-matched) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Left: Content list */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Engagement Models
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                Choose the collaboration model that best fits your scope, risk profile, and timelines. We keep pricing transparent regardless of the engagement.
              </p>

              <div className="space-y-8">
                {/* Fixed Cost */}
                <div className="flex items-start gap-4">
                  <DollarSign className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Fixed Cost</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Best for well-defined scope and timelines. Predictable budgeting and clear milestones with transparent delivery.
                    </p>
                  </div>
                </div>

                {/* Staff Augmentation */}
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Staff / Resource Augmentation</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Scale your team quickly with our experienced engineers embedded into your workflow. Flexible, month-to-month.
                    </p>
                  </div>
                </div>

                {/* Startup */}
                <div className="flex items-start gap-4">
                  <Code className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Startup</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Fast iterations for MVPs with limited runway. Lean scope, rapid delivery, and a pathway to scale.
                    </p>
                  </div>
                </div>

                {/* Dedicated Team */}
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Dedicated Development Team</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      A cross‑functional squad aligned to your roadmap. Ideal for long‑term ownership and complex systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="hidden sm:flex items-center justify-center">
              <div className="w-full max-w-xl aspect-square bg-gradient-to-br from-purple-50 to-white rounded-3xl border border-gray-200 shadow-md overflow-hidden flex items-center justify-center relative">
                <img src="/splash.png" alt="Pricing illustration" className="w-4/5 h-auto object-contain" />
                {/* Dollar sign overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                    <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
                  </div>
                </div>
                {/* Dollar rain overlay removed */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified per request: removed detailed pricing sections */}

      <Footer isHomepage={false} />
    </div>
  );
};

export default Pricing;
