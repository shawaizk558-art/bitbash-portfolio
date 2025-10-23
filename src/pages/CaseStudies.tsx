import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Globe,
  Smartphone,
  Database,
  Zap,
  CheckCircle,
  Star,
  BarChart3,
  Target,
  Award
} from "@/lib/icons";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Price Intelligence Platform",
      company: "TechMart",
      industry: "E-Commerce",
      challenge: "Manual price monitoring of 50,000+ competitor products was taking 40 hours per week and missing price changes.",
      solution: "Built a stealth web scraping system that monitors competitor prices in real-time with rotating proxies and anti-detection technology.",
      results: [
        "50,000+ products monitored daily",
        "95% reduction in manual work",
        "Real-time price alerts",
        "ROI achieved in 3 weeks"
      ],
      metrics: {
        timeSaved: "40 hours/week",
        costReduction: "$120,000/year",
        accuracy: "99.8%",
        roi: "3 weeks"
      },
      technologies: ["Selenium", "Python", "Proxy Networks", "Real-time Processing"],
      testimonial: {
        quote: "BitBash built a custom scraper that extracts 50,000+ products daily from our competitors. We now have real-time pricing intelligence. ROI in 3 weeks.",
        author: "Sarah Mitchell",
        role: "E-Commerce Director",
        company: "TechMart"
      },
      icon: Globe,
      color: "purple"
    },
    {
      id: 2,
      title: "Mobile App Testing Automation",
      company: "AppVentures",
      industry: "Mobile Development",
      challenge: "Manual testing of iOS and Android apps was taking 2 weeks per release cycle, slowing down development.",
      solution: "Implemented comprehensive mobile automation testing with Appium and custom test frameworks for both platforms.",
      results: [
        "90% reduction in testing time",
        "Automated regression testing",
        "Cross-platform compatibility",
        "Faster release cycles"
      ],
      metrics: {
        timeSaved: "2 weeks → 2 hours",
        costReduction: "$80,000/year",
        accuracy: "98%",
        roi: "6 weeks"
      },
      technologies: ["Appium", "XCUITest", "Espresso", "Python"],
      testimonial: {
        quote: "Their mobile automation solution reduced our app testing time from 2 weeks to 2 hours. Game-changing for our release cycle.",
        author: "James Rodriguez",
        role: "CTO",
        company: "AppVentures"
      },
      icon: Smartphone,
      color: "blue"
    },
    {
      id: 3,
      title: "Real Estate Market Data Aggregation",
      company: "MarketInsights",
      industry: "Real Estate",
      challenge: "Manual collection of property listings from 20+ sources was inconsistent and time-consuming.",
      solution: "Created a comprehensive data extraction system that aggregates listings from multiple sources with data cleaning and standardization.",
      results: [
        "10,000+ listings collected weekly",
        "Automated data cleaning",
        "Standardized data format",
        "Real-time market insights"
      ],
      metrics: {
        timeSaved: "60 hours/week",
        costReduction: "$150,000/year",
        accuracy: "99.5%",
        roi: "4 weeks"
      },
      technologies: ["Puppeteer", "Python", "Data Processing", "API Integration"],
      testimonial: {
        quote: "We needed stealth web scraping for market research. BitBash delivered an undetectable solution that's been running 24/7 for 6 months without issues.",
        author: "Emily Chen",
        role: "Data Lead",
        company: "MarketInsights"
      },
      icon: Database,
      color: "green"
    },
    {
      id: 4,
      title: "Financial Data Collection & Analysis",
      company: "DataCorp",
      industry: "Finance",
      challenge: "Manual financial data collection from multiple sources was error-prone and couldn't scale.",
      solution: "Built an automated financial data pipeline that extracts, processes, and analyzes data from various financial sources.",
      results: [
        "40 hours/week saved",
        "Real-time data processing",
        "Automated reporting",
        "Improved accuracy"
      ],
      metrics: {
        timeSaved: "40 hours/week",
        costReduction: "$100,000/year",
        accuracy: "99.9%",
        roi: "5 weeks"
      },
      technologies: ["Selenium", "Python", "Data Analytics", "API Integration"],
      testimonial: {
        quote: "The data extraction automation saves us 40 hours per week. We can now focus on analysis instead of manual data collection. Incredible ROI.",
        author: "Michael Brown",
        role: "Analytics Manager",
        company: "DataCorp"
      },
      icon: BarChart3,
      color: "orange"
    },
    {
      id: 5,
      title: "Lead Generation Automation",
      company: "GrowthAgency",
      industry: "Marketing",
      challenge: "Manual lead generation was limited to 50 leads per month and couldn't scale with business growth.",
      solution: "Automated the entire lead generation process with custom scrapers and CRM integration for seamless workflow.",
      results: [
        "500+ leads monthly",
        "10x increase in leads",
        "Automated CRM integration",
        "Doubled revenue"
      ],
      metrics: {
        timeSaved: "30 hours/week",
        costReduction: "$200,000/year",
        accuracy: "95%",
        roi: "2 weeks"
      },
      technologies: ["Puppeteer", "Python", "CRM Integration", "Data Processing"],
      testimonial: {
        quote: "BitBash automated our entire lead generation process. We went from 50 leads per month to 500+ with the same team. Revenue doubled.",
        author: "Lisa Anderson",
        role: "Marketing Director",
        company: "GrowthAgency"
      },
      icon: Target,
      color: "pink"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      green: "bg-green-100 text-green-700 border-green-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200",
      pink: "bg-pink-100 text-pink-700 border-pink-200"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const getIconColor = (color: string) => {
    const colors = {
      purple: "text-purple-600",
      blue: "text-blue-600",
      green: "text-green-600",
      orange: "text-orange-600",
      pink: "text-pink-600"
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-2 pb-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
              Case Studies
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Real Results from
              <span className="text-purple-600"> Real Clients</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              See how businesses across industries have transformed their operations with our automation solutions. 
              Real projects, real metrics, real ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                Get Your Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4">
                <Award className="mr-2 h-5 w-5" />
                View All Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed case studies showing real automation projects and their impact
            </p>
          </div>
          
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <Card key={study.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Side - Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <study.icon className={`w-8 h-8 ${getIconColor(study.color)}`} />
                      <Badge className={getColorClasses(study.color)}>
                        {study.industry}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {study.title}
                    </h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Challenge</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Solution</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Results</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Metrics & Testimonial */}
                  <div className="bg-gray-50 p-8 lg:p-12">
                    {/* Metrics */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white rounded-lg">
                          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-lg font-bold text-gray-900">{study.metrics.timeSaved}</div>
                          <div className="text-sm text-gray-600">Time Saved</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                          <div className="text-lg font-bold text-gray-900">{study.metrics.costReduction}</div>
                          <div className="text-sm text-gray-600">Cost Reduction</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <div className="text-lg font-bold text-gray-900">{study.metrics.accuracy}</div>
                          <div className="text-sm text-gray-600">Accuracy</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg">
                          <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                          <div className="text-lg font-bold text-gray-900">{study.metrics.roi}</div>
                          <div className="text-sm text-gray-600">ROI Timeline</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Testimonial */}
                    <div className="bg-white p-6 rounded-lg">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-4">"{study.testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">
                            {study.testimonial.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{study.testimonial.author}</div>
                          <div className="text-sm text-gray-600">{study.testimonial.role}, {study.testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Combined results from all our automation projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-700">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2M+</div>
              <div className="text-gray-700">Client Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
              <div className="text-gray-700">Average Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.2</div>
              <div className="text-gray-700">Months Average ROI</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join 50+ businesses that have transformed their operations with our automation solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4">
              Get Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4">
              <Users className="mr-2 h-5 w-5" />
              View All Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default CaseStudies;
