import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Globe, Target, Shield, GitBranch, Users } from "@/lib/icons";
import { OurValues } from "@/components/OurValues";
import { Benefits } from "@/components/Benefits";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Careers - Join BitBash | BitBash"
        description="Join the BitBash team to help people get more value from automation and web data. Explore open positions and build amazing software solutions."
        canonical="/jobs"
      />
      <Navigation />

      {/* Hero Section - Apify Style */}
      <section className="relative pt-24 pb-4 sm:pt-32 sm:pb-8 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Careers at BitBash
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join the BitBash team to help people get more value from automation and web data.
            </p>
            <div>
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                View open positions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BitBash & How We Work Sections */}
      <section className="pt-4 pb-16 sm:pt-8 sm:pb-20 md:pb-24 bg-white">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
            {/* Why Choose BitBash Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto border border-gray-200 rounded-2xl overflow-hidden h-full">
              {/* Left Side - Text Content */}
              <div className="flex flex-col p-8 sm:p-10 md:p-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why choose BitBash?
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed flex-grow mb-6">
                  The BitBash platform helps individuals, startups, and the world's largest companies
                  automate workflows, extract data from the web, and build full-stack applications.
                  As the generative AI revolution accelerates, the need for high-quality automation
                  and web data solutions is exploding.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg transition-colors group mt-auto"
                >
                  About BitBash
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Side - Image */}
              <div className="relative h-full">
                <div className="h-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src="/team Large.png"
                    alt="BitBash Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* How We Work Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto border border-gray-200 rounded-2xl overflow-hidden h-full">
              {/* Left Side - Image */}
              <div className="relative h-full order-1 lg:order-1">
                <div className="h-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src="/silent-zone Large.png"
                    alt="BitBash Office / Work Environment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Side - Text Content */}
              <div className="flex flex-col p-8 sm:p-10 md:p-12 order-2 lg:order-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  How we work
                </h2>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed flex-grow mb-6">
                  We're builders at heart. At BitBash, we value ownership, move fast, and believe in
                  forgiveness rather than permission. We keep things transparent, friendly, and fun.
                  We work remotely, collaborate asynchronously, and trust our team to deliver great
                  software that makes a real impact.
                </p>
                <Link
                  to="/our-work-model"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg transition-colors group mt-auto"
                >
                  BitBash culture 101
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <OurValues />

      {/* Benefits Section */}
      <Benefits />

      {/* Open Positions Section */}
      <section id="open-positions" className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Open Positions
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                Explore opportunities to join our growing team
              </p>
            </div>

            {/* Jobs will be listed here - You can add job cards later */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 md:p-12 border border-gray-200 shadow-sm">
              <div className="text-center">
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                  We're currently building our careers page. Check back soon for open positions!
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  Get in Touch
                  <Rocket className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Jobs;
