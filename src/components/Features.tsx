
import { Globe, Smartphone, Database, Zap, Shield, Code, Cloud, Bot, Target, BarChart3, TrendingUp } from "@/lib/icons";
import { useState, useEffect } from "react";

export const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const tabs = [
    { 
      icon: Code, 
      title: "Full-Stack Development", 
      label: "Web & Mobile Apps",
      image: "/fullstack1.png",
      description: "Full stack development covers both front-end and back-end technologies. We build complete web & mobile applications and deliver scalable solutions."
    },
    { 
      icon: Bot, 
      title: "AI Solutions", 
      label: "Machine Learning",
      image: "/aisolutions2.png",
      description: "Custom AI models and machine learning solutions for your business. We develop intelligent systems using predictive analytics to help you make data-driven decisions."
    },
    { 
      icon: Zap, 
      title: "Automation System", 
      label: "Process Automation",
      image: "/automation3.png",
      description: "Intelligent automation systems that streamline your workflows. We build custom bots and scripts using browser automation, task scheduling, and intelligent process automation to eliminate repetitive tasks and save 70-90% of your time."
    },
    { 
      icon: Database, 
      title: "Data Scraping", 
      label: "Data Extraction",
      image: "/webscraping4.png",
      description: "Automated data collection from any source. We use Python, Scrapy, and Selenium with stealth technology to bypass detection. Extract structured data from websites, APIs, and deliver it in any format (CSV, JSON, API) for your business needs."
    },
    { 
      icon: BarChart3, 
      title: "Data Analysing", 
      label: "Analytics & Insights",
      image: "/dataanalytics5.png",
      description: "Transform raw data into actionable insights. Our analytics solutions include data visualization, predictive modeling, and custom dashboards."
    }
  ];

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
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-16 space-responsive-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight lg:whitespace-nowrap px-2 sm:px-0">
            More Than Just Developers. Your Complete Product Engineering Team
          </h2>
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 px-4 sm:px-0">
            'Full-Stack Development', 'AI Solutions', 'Automation System', 'Data Scraping', 'Data Analysing'.
          </p>
        </div>
        
        {/* Large Showcase Card with Tabs */}
        <div className="shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Tab Navigation - Mobile Optimized with Horizontal Scroll */}
          <div className="relative flex border-b border-gray-200 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {tabs.map((tab, index) => (
              <div
              key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-shrink-0 min-w-[140px] sm:min-w-[150px] md:flex-1 md:min-w-0 lg:flex-1 lg:min-w-0 p-3 sm:p-4 lg:p-5 text-center cursor-pointer hover:bg-gray-50 transition-colors relative min-h-[44px] lg:min-h-0
                  ${activeTab === index ? 'bg-white' : 'bg-gray-50'}
                  ${index > 0 ? 'border-l border-gray-200' : ''}`}
              >
                <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm lg:text-base leading-tight">{tab.title}</h4>
                
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
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 sm:p-4 relative overflow-visible">
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
                    className={`w-full h-auto rounded-lg absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
                      activeTab === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Callout Box - Dynamic based on active tab - Only show for options 1, 2, and 5 */}
            {(activeTab === 0 || activeTab === 1 || activeTab === 4) && (
              <div className={`relative mt-4 sm:mt-6 max-w-[300px] mx-auto sm:mx-0 sm:absolute sm:mt-0 z-20 ${
                activeTab === 0 ? 'sm:left-8 sm:top-40 md:top-44' : 
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

        {/* Card 1: Full-Stack Development - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-r border-gray-200">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-8 sm:pt-10">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">FULL-STACK DEVELOPMENT</span>
              </div>
              
              {/* Content positioned manually */}
              <div className="flex flex-col mt-4 sm:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Complete Web & Mobile Solutions
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
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
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  View Development Services →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white p-6 sm:p-8 md:p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-2 sm:p-4 border border-gray-200 rounded-sm">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-20 sm:h-32 mb-2 sm:mb-3 flex items-center justify-center rounded">
                      <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1 sm:h-2 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-full rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: AI Solutions - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Visual mockups - Mobile Optimized */}
            <div className="bg-white p-6 sm:p-8 md:p-12 flex items-center justify-center lg:order-1">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-2 sm:p-4 border border-gray-200 rounded-sm">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-20 sm:h-32 mb-2 sm:mb-3 flex items-center justify-center rounded">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1 sm:h-2 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-full rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-l border-gray-200 lg:order-2">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-8 sm:pt-10">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">AI SOLUTIONS</span>
              </div>
              
              {/* Content positioned manually */}
              <div className="flex flex-col mt-4 sm:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Intelligent Machine Learning Systems
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
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
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  Explore AI Solutions →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Automation System - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-r border-gray-200">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-8 sm:pt-10">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">AUTOMATION SYSTEM</span>
              </div>
              
              {/* Content positioned manually */}
              <div className="flex flex-col mt-4 sm:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Intelligent Process Automation
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Automation & AI Bots for business workflows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Custom scripts and bots that streamline processes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Intelligent task automation and scheduling</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  Explore Automation →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white p-6 sm:p-8 md:p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-2 sm:p-4 border border-gray-200 rounded-sm">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-20 sm:h-32 mb-2 sm:mb-3 flex items-center justify-center rounded">
                      <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1 sm:h-2 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-full rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Data Scraping - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 md:mt-20 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Visual mockups - Mobile Optimized */}
            <div className="bg-white p-6 sm:p-8 md:p-12 flex items-center justify-center lg:order-1">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-2 sm:p-4 border border-gray-200 rounded-sm">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-20 sm:h-32 mb-2 sm:mb-3 flex items-center justify-center rounded">
                      <Database className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1 sm:h-2 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-full rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-l border-gray-200 lg:order-2">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-8 sm:pt-10">
                <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">DATA SCRAPING</span>
              </div>
              
              {/* Content positioned manually */}
              <div className="flex flex-col mt-4 sm:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Extract Data from Any Source
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
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
              <div className="mt-28 sm:mt-36">
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
            <div className="bg-white px-6 sm:px-8 md:px-12 py-0 flex flex-col border-r-0 lg:border-r border-gray-200">
              {/* Label at the top */}
              <div className="inline-flex items-center gap-2 pt-8 sm:pt-10">
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">SAAS & MVP DEVELOPMENT</span>
              </div>
              
              {/* Content positioned manually */}
              <div className="flex flex-col mt-4 sm:mt-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Launch-Ready Products Built Fast
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">SaaS & MVP Development tailored to your business</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Scalable and fast product development</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-sm sm:text-base lg:text-lg">Launch-ready products built efficiently</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm lg:text-sm w-fit min-h-[44px] lg:min-h-0">
                  View SaaS Solutions →
                </button>
              </div>
            </div>

            {/* Right side - Visual mockups - Mobile Optimized */}
            <div className="bg-white p-6 sm:p-8 md:p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-2 sm:p-4 border border-gray-200 rounded-sm">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-20 sm:h-32 mb-2 sm:mb-3 flex items-center justify-center rounded">
                      <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1 sm:h-2 bg-gray-200 w-3/4 rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-full rounded"></div>
                      <div className="h-1 sm:h-2 bg-gray-200 w-2/3 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
