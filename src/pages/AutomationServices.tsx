import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Smartphone, 
  Database, 
  Zap, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";

const AutomationServices = () => {
  const services = [
    {
      icon: Globe,
      title: "Browser Automation",
      description: "Web scraping and browser automation with stealth technology",
      features: [
        "Selenium & Puppeteer automation",
        "Anti-bot detection bypass",
        "Dynamic content handling",
        "Real-time data extraction"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Automation",
      description: "iOS and Android app automation and testing",
      features: [
        "Appium cross-platform testing",
        "iOS & Android automation",
        "UI testing automation",
        "Performance monitoring"
      ]
    },
    {
      icon: Database,
      title: "Data Extraction",
      description: "Custom data extraction and processing solutions",
      features: [
        "Multi-source data collection",
        "Data cleaning & processing",
        "API integration",
        "Real-time data feeds"
      ]
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Business process automation and optimization",
      features: [
        "Process automation",
        "System integration",
        "Custom workflows",
        "Performance optimization"
      ]
    }
  ];

  const technologies = [
    "Selenium", "Puppeteer", "Appium", "Python", "Node.js", "Proxy Networks"
  ];


  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60" />
        
        {/* Floating gradient blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="font-bold leading-[1.1] tracking-tight font-sans" style={{ fontSize: '48px' }}>
                Complete <span className="text-primary">Automation</span> Solutions
              </h1>
              
              <p className="text-xl text-muted-foreground mx-auto text-center max-w-[820px] leading-relaxed">
                From web scraping to mobile automation, we provide comprehensive automation services
                <br />
                that scale your business operations and eliminate repetitive tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Automation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive automation solutions for every business need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <service.icon className="w-12 h-12 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Industry-Leading Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use the most advanced automation frameworks and technologies
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-lg">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Showcase />

      <Footer isHomepage={false} />
    </div>
  );
};

export default AutomationServices;
