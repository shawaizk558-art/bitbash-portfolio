
import { Globe, Smartphone, Database, Zap, Shield, Code, Cloud, Bot, Target, BarChart3, TrendingUp } from "@/lib/icons";
import { useState, createElement, useEffect } from "react";

const features = [
  {
    icon: Globe,
    title: "Browser Automation",
    description: "Stealth web scraping, bot detection bypass, and headless browser automation"
  },
  {
    icon: Smartphone,
    title: "Mobile Automation",
    description: "Automated testing and data extraction for iOS and Android applications"
  },
  {
    icon: Database,
    title: "Data Extraction",
    description: "Custom scrapers for any website. Handle dynamic content, APIs, and complex data"
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Eliminate repetitive tasks. 70-90% time savings with custom automation"
  }
];

export const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: Code, title: "Full-Stack Development", label: "Web & Mobile Apps" },
    { icon: Bot, title: "AI Solutions", label: "Machine Learning" },
    { icon: Zap, title: "Automation System", label: "Process Automation" },
    { icon: Database, title: "Data Scraping", label: "Data Extraction" },
    { icon: BarChart3, title: "Data Analysing", label: "Analytics & Insights" }
  ];

  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container-responsive">
        <div className="text-center max-w-7xl mx-auto mb-12 sm:mb-16 space-responsive-sm">
          <h2 className="text-4xl sm:text-4xl font-bold text-gray-900 leading-tight whitespace-nowrap">
            More Than Just Developers. Your Complete Product Engineering Team
          </h2>
          <p className="text-lg text-gray-600">
            'Full-Stack Development', 'AI Solutions', 'Automation System', 'Data Scraping', 'Data Analysing'.
          </p>
        </div>
        
        {/* Large Showcase Card with Tabs */}
        <div className="shadow-lg bg-white border border-gray-200 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Tab Navigation - Mobile Optimized */}
          <div className="relative flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab, index) => (
              <div
              key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-1 min-w-[120px] sm:min-w-0 p-3 sm:p-5 text-center cursor-pointer hover:bg-gray-50 transition-colors relative touch-friendly
                  ${activeTab === index ? 'bg-white' : 'bg-gray-50'}
                  ${index > 0 ? 'border-l border-gray-200' : ''}`}
              >
                <tab.icon className="w-5 h-5 sm:w-7 sm:h-7 text-purple-600 mx-auto mb-1 sm:mb-2" />
                <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">{tab.title}</h4>
                
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
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-2 sm:p-4">
            <div className="bg-white rounded-lg shadow-xl p-2 sm:p-4 w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                <div className="ml-2 sm:ml-4 flex items-center gap-2">
                  {createElement(tabs[activeTab].icon, { className: "w-3 h-3 sm:w-4 sm:h-4 text-purple-600" })}
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">{tabs[activeTab].label}</span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-4/5"></div>
              </div>
              <div className="mt-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg h-[200px] sm:h-[300px] md:h-[270px] flex items-center justify-center">
                {createElement(tabs[activeTab].icon, { className: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-600" })}
              </div>
            </div>
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
                <h3 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Complete Web & Mobile Solutions
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Modern web & mobile apps using Django, React, Node.js.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Native iOS and Android mobile apps</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Backend APIs, databases, and cloud deployment</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm w-fit">
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
                <h3 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Intelligent Machine Learning Systems
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Custom AI models and machine learning solutions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Predictive analytics and data insights</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Natural language processing and automation</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm w-fit">
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
                <h3 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Intelligent Process Automation
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Automation & AI Bots for business workflows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Custom scripts and bots that streamline processes</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Intelligent task automation and scheduling</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm w-fit">
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
                <h3 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Extract Data from Any Source
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Automated data collection using Python, Scrapy, and Selenium.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Stealth technology to bypass detection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Deliver data in any format (CSV, JSON, API)</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm w-fit">
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
                <h3 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Launch-Ready Products Built Fast
                </h3>
                <div className="space-y-4 sm:space-y-5 mb-0">
                  <div className="flex items-start gap-3">
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">SaaS & MVP Development tailored to your business</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Scalable and fast product development</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-responsive-sm sm:text-lg">Launch-ready products built efficiently</p>
                  </div>
                </div>
              </div>
              
              {/* Button as separate div */}
              <div className="mt-28 sm:mt-36">
                <button className="bg-white border border-gray-300 text-gray-900 font-bold px-3 py-2 rounded-sm shadow-sm hover:shadow-md transition-all flex items-center gap-1 text-xs sm:text-sm w-fit">
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
