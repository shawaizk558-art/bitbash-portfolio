import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Smartphone,
  Database,
  Zap,
  MessageCircle,
  Calendar,
  Users
} from "@/lib/icons";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@bitbash.com",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      contact: "San Francisco, CA",
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When we're available",
      contact: "Mon-Fri 9AM-6PM PST",
      action: "Schedule Call"
    }
  ];

  const services = [
    {
      icon: Globe,
      title: "Browser Automation",
      description: "Web scraping and browser automation services"
    },
    {
      icon: Smartphone,
      title: "Mobile Automation",
      description: "iOS and Android app automation"
    },
    {
      icon: Database,
      title: "Data Extraction",
      description: "Custom data extraction and processing"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Business process automation solutions"
    }
  ];

  const consultationTypes = [
    {
      name: "Free Discovery Call",
      duration: "30 minutes",
      description: "Discuss your automation needs and get initial recommendations",
      price: "Free"
    },
    {
      name: "Technical Consultation",
      duration: "1 hour",
      description: "Deep dive into technical requirements and solution architecture",
      price: "$200"
    },
    {
      name: "Project Planning",
      duration: "2 hours",
      description: "Complete project analysis with detailed roadmap and timeline",
      price: "$500"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="relative pt-2 pb-6 sm:pb-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              Let's Build Your
              <span className="text-purple-600"> Automation Solution</span>
            </h1>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Get a free consultation and discover how automation can transform your business. 
              Our experts are ready to help you scale with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-responsive-sm sm:text-base">
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-6 sm:px-8 py-3 sm:py-4 text-responsive-sm sm:text-base">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to connect with our automation experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover-mobile">
                <info.icon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-responsive-base sm:text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-responsive-sm text-gray-600 mb-3">{info.description}</p>
                <div className="text-responsive-base sm:text-lg font-semibold text-purple-600 mb-3 sm:mb-4">{info.contact}</div>
                <Button variant="outline" className="w-full touch-friendly text-responsive-sm">
                  {info.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Booking Form - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Book Your Free Consultation
              </h2>
              <p className="text-responsive-base sm:text-responsive-lg text-gray-600">
                Tell us about your automation needs and we'll provide a detailed solution
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Form - Mobile Optimized */}
              <Card className="p-6 sm:p-8">
                <h3 className="text-responsive-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a message</h3>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-responsive-sm">First Name</Label>
                      <Input id="firstName" placeholder="John" className="text-responsive-sm" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-responsive-sm">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="text-responsive-sm" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-responsive-sm">Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" className="text-responsive-sm" />
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-responsive-sm">Company</Label>
                    <Input id="company" placeholder="Your Company" className="text-responsive-sm" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-responsive-sm">Phone (Optional)</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" className="text-responsive-sm" />
                  </div>
                  
                  <div>
                    <Label htmlFor="service" className="text-responsive-sm">Service Interest</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md text-responsive-sm focus-mobile">
                      <option>Browser Automation</option>
                      <option>Mobile Automation</option>
                      <option>Data Extraction</option>
                      <option>Workflow Automation</option>
                      <option>Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget" className="text-responsive-sm">Project Budget</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md text-responsive-sm focus-mobile">
                      <option>Under $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000</option>
                      <option>$50,000+</option>
                      <option>Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline" className="text-responsive-sm">Project Timeline</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md text-responsive-sm focus-mobile">
                      <option>ASAP</option>
                      <option>Within 1 month</option>
                      <option>1-3 months</option>
                      <option>3+ months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-responsive-sm">Project Description</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your automation needs, current challenges, and what you'd like to achieve..."
                      rows={4}
                      className="text-responsive-sm"
                    />
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-responsive-sm touch-friendly">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </form>
              </Card>
              
              {/* Consultation Types - Mobile Optimized */}
              <div>
                <h3 className="text-responsive-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Consultation Options</h3>
                <div className="space-y-4 sm:space-y-6">
                  {consultationTypes.map((consultation, index) => (
                    <Card key={index} className={`p-4 sm:p-6 ${index === 0 ? 'ring-2 ring-purple-600' : ''} hover-mobile`}>
                      {index === 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                          <span className="text-responsive-xs sm:text-sm font-semibold text-green-600">Recommended</span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <h4 className="text-responsive-base sm:text-lg font-semibold text-gray-900">{consultation.name}</h4>
                        <div className="text-right">
                          <div className="text-responsive-base sm:text-lg font-bold text-purple-600">{consultation.price}</div>
                          <div className="text-responsive-xs sm:text-sm text-gray-500">{consultation.duration}</div>
                        </div>
                      </div>
                      <p className="text-responsive-sm text-gray-600 mb-3 sm:mb-4">{consultation.description}</p>
                      <Button 
                        className={`w-full touch-friendly text-responsive-sm ${index === 0 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        Book This Consultation
                      </Button>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    <h4 className="text-responsive-base sm:text-lg font-semibold text-gray-900">Quick Response</h4>
                  </div>
                  <p className="text-responsive-sm text-gray-600">
                    We typically respond within 2-4 hours during business hours. 
                    For urgent projects, call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Automation Services
            </h2>
            <p className="text-responsive-base sm:text-responsive-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive automation solutions for every business need
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow hover-mobile">
                <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-responsive-base sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-responsive-sm text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-purple-600">
        <div className="container-responsive text-center">
          <h2 className="text-responsive-2xl sm:text-responsive-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Automation Journey?
          </h2>
          <p className="text-responsive-base sm:text-responsive-lg text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join 50+ businesses that have transformed their operations with our automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-responsive-sm sm:text-base touch-friendly">
              Book Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export { default } from "./contact/ContactUs";
