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
} from "lucide-react";

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
      
      {/* Hero Section */}
      <section className="relative pt-2 pb-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Build Your
              <span className="text-purple-600"> Automation Solution</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get a free consultation and discover how automation can transform your business. 
              Our experts are ready to help you scale with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4">
                <MessageCircle className="mr-2 h-5 w-5" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to connect with our automation experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <info.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600 mb-3">{info.description}</p>
                <div className="text-lg font-semibold text-purple-600 mb-4">{info.contact}</div>
                <Button variant="outline" className="w-full">
                  {info.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Booking Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Book Your Free Consultation
              </h2>
              <p className="text-xl text-gray-600">
                Tell us about your automation needs and we'll provide a detailed solution
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  
                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>Browser Automation</option>
                      <option>Mobile Automation</option>
                      <option>Data Extraction</option>
                      <option>Workflow Automation</option>
                      <option>Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Project Budget</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>Under $5,000</option>
                      <option>$5,000 - $15,000</option>
                      <option>$15,000 - $50,000</option>
                      <option>$50,000+</option>
                      <option>Not Sure</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <select className="w-full p-3 border border-gray-300 rounded-md">
                      <option>ASAP</option>
                      <option>Within 1 month</option>
                      <option>1-3 months</option>
                      <option>3+ months</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Project Description</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your automation needs, current challenges, and what you'd like to achieve..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </Card>
              
              {/* Consultation Types */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Consultation Options</h3>
                <div className="space-y-6">
                  {consultationTypes.map((consultation, index) => (
                    <Card key={index} className={`p-6 ${index === 0 ? 'ring-2 ring-purple-600' : ''}`}>
                      {index === 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">Recommended</span>
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{consultation.name}</h4>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{consultation.price}</div>
                          <div className="text-sm text-gray-500">{consultation.duration}</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{consultation.description}</p>
                      <Button 
                        className={`w-full ${index === 0 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      >
                        Book This Consultation
                      </Button>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">Quick Response</h4>
                  </div>
                  <p className="text-gray-600">
                    We typically respond within 2-4 hours during business hours. 
                    For urgent projects, call us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Automation Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 50+ businesses that have transformed their operations with our automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4">
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Contact;
