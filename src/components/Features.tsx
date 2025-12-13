
import { Globe, Smartphone, Database, Zap, Shield, Code, Cloud, Bot, Target, BarChart3, TrendingUp } from "@/lib/icons";
import { coreServices } from "@/data/services";
import { useState, useEffect } from "react";

export const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const tabs = coreServices.map((service) => ({
    icon: service.icon,
    title: service.name,
    label: service.label,
    image: service.image,
    description: service.summary
  }));

  // Preload all images on component mount
  useEffect(() => {
    tabs.forEach((tab) => {
      const img = new Image();
      img.src = tab.image;
    });
  }, []);

  // Auto-play: Cycle through all tabs automatically
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        // Cycle to next tab, loop back to 0 after reaching last tab
        return (prevTab + 1) % tabs.length;
      });
    }, 4000); // Change tab every 4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [isPaused, tabs.length]);

  // Resume auto-play after user interaction
  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
      }, 8000); // Resume after 8 seconds of no interaction

      return () => clearTimeout(timer);
    }
  }, [isPaused]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsPaused(true); // Pause auto-play when user manually clicks
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-white overflow-x-hidden">
      <div className="container-responsive">
        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-16 space-responsive-sm px-4 md:px-8 w-full box-border">
          <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight px-2 sm:px-0 md:px-6 break-words overflow-wrap-anywhere">
            More Than Just Developers. Your Complete Product Engineering Team
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 px-4 sm:px-0 md:px-8">
            Helping founders, companies, agencies and teams build automation-driven apps, AI tools, and full-stack platforms that deliver real results.
          </p>
        </div>

        {/* Large Showcase Card with Tabs */}
        <div className="shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Tab Navigation - Mobile Optimized with Horizontal Scroll */}
          <div className="relative flex border-b border-gray-200 md:overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-shrink-0 min-w-0 flex-1 md:min-w-[140px] sm:min-w-[150px] md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0 p-2 sm:p-3 md:p-4 lg:p-5 text-center cursor-pointer hover:bg-gray-50 transition-colors relative min-h-[44px] lg:min-h-0
                  ${activeTab === index ? 'bg-white' : 'bg-gray-50'}
                  ${index > 0 ? 'border-l border-gray-200' : ''}`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-600 mx-auto mb-0.5 sm:mb-1 md:mb-2" />
                <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight">{tab.title}</h4>

                {/* Animated underline for each tab */}
                {activeTab === index && (
                  <div
                    key={`tab-${index}-${activeTab}`}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 z-10 animate-expand"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Photo Display Area - Mobile Optimized */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-2 sm:p-4 relative overflow-visible">
            <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4 w-full max-w-4xl mx-auto transform translate-y-4 sm:translate-y-6 md:translate-y-8 relative">
              {/* Container for maintaining aspect ratio */}
              <div className="relative w-full overflow-hidden rounded-lg">
                {/* Invisible spacer to maintain container height based on active image */}
                <img
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  className="w-full h-auto rounded-lg opacity-0 pointer-events-none"
                />
                {/* All images stacked absolutely for seamless crossfade */}
                {tabs.map((tab, index) => (
                  <img
                    key={index}
                    src={tab.image}
                    alt={tab.title}
                    className={`w-full h-auto rounded-lg absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${activeTab === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Callout Box - Dynamic based on active tab - Only show for options 1, 2, and 5 */}
            {(activeTab === 0 || activeTab === 1 || activeTab === 4) && (
              <div className={`hidden sm:block relative mt-4 sm:mt-6 max-w-[300px] mx-auto sm:mx-0 sm:absolute sm:mt-0 z-20 ${activeTab === 0 ? 'sm:left-8 sm:top-40 md:top-44' :
                activeTab === 4 ? 'sm:right-4 sm:top-24 md:top-28' :
                  'sm:right-4 sm:top-10'
                }`} style={{ overflow: 'visible' }}>
                <div className="bg-slate-800 text-white rounded-lg shadow-lg p-4 sm:p-5 relative">
                  <p className="text-sm sm:text-base leading-relaxed relative z-10">
                    {tabs[activeTab].description}
                  </p>
                </div>
                {/* Triangular pointer - right side for first option, left side for second and fifth option */}
                {activeTab === 0 ? (
                  <div
                    className="absolute top-1/2 w-0 h-0 border-t-[12px] border-b-[12px] border-l-[12px] border-transparent border-l-slate-800"
                    style={{
                      right: '-12px',
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                ) : (
                  <div
                    className="absolute top-1/2 w-0 h-0 border-t-[12px] border-b-[12px] border-r-[12px] border-transparent border-r-slate-800"
                    style={{
                      left: '-12px',
                      transform: 'translateY(-50%)'
                    }}
                  ></div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card 1: Automation System - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-10 py-0 flex flex-col pb-4 sm:pb-6 order-2 lg:order-1">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-4 sm:pt-6 md:pt-8">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">AUTOMATION SYSTEM</span>
              </div>

              {/* Content positioned manually */}
              <div className="flex flex-col mt-2 sm:mt-3 md:mt-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  Custom Automation Solutions
                </h3>
                <div className="space-y-2 sm:space-y-3 mb-0">
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">Automation & AI Bots for business workflows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">Custom scripts and bots that streamline processes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">Intelligent task automation and scheduling</p>
                  </div>
                </div>
              </div>

              {/* Button as separate div */}
              <div className="mt-4 sm:mt-16 md:mt-20 mb-0">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  Explore Automation →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white flex items-center justify-end pl-4 pb-4 pr-0 pt-0 order-1 lg:order-2">
              <img
                src="/stack3.png"
                alt="Automation System Stack"
                className="w-full md:w-[105%] h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card 2: AI Solutions - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white rounded-2xl sm:rounded-none border-t border-l border-r border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Visual mockups - Mobile Optimized */}
            <div className="bg-white flex items-center justify-start lg:order-1 pr-4 pb-4 pl-0 pt-0 order-1 lg:order-1">
              <img
                src="/stack2.png"
                alt="AI Solutions Stack"
                className="w-full md:w-[95%] h-auto object-cover"
              />
            </div>

            {/* Right side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col lg:order-2 pb-4 sm:pb-8 order-2 lg:order-2">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-4 sm:pt-8 md:pt-10">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">AI SOLUTIONS</span>
              </div>

              {/* Content positioned manually */}
              <div className="flex flex-col mt-2 sm:mt-4 md:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  Intelligent Machine Learning Systems
                </h3>
                <div className="space-y-2 sm:space-y-4 md:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Custom AI models and machine learning solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Predictive analytics and data insights</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Natural language processing and automation</p>
                  </div>
                </div>
              </div>

              {/* Button as separate div */}
              <div className="mt-4 sm:mt-20 md:mt-28 mb-0">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  Explore AI Solutions →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Full-Stack Development - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-r border-gray-200 order-2 lg:order-1 pb-4 sm:pb-0">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-4 sm:pt-8 md:pt-10">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">FULL-STACK DEVELOPMENT</span>
              </div>

              {/* Content positioned manually */}
              <div className="flex flex-col mt-2 sm:mt-4 md:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  Complete Web & Mobile Solutions
                </h3>
                <div className="space-y-2 sm:space-y-4 md:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Modern web & mobile apps using Django, React, Node.js.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Native iOS and Android mobile apps</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Backend APIs, databases, and cloud deployment</p>
                  </div>
                </div>
              </div>

              {/* Button as separate div */}
              <div className="mt-4 sm:mt-40 md:mt-52 lg:mt-64">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  View Development Services →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white flex items-center justify-center order-1 lg:order-2">
              <img
                src="/stack1.png"
                alt="Full-Stack Development Stack"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Data Scraping - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Visual mockups - Mobile Optimized */}
            <div className="bg-white flex items-center justify-start lg:order-1 pr-4 pb-4 pl-0 pt-0 order-1 lg:order-1">
              <img
                src="/stack4.png"
                alt="Data Scraping Stack"
                className="w-full md:w-[105%] h-auto object-cover"
              />
            </div>

            {/* Right side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col lg:order-2 pb-4 sm:pb-8 order-2 lg:order-2">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-4 sm:pt-8 md:pt-10">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">DATA SCRAPING</span>
              </div>

              {/* Content positioned manually */}
              <div className="flex flex-col mt-2 sm:mt-4 md:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  Stealth Grade Scraping
                </h3>
                <div className="space-y-2 sm:space-y-4 md:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Automated data collection using Python, Scrapy, and Selenium.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Stealth technology to bypass detection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Deliver data in any format (CSV, JSON, API)</p>
                  </div>
                </div>
              </div>

              {/* Button as separate div */}
              <div className="mt-4 sm:mt-40 md:mt-52 lg:mt-64">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 5: Data Analysing - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-11 py-0 flex flex-col pb-4 sm:pb-7 order-2 lg:order-1">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-4 sm:pt-7 md:pt-9">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">SAAS & MVP DEVELOPMENT</span>
              </div>

              {/* Content positioned manually */}
              <div className="flex flex-col mt-2 sm:mt-4 md:mt-5">
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5">
                  Launch-Ready Products Built Fast
                </h3>
                <div className="space-y-2 sm:space-y-4 mb-0">
                  <div className="flex items-start gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">SaaS & MVP Development tailored to your business</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">Scalable and fast product development</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base">Launch-ready products built efficiently</p>
                  </div>
                </div>
              </div>

              {/* Button as separate div */}
              <div className="mt-4 sm:mt-20 md:mt-24 mb-0">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  View SaaS Solutions →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white flex items-center justify-end pl-4 pb-4 pr-0 pt-0 order-1 lg:order-2">
              <img
                src="/stack5.png"
                alt="SaaS & MVP Development Stack"
                className="w-full md:w-[105%] h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tagline Section */}
        <div className="mt-16 sm:mt-20 md:mt-24 mb-16 sm:mb-20 md:mb-24">
          <div className="max-w-7xl mx-auto text-center px-4">
            <p className="text-2xl sm:text-3xl md:text-2xl lg:text-4xl text-gray-900 leading-tight lg:leading-tight font-bold line-clamp-3">
              Custom automations, stealth-grade scraping, and full-stack engineering built to work as one engine — cutting manual work, boosting performance, and delivering results most teams can't touch.
            </p>
          </div>
        </div>

        {/* How We Work Section */}
        <div className="mt-12 sm:mt-16 md:mt-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
              This is how we work
            </h2>
          </div>

          {/* Video Placeholder */}
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="relative w-full aspect-video bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-200">
              {/* Placeholder image */}
              <div className="absolute inset-0">
                <img
                  src="/placeholder.jpeg"
                  alt="How we work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-900/50 backdrop-blur-sm flex items-center justify-center hover:bg-gray-900/60 transition-all cursor-pointer">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
