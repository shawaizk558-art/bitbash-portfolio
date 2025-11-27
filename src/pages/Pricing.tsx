import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Check, Info, Database, Zap, Code } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { useNavigate } from "react-router-dom";
import { Showcase } from "@/components/Showcase";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Pricing
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent project-based pricing. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

            {/* Card 1: Scraping Project */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Scraping Project</h3>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline flex-wrap">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$400 - $1,500</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">One-time fixed cost</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-8">
                <p className="text-gray-700 font-medium text-sm">Perfect for data extraction needs</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Custom Data Extraction</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Anti-bot handling & Proxy rotation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Output in CSV, JSON, or Excel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Automated scheduled runs</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors mt-auto"
              >
                Get Started
              </button>
            </div>

            {/* Card 2: Automation Project - Highlighted */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-600 relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-600">Automation Project</h3>
                </div>
                <div className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full">
                  POPULAR
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline flex-wrap">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">$700 - $3,000</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">One-time fixed cost</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-8">
                <p className="text-gray-700 font-medium text-sm">Streamline your business workflows</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Workflow Automation Scripts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">API Integrations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Custom Bots (Discord, Telegram, Slack)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Error Handling & Logging</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Cloud Deployment Setup</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors mt-auto shadow-lg shadow-purple-200"
              >
                Start Automating
              </button>
            </div>

            {/* Card 3: Custom Solution */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Custom Solution</h3>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">Let's Talk</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Tailored to your requirements</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-8">
                <p className="text-gray-700 font-medium text-sm">For complex platforms & SaaS</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Full-Stack Web & Mobile Apps</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">SaaS MVP Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">AI Model Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Dedicated Development Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Long-term Maintenance</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors mt-auto"
              >
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="pt-16 pb-16 bg-white">
        <div className="container-responsive text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Exceptional Work Delivered by Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the results of our dedicated engineering and design expertise.
          </p>
        </div>
      </section>

      <Showcase
        showHeader={false}
        showTestimonials={false}
        paddingClass="pt-0 pb-16 sm:pb-24 bg-white"
      />

      {/* Pricing FAQ */}
      <FAQ variant="pricing" />

      <Footer isHomepage={false} />
    </div>
  );
};

export default Pricing;
