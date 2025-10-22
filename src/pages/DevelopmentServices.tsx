import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Smartphone, 
  Code, 
  Database, 
  ArrowRight, 
  CheckCircle
} from "lucide-react";

const DevelopmentServices = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Custom web applications built with modern frameworks and technologies",
      features: [
        "React, Next.js, Vue.js development",
        "Responsive design & mobile optimization",
        "API integration & database design",
        "Performance optimization & SEO"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: [
        "React Native & Flutter development",
        "iOS & Android native apps",
        "App store optimization",
        "Push notifications & analytics"
      ]
    },
    {
      icon: Code,
      title: "API Development",
      description: "RESTful APIs and microservices for scalable backend solutions",
      features: [
        "REST & GraphQL API design",
        "Microservices architecture",
        "Database design & optimization",
        "Authentication & security"
      ]
    },
    {
      icon: Database,
      title: "UI/UX Design",
      description: "User-centered design solutions that enhance user experience",
      features: [
        "User research & wireframing",
        "Prototyping & user testing",
        "Design systems & style guides",
        "Accessibility & responsive design"
      ]
    }
  ];

  const technologies = [
    "React", "Next.js", "Vue.js", "Node.js", "Python", "TypeScript", "React Native", "Flutter"
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
                Custom Development <span className="text-primary">Solutions</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From web applications to mobile apps, we build custom software solutions 
                that scale your business and enhance user experience.
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
              Our Development Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive development solutions for modern businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-6">
                  <service.icon className="w-12 h-12 text-blue-600 flex-shrink-0" />
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
              Built with Modern Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use the latest frameworks and tools to build scalable applications
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

export default DevelopmentServices;
