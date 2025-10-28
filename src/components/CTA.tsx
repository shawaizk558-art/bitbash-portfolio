import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CTA = () => {
  return (
    <section className="relative bg-gray-50 pb-0 -mb-20 sm:-mb-32 -mt-20 sm:-mt-40">
      <div className="container-responsive">
        {/* Overlapping Card */}
        <div className="relative max-w-7xl mx-auto z-20">
          {/* Gradient Background Card - Mobile Optimized */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            {/* Top-Left Smoke Effect */}
            <div className="absolute -top-8 sm:-top-16 -left-8 sm:-left-16 w-80 h-80 sm:w-96 sm:h-96 opacity-80">
              <img 
                src="/splash.png" 
                alt="Splash effect" 
                className="w-full h-full object-cover rotate-12 blur-[2px]"
              />
            </div>
            
            {/* Top-Right Smoke Effect */}
            <div className="absolute -top-8 sm:-top-16 -right-8 sm:-right-16 w-80 h-80 sm:w-96 sm:h-96 opacity-80">
              <img 
                src="/splash.png" 
                alt="Splash effect" 
                className="w-full h-full object-cover -rotate-12 blur-[2px]"
              />
            </div>
            
            {/* Top-Left Gradient Blob - Mobile Optimized */}
            <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-200 rounded-full blur-3xl opacity-60"></div>
            
            {/* Top-Right Gradient Blob - Mobile Optimized */}
            <div className="absolute -top-16 sm:-top-32 -right-16 sm:-right-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-purple-300 via-purple-400 to-purple-200 rounded-full blur-3xl opacity-60"></div>
            
            {/* Center subtle glow - Mobile Optimized */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 sm:h-64 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 blur-3xl opacity-30"></div>
            
            {/* Stacked Document Mockups - Bottom Center (Cut off from bottom) */}
            <div className="absolute bottom-0 left-0 right-0 hidden lg:block z-20 overflow-hidden" style={{ height: '350px' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center -space-x-16">
                {/* Document 1 - Left */}
                <div className="transform -rotate-12 translate-y-40 z-10">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Client Success: E-commerce Automation</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">300% Revenue Increase</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>Our client saw a 300% increase in revenue after implementing our custom automation system. The solution automated their entire order processing workflow, reducing manual work by 80%.</p>
                      <p className="mt-2">The system now handles 500+ orders daily with zero errors, saving them 15 hours of manual work every day...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">ROI: 400% in 3 months</span>
                    </div>
                  </div>
                </div>

                {/* Document 2 - Center */}
                <div className="transform translate-y-32 z-30">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Client Case: Data Extraction</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">50,000+ Records Daily</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>We built a custom data extraction system that processes 50,000+ records daily for our client. The automation replaced 3 full-time employees and reduced costs by 70%.</p>
                      <p className="mt-2">The system runs 24/7 with 99.9% uptime, extracting data from multiple sources and delivering clean, structured results...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Cost Savings: $180K/year</span>
                    </div>
                  </div>
                </div>

                {/* Document 3 - Right */}
                <div className="transform rotate-12 translate-y-36 z-10">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Client Win: AI Chatbot</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">90% Customer Satisfaction</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>Our AI chatbot solution increased customer satisfaction by 90% and reduced support tickets by 60%. The bot handles 200+ conversations daily with human-like responses.</p>
                      <p className="mt-2">The system integrates seamlessly with their existing CRM and provides instant responses 24/7, improving customer experience significantly...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Response Time: &lt;1 second</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content - Mobile Optimized */}
            <div className="relative z-10 px-4 sm:px-8 md:px-16 pt-16 sm:pt-20 md:pt-24 pb-40 sm:pb-56 md:pb-72">
              <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                <h2 className="text-responsive-3xl sm:text-responsive-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-4">
                  Let's Build Something That Works.
                </h2>
                <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto -mt-2">
                  Schedule your consultation and turn your idea into a real, working product.
                </p>
                
                {/* Email Form - Mobile Optimized */}
                <div className="relative max-w-3xl mx-auto pt-4">
                  <div className="relative">
                    <Input 
                      type="email" 
                      placeholder="your@email.com"
                      className="h-12 sm:h-16 text-responsive-base shadow-lg w-full rounded-2xl sm:pr-52"
                    />
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="h-12 sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 py-4 px-6 text-lg font-semibold rounded-xl w-full sm:w-[180px] text-white hover:scale-100 shadow-none hover:shadow-none"
                      style={{
                        height: '48px'
                      }}
                    >
                      <span className="hidden sm:inline">Schedule a Call</span>
                      <span className="sm:hidden">Contact Us</span>
                    </Button>
                  </div>
                </div>

                {/* Social Proof - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-lg"
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 text-center sm:text-left">
                    <span className="font-semibold text-gray-900">25+ Expert Developers</span>, One Mission — Build Better Software
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
