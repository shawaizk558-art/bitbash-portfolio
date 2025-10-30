import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ArrowRight, 
  Globe,
  Smartphone,
  Database,
  Zap,
  Clock,
  Shield,
  Star,
  Users,
  TrendingUp,
  DollarSign
} from "lucide-react";

const Pricing = () => {
  const services = [
    {
      name: "Browser Automation",
      icon: Globe,
      description: "Web scraping, data extraction, and browser automation",
      pricing: [
        {
          name: "Simple Scraper",
          price: "$2,000 - $5,000",
          timeframe: "1-2 weeks",
          features: [
            "Single website scraping",
            "Basic anti-bot protection",
            "CSV/JSON output",
            "30 days support"
          ]
        },
        {
          name: "Advanced Automation",
          price: "$5,000 - $15,000",
          timeframe: "2-3 weeks",
          features: [
            "Multiple data sources",
            "Stealth proxy rotation",
            "Real-time processing",
            "90 days support"
          ]
        },
        {
          name: "Enterprise Solution",
          price: "$15,000 - $50,000",
          timeframe: "4-6 weeks",
          features: [
            "Unlimited data sources",
            "Custom infrastructure",
            "24/7 monitoring",
            "1 year support"
          ]
        }
      ]
    },
    {
      name: "Mobile Automation",
      icon: Smartphone,
      description: "iOS and Android app automation and testing",
      pricing: [
        {
          name: "Basic Testing",
          price: "$3,000 - $8,000",
          timeframe: "1-2 weeks",
          features: [
            "Single app testing",
            "Basic UI automation",
            "Data extraction",
            "30 days support"
          ]
        },
        {
          name: "Advanced Automation",
          price: "$8,000 - $20,000",
          timeframe: "3-4 weeks",
          features: [
            "Multiple app testing",
            "Cross-platform support",
            "Real-time monitoring",
            "90 days support"
          ]
        },
        {
          name: "Enterprise Platform",
          price: "$20,000 - $60,000",
          timeframe: "6-8 weeks",
          features: [
            "Unlimited app testing",
            "Custom infrastructure",
            "24/7 monitoring",
            "1 year support"
          ]
        }
      ]
    },
    {
      name: "Data Extraction",
      icon: Database,
      description: "Custom data extraction and processing solutions",
      pricing: [
        {
          name: "Basic Extraction",
          price: "$2,500 - $6,000",
          timeframe: "1-2 weeks",
          features: [
            "Simple data points",
            "Basic cleaning",
            "Standard formats",
            "30 days support"
          ]
        },
        {
          name: "Advanced Processing",
          price: "$6,000 - $18,000",
          timeframe: "2-4 weeks",
          features: [
            "Complex data structures",
            "Real-time processing",
            "API integration",
            "90 days support"
          ]
        },
        {
          name: "Enterprise Pipeline",
          price: "$18,000 - $75,000",
          timeframe: "4-8 weeks",
          features: [
            "Unlimited data sources",
            "Custom infrastructure",
            "24/7 monitoring",
            "1 year support"
          ]
        }
      ]
    },
    {
      name: "Workflow Automation",
      icon: Zap,
      description: "Business process automation and workflow optimization",
      pricing: [
        {
          name: "Simple Workflow",
          price: "$4,000 - $10,000",
          timeframe: "2-3 weeks",
          features: [
            "Basic process automation",
            "Simple integrations",
            "Standard workflows",
            "30 days support"
          ]
        },
        {
          name: "Advanced Automation",
          price: "$10,000 - $25,000",
          timeframe: "3-5 weeks",
          features: [
            "Complex workflows",
            "Multiple integrations",
            "Custom logic",
            "90 days support"
          ]
        },
        {
          name: "Enterprise Platform",
          price: "$25,000 - $100,000",
          timeframe: "6-12 weeks",
          features: [
            "Unlimited workflows",
            "Custom infrastructure",
            "24/7 monitoring",
            "1 year support"
          ]
        }
      ]
    }
  ];

  const addOns = [
    {
      name: "Stealth Technology",
      price: "+$1,000 - $3,000",
      description: "Advanced anti-bot detection bypass",
      icon: Shield
    },
    {
      name: "Real-time Monitoring",
      price: "+$500 - $2,000",
      description: "24/7 system monitoring and alerts",
      icon: Clock
    },
    {
      name: "API Integration",
      price: "+$1,500 - $5,000",
      description: "Connect to existing systems and databases",
      icon: Database
    },
    {
      name: "Custom Infrastructure",
      price: "+$2,000 - $10,000",
      description: "Dedicated servers and cloud resources",
      icon: Database
    }
  ];

  const faqs = [
    {
      question: "How do you determine pricing?",
      answer: "Pricing is based on project complexity, data volume, technical requirements, and timeline. We provide detailed quotes after understanding your specific needs."
    },
    {
      question: "Do you offer maintenance and support?",
      answer: "Yes, all projects include support periods (30 days to 1 year). We also offer ongoing maintenance contracts for long-term projects."
    },
    {
      question: "Can I get a custom quote?",
      answer: "Absolutely! Contact us for a free consultation. We'll analyze your requirements and provide a detailed, transparent quote."
    },
    {
      question: "What's included in the support?",
      answer: "Support includes bug fixes, minor updates, performance optimization, and technical assistance during the support period."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options including milestone-based payments for larger projects."
    },
    {
      question: "What if my requirements change?",
      answer: "We understand requirements can evolve. We'll work with you to adjust the scope and pricing accordingly."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-2 pb-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
              Transparent Pricing
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Clear, Honest Pricing.
              <span className="text-purple-600"> No Hidden Fees.</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto px-4 sm:px-0">
              Transparent pricing based on project complexity and requirements. 
              Get exactly what you need without paying for unnecessary features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Pricing */}
      <section className="py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
              Service Pricing
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Choose the service that fits your automation needs
            </p>
          </div>
          
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <service.icon className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {service.pricing.map((tier, tierIndex) => (
                    <Card key={tierIndex} className={`p-8 relative ${tierIndex === 1 ? 'ring-2 ring-purple-600 shadow-xl' : ''}`}>
                      {tierIndex === 1 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                        </div>
                      )}
                      <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                        <div className="text-3xl font-bold text-purple-600 mb-2">{tier.price}</div>
                        <div className="text-sm text-gray-500">Delivery: {tier.timeframe}</div>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${tierIndex === 1 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        Get Started
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your automation with these optional add-ons
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {addOns.map((addOn, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <addOn.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{addOn.name}</h3>
                <div className="text-2xl font-bold text-purple-600 mb-3">{addOn.price}</div>
                <p className="text-gray-600 text-sm">{addOn.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              See how much automation can save your business
            </p>
            
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">70-90%</div>
                  <div className="text-gray-700">Time Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">3-6</div>
                  <div className="text-gray-700">Months ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">5x</div>
                  <div className="text-gray-700">Productivity Increase</div>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                  Get Detailed ROI Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about our pricing and services
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and detailed quote for your automation project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4">
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Pricing;
