import { Button } from "@/components/ui/button";
import { ChevronDown, Code, Smartphone, Palette, Zap, Database, Globe, Cloud, Github, Slack, Building2, ShoppingCart, Rocket, BookOpen, FileText, GraduationCap } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BitBash</span>
          </div>
          
          {/* Navigation Links with Dropdowns */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('features')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Features</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'features' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Features Dropdown */}
              {openDropdown === 'features' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Development Column */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Development</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Code className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Custom Development</div>
                            <p className="text-xs text-gray-500 mt-0.5">Build tailored solutions for your needs</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Smartphone className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Mobile Apps</div>
                            <p className="text-xs text-gray-500 mt-0.5">Native and cross-platform solutions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Web Applications</div>
                            <p className="text-xs text-gray-500 mt-0.5">Scalable web platforms and portals</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Platform Column */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Platform</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">API Development</div>
                            <p className="text-xs text-gray-500 mt-0.5">RESTful and GraphQL APIs</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Performance Optimization</div>
                            <p className="text-xs text-gray-500 mt-0.5">Lightning-fast load times</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Palette className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">UI/UX Design</div>
                            <p className="text-xs text-gray-500 mt-0.5">Beautiful, intuitive interfaces</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      View all features
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Integrations Dropdown */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('integrations')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Integrations</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'integrations' ? 'rotate-180' : ''}`} />
              </div>
              
              {openDropdown === 'integrations' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Development Tools</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Github className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">GitHub & GitLab</div>
                            <p className="text-xs text-gray-500 mt-0.5">Version control integration</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Cloud className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">AWS & Azure</div>
                            <p className="text-xs text-gray-500 mt-0.5">Cloud platform deployment</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Database Systems</div>
                            <p className="text-xs text-gray-500 mt-0.5">PostgreSQL, MongoDB, MySQL</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Collaboration</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Slack className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Slack & Teams</div>
                            <p className="text-xs text-gray-500 mt-0.5">Team communication tools</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">CI/CD Pipelines</div>
                            <p className="text-xs text-gray-500 mt-0.5">Jenkins, CircleCI, GitHub Actions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Code className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">API Integrations</div>
                            <p className="text-xs text-gray-500 mt-0.5">Connect with 1000+ services</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      View all integrations
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('solutions')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Solutions</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </div>
              
              {openDropdown === 'solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">By Industry</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <ShoppingCart className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">E-commerce</div>
                            <p className="text-xs text-gray-500 mt-0.5">Online store platforms</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Enterprise</div>
                            <p className="text-xs text-gray-500 mt-0.5">Large-scale business solutions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Rocket className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Startups</div>
                            <p className="text-xs text-gray-500 mt-0.5">MVP and rapid development</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">By Use Case</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Data Analytics</div>
                            <p className="text-xs text-gray-500 mt-0.5">Business intelligence platforms</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Smartphone className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Mobile First</div>
                            <p className="text-xs text-gray-500 mt-0.5">App-focused solutions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Cloud className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">SaaS Platforms</div>
                            <p className="text-xs text-gray-500 mt-0.5">Software as a Service</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      Explore all solutions
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-base font-normal text-gray-900">Pricing</span>
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('resources')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Resources</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
              </div>
              
              {openDropdown === 'resources' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Learn</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <BookOpen className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Documentation</div>
                            <p className="text-xs text-gray-500 mt-0.5">Complete technical guides</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <GraduationCap className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Tutorials</div>
                            <p className="text-xs text-gray-500 mt-0.5">Step-by-step learning paths</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Code className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Code Examples</div>
                            <p className="text-xs text-gray-500 mt-0.5">Ready-to-use snippets</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Support</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <FileText className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Blog</div>
                            <p className="text-xs text-gray-500 mt-0.5">Latest news and insights</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Slack className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Community</div>
                            <p className="text-xs text-gray-500 mt-0.5">Connect with developers</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">API Reference</div>
                            <p className="text-xs text-gray-500 mt-0.5">Complete API documentation</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="#" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      Browse all resources
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
