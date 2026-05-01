import { Check, Database, Zap, Code, Bot, Rocket } from "lucide-react";
//import { ContactButton } from "@/components/ContactButton";
import { Link } from "react-router-dom";

export const HomepagePricing = () => {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 bg-white">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Fixed cost projects and flexible engagement models. No hidden fees.
          </p>
        </div>

        {/* Three Cards - Horizontal Layout */}
        <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
          {/* Card 1: Automation Systems */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section */}
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">Automation Systems</h3>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Streamline business workflows with custom automation scripts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Seamless API integrations connecting your favorite tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Custom bots for Discord, Telegram, or Slack</span>
                  </div>
                </div>

               {/* <div className="w-full lg:w-auto flex-shrink-0">
                  <ContactButton />
                </div>*/}
              </div>
            </div>
          </div>

          {/* Card 2: Data Scraping Systems */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section */}
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <Database className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">Data Scraping Systems</h3>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Custom data extraction tailored to your specific requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Advanced anti-bot handling with automatic proxy rotation included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Receive clean data in CSV, JSON, or Excel</span>
                  </div>
                </div>

                {/*<div className="w-full lg:w-auto flex-shrink-0">
                  <ContactButton />
                </div>*/}
              </div>
            </div>
          </div>

          {/* Card 3: Full-Stack Development */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <Code className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">Full-Stack Development</h3>
                  </div>
                </div>
              </div>
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Complete frontend and backend engineering for production-ready platforms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Scalable API architecture, authentication, and database integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Performance-focused deployment with long-term maintainability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: AI Solutions */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">AI Solutions</h3>
                  </div>
                </div>
              </div>
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Custom AI workflows and copilots aligned with your business processes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">LLM integrations, prompt pipelines, and intelligent automation systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Reliable deployment, monitoring, and iterative model improvements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: SaaS & MVP Development */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2.5">
                    <Rocket className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">SaaS &amp; MVP Development</h3>
                  </div>
                </div>
              </div>
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Fast MVP delivery focused on real user validation and market fit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Product architecture designed for quick iterations and future scaling</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Launch-ready builds with analytics, stability, and growth foundations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Monthly basis + comparison header */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Basis</h3>
                <p className="text-base text-gray-600">
                  Hire dedicated developers on a monthly basis.
                </p>
              </div>

              {/* Comparison Table - Only Header Row */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[600px] grid grid-cols-3 gap-x-4">
                  {/* Junior Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4">Junior Developer</h3>
                  </div>

                  {/* Associate Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4">Associate Developer</h3>
                  </div>

                  {/* Senior Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4">Senior Developer</h3>
                  </div>
                </div>
              </div>

              {/* View Full Pricing CTA */}
              <div className="mt-8 text-center">
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-bold text-base px-6 py-3 rounded-md hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 whitespace-nowrap"
                >
                  View Full Pricing
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

