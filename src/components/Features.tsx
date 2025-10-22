import { Card } from "@/components/ui/card";
import { Code, Smartphone, Cloud, Shield, Zap } from "lucide-react";
import { useState, createElement } from "react";

const features = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "End-to-end software solutions from frontend to backend"
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment services"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security and regulatory compliance"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "High-performance applications with lightning-fast load times"
  }
];

export const Features = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: Code, title: "Extensive Formatting", label: "Your Blog" },
    { icon: Smartphone, title: "Relevant Images", label: "Image Gallery" },
    { icon: Cloud, title: "Relevant Videos", label: "Video Content" },
    { icon: Shield, title: "Relevant Links", label: "Link Manager" },
    { icon: Zap, title: "Table of Contents", label: "Navigation" }
  ];

  const handleTabClick = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 leading-tight">
            More Than Just Code. Your Complete <span className="text-purple-600">Software Development</span> Partner.
          </h2>
          <p className="text-base text-gray-600">
            Build scalable, secure, and high-performance applications with modern technologies and best practices.
          </p>
        </div>
        
        {/* Large Showcase Card with Tabs */}
        <div className="shadow-lg bg-white border border-gray-200 rounded-3xl overflow-hidden">
          {/* Tab Navigation - End to End */}
          <div className="relative flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <div
              key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-1 bg-white p-5 text-center cursor-pointer hover:bg-gray-50 transition-colors relative
                  ${index > 0 ? 'border-l border-gray-200' : ''}`}
              >
                <tab.icon className="w-7 h-7 text-purple-600 mx-auto mb-2" />
                <h4 className="font-bold text-gray-900 text-xs">{tab.title}</h4>
                
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

          {/* Photo Display Area */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 flex items-center gap-2">
                  {createElement(tabs[activeTab].icon, { className: "w-4 h-4 text-purple-600" })}
                  <span className="text-sm text-gray-600 font-medium">{tabs[activeTab].label}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              </div>
              <div className="mt-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg h-48 flex items-center justify-center">
                {createElement(tabs[activeTab].icon, { className: "w-16 h-16 text-purple-600" })}
              </div>
            </div>
          </div>
        </div>

        {/* Card 1: Full-Stack Development */}
        <div className="mt-20 overflow-hidden shadow-lg bg-white border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="bg-white p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">FULL-STACK DEVELOPMENT</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Build Complete Web Applications
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Code className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">Modern React, Vue, and Angular frameworks</p>
                </div>
                <div className="flex items-start gap-3">
                  <Cloud className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">Scalable Node.js and Python backends</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">RESTful APIs and GraphQL integration</p>
                </div>
              </div>
              <button className="mt-8 text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all text-lg">
                Explore Solutions →
              </button>
            </div>

            {/* Right side - Visual mockups */}
            <div className="bg-white p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-4 border border-gray-200">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-32 mb-3 flex items-center justify-center">
                      <Code className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 w-3/4"></div>
                      <div className="h-2 bg-gray-200 w-full"></div>
                      <div className="h-2 bg-gray-200 w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Mobile App Development */}
        <div className="mt-20 overflow-hidden shadow-lg bg-white border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">MOBILE DEVELOPMENT</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Create Native Mobile Experiences
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Build high-performance mobile applications for iOS and Android using React Native, Flutter, and native technologies. Seamless integration with device features and smooth user experiences.
              </p>
            </div>

            <div className="bg-white p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-4 border border-gray-200">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-32 mb-3 flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 w-3/4"></div>
                      <div className="h-2 bg-gray-200 w-full"></div>
                      <div className="h-2 bg-gray-200 w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Cloud & DevOps */}
        <div className="mt-20 overflow-hidden shadow-lg bg-white border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <Cloud className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">CLOUD & DEVOPS</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Automate Deployment & Scaling
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Cloud className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">AWS, Azure, and Google Cloud infrastructure</p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">CI/CD pipelines with automated testing</p>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 text-lg">Docker, Kubernetes orchestration</p>
                </div>
              </div>
              <button className="mt-8 text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all text-lg">
                Learn More →
              </button>
            </div>

            <div className="bg-white p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-4 border border-gray-200">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-32 mb-3 flex items-center justify-center">
                      <Cloud className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 w-3/4"></div>
                      <div className="h-2 bg-gray-200 w-full"></div>
                      <div className="h-2 bg-gray-200 w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: AI & Automation */}
        <div className="mt-20 overflow-hidden shadow-lg bg-white border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-white p-12 flex flex-col justify-center border-r border-gray-200">
              <div className="inline-flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600 uppercase text-xs tracking-wide">AI & AUTOMATION</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-8">
                Intelligent Process Automation
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Leverage AI and machine learning to automate complex workflows. Build intelligent systems that learn and adapt, reducing manual work and increasing efficiency across your entire organization.
              </p>
            </div>

            <div className="bg-white p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white shadow-md p-4 border border-gray-200">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 h-32 mb-3 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 w-3/4"></div>
                      <div className="h-2 bg-gray-200 w-full"></div>
                      <div className="h-2 bg-gray-200 w-2/3"></div>
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
