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
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl"
              >
                View open positions
                <ArrowRight className="w-5 h-5" />
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
                  {/* Placeholder for team image - Replace with actual image */}
                  <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 rounded-full bg-purple-600 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Team Photo</p>
                      <p className="text-sm text-gray-500 mt-2">Add your team image here</p>
                    </div>
                  </div>
                  {/* Uncomment and use when you have the image:
                  <img
                    src="/team-photo.jpg"
                    alt="BitBash Team"
                    className="w-full h-full object-cover"
                  />
                  */}
                </div>
              </div>
            </div>

            {/* How We Work Section - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto border border-gray-200 rounded-2xl overflow-hidden h-full">
              {/* Left Side - Text Content */}
              <div className="flex flex-col p-8 sm:p-10 md:p-12">
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
                  to="/how-we-work"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold text-base sm:text-lg transition-colors group mt-auto"
                >
                  BitBash culture 101
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right Side - Image */}
              <div className="relative h-full">
                <div className="h-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-purple-50">
                  {/* Placeholder for office/work image - Replace with actual image */}
                  <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 rounded-full bg-purple-600 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 font-medium">Office / Work Photo</p>
                      <p className="text-sm text-gray-500 mt-2">Add your work environment image here</p>
                    </div>
                  </div>
                  {/* Uncomment and use when you have the image:
                  <img
                    src="/office-photo.jpg"
                    alt="BitBash Team Working"
                    className="w-full h-full object-cover"
                  />
                  */}
                </div>
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
