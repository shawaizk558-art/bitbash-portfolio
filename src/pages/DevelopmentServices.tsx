import { Navigation } from "@/components/Navigation";
import { Showcase } from "@/components/Showcase";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Globe,
  Smartphone,
  Code,
  Database,
  ArrowRight,
  CheckCircle
} from "@/lib/icons";
import { HeroBackground } from "@/components/HeroBackground";

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
    { alt: "React", src: "https://cdn.simpleicons.org/react/000000" },
    { alt: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
    { alt: "Vue.js", src: "https://cdn.simpleicons.org/vuedotjs/000000" },
    { alt: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/000000" },
    { alt: "Python", src: "https://cdn.simpleicons.org/python/000000" },
    { alt: "TypeScript", src: "https://cdn.simpleicons.org/typescript/000000" },
    { alt: "React Native", src: "https://cdn.simpleicons.org/react/000000" },
    { alt: "Flutter", src: "https://cdn.simpleicons.org/flutter/000000" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[clamp(220px,42vh,340px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)] flex items-center justify-center overflow-hidden pt-16">
        {/* Animated gradient background */}
        <HeroBackground />

        <div className="relative z-10 container-responsive text-center">
          <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
            <div className="space-responsive-sm">
              <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight font-sans px-2 sm:px-0">
                Custom Development <span className="text-primary">Solutions</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
                From web applications to mobile apps, we build custom software solutions that scale your business and enhance user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow hover-mobile text-center group">
                <div className="flex flex-col items-center gap-4 sm:gap-5 mb-5">
                  <service.icon className="w-12 h-12 sm:w-14 sm:h-14 text-purple-600 wiggle-on-hover" />
                  <div className="space-y-1.5">
                    <h3 className="text-responsive-lg sm:text-responsive-xl md:text-2xl font-bold text-gray-900">{service.title}</h3>
                    <p className="text-responsive-sm text-gray-600 mx-auto max-w-md">{service.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-responsive-base sm:text-lg font-semibold text-gray-900">Key Features</h4>
                  <ul className="space-y-2 text-left mx-auto max-w-md flex flex-col items-center">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 justify-center md:justify-start w-full md:w-auto">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-responsive-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 max-w-3xl mx-auto">
              We use the latest frameworks and tools to build scalable applications
            </p>
          </div>

          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-8 opacity-80 px-3 sm:px-0">
            {technologies.map((tech) => (
              <img
                key={tech.alt}
                src={tech.src}
                alt={tech.alt}
                className="h-10 sm:h-12 md:h-12 object-contain grayscale opacity-80 transition-transform motion-safe:hover:animate-logo-nudge will-change-transform"
                loading="lazy"
              />
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
