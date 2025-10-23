import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CTA = () => {
  return (
    <section className="relative bg-gray-50 pb-0 -mb-20 sm:-mb-32 -mt-20 sm:-mt-40">
      <div className="container-responsive">
        {/* Overlapping Card */}
        <div className="relative max-w-6xl mx-auto z-20">
          {/* Gradient Background Card - Mobile Optimized */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
            {/* Top-Left Gradient Blob - Mobile Optimized */}
            <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-300 via-blue-300 to-purple-200 rounded-full blur-3xl opacity-60"></div>
            
            {/* Bottom-Right Gradient Blob - Mobile Optimized */}
            <div className="absolute -bottom-16 sm:-bottom-32 -right-16 sm:-right-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-purple-300 via-pink-200 to-blue-200 rounded-full blur-3xl opacity-50"></div>
            
            {/* Center subtle glow - Mobile Optimized */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 sm:h-64 bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 blur-3xl opacity-30"></div>
            
            {/* Stacked Document Mockups - Bottom Center (Cut off from bottom) */}
            <div className="absolute bottom-0 left-0 right-0 hidden lg:block z-20 overflow-hidden" style={{ height: '350px' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center -space-x-16">
                {/* Document 1 - Left */}
                <div className="transform -rotate-12 translate-y-40 z-10">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">How to Optimize your API</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">Choosing the Right Product</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>When I first started selling on Amazon, I quickly realized that choosing the right product niche was crucial. It's all about understanding how the algorithm works and using that knowledge to your advantage.</p>
                      <p className="mt-2">One of the most effective strategies I've adopted is focusing on relevant keywords. These aren't just any keywords...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Things to Keep in Mind</span>
                    </div>
                  </div>
                </div>

                {/* Document 2 - Center */}
                <div className="transform translate-y-40 z-30">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Browser Automation Mastery</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">Selenium & Puppeteer Setup</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>When I first started with browser automation, I quickly realized that mastering Selenium and Puppeteer was crucial for my workflow. It's all about understanding how the browser driver works and using that knowledge to your advantage.</p>
                      <p className="mt-2">One of the most effective strategies I've adopted is focusing on element selectors. These aren't just any selectors...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Best Practices to Follow</span>
                    </div>
                  </div>
                </div>

                {/* Document 3 - Right */}
                <div className="transform rotate-12 translate-y-36 z-10">
                  <div className="bg-white rounded-t-lg shadow-2xl p-5 w-64">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">h1</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">Optimize your Automation</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs text-gray-600">The Right Workflow</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                      <p>Setting up automated workflows was crucial for scaling my operations. I quickly realized that proper error handling and retry logic were essential components.</p>
                      <p className="mt-2">One of the most effective strategies I've adopted is focusing on modular automation. Build reusable components...</p>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">h2</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">Key Implementation Tips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content - Mobile Optimized */}
            <div className="relative z-10 px-4 sm:px-8 md:px-16 pt-12 sm:pt-16 md:pt-20 pb-32 sm:pb-48 md:pb-60">
              <div className="text-center space-responsive-md">
                <h2 className="text-responsive-3xl sm:text-responsive-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Stop Wasting Time on Repetitive Tasks
                </h2>
                <p className="text-responsive-base sm:text-responsive-lg text-gray-700 max-w-2xl mx-auto">
                  Get a custom automation plan for your business. See 70-90% time savings with intelligent automation.
                </p>
                
                {/* Email Form - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto pt-2">
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    className="h-12 sm:h-14 text-responsive-base bg-white border-0 shadow-lg flex-1 w-full"
                  />
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white h-12 sm:h-14 px-6 sm:px-8 font-semibold shadow-lg text-responsive-sm"
                  >
                    <span className="hidden sm:inline">Book Free Automation Audit</span>
                    <span className="sm:hidden">Book Free Audit</span>
                  </Button>
                </div>

                {/* Social Proof - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 pb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white shadow-lg"
                      />
                    ))}
                  </div>
                  <p className="text-responsive-xs text-gray-700 text-center sm:text-left">
                    Trusted by <span className="font-bold text-gray-900">50+</span> Businesses Worldwide
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
