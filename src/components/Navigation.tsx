import { Button } from "@/components/ui/button";
import { ChevronDown, Code, Smartphone, Palette, Zap, Database, Globe, Cloud, Github, Slack, Building2, ShoppingCart, Rocket, BookOpen, FileText, GraduationCap, Bot, GitBranch, Shield, Menu, X } from "@/lib/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile, useResponsive } from "@/hooks/use-mobile";

export const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isTablet } = useResponsive();
  const location = useLocation();

  // Function to check if a page is currently active (mobile only)
  const isActivePage = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenDropdown(null); // Close any open dropdowns
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BitBash</span>
          </a>
          
          {/* Mobile Menu Button - Sleek & Simple */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center mobile-hamburger-btn"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`hamburger-line ${
                  mobileMenuOpen ? 'hamburger-line-1-open' : ''
                }`}
                style={{ transform: mobileMenuOpen ? 'rotate(45deg)' : 'translateY(-4px)' }}
              />
              <span
                className={`hamburger-line ${
                  mobileMenuOpen ? 'hamburger-line-2-open' : ''
                }`}
                style={{ transform: mobileMenuOpen ? 'scale(0)' : 'translateY(0px)' }}
              />
              <span
                className={`hamburger-line ${
                  mobileMenuOpen ? 'hamburger-line-3-open' : ''
                }`}
                style={{ transform: mobileMenuOpen ? 'rotate(-45deg)' : 'translateY(4px)' }}
              />
            </div>
          </button>
          
          {/* Desktop Navigation Links with Dropdowns */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Automation Dropdown - PRIMARY */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('automation')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Automation</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'automation' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Automation Dropdown */}
              {openDropdown === 'automation' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Browser & Mobile Column */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Browser & Mobile</h3>
                      <div className="space-y-3">
                        <a href="/automation-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Browser Automation</div>
                            <p className="text-xs text-gray-500 mt-0.5">Selenium, Puppeteer, stealth scraping</p>
                          </div>
                        </a>
                        <a href="/automation-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Smartphone className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Mobile Automation</div>
                            <p className="text-xs text-gray-500 mt-0.5">iOS & Android app automation</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Stealth Technology</div>
                            <p className="text-xs text-gray-500 mt-0.5">Bot detection bypass, proxies</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Data & Workflow Column */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Data & Workflow</h3>
                      <div className="space-y-3">
                        <a href="/automation-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Data Extraction</div>
                            <p className="text-xs text-gray-500 mt-0.5">Custom scrapers for any website</p>
                          </div>
                        </a>
                        <a href="/automation-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Workflow Automation</div>
                            <p className="text-xs text-gray-500 mt-0.5">Business process automation</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <GitBranch className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">API Integration</div>
                            <p className="text-xs text-gray-500 mt-0.5">Connect to any platform</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Link */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="/automation-services" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      View all automation services
                      <span>→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Development Dropdown - SECONDARY */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('development')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-base font-normal text-gray-900">Development</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'development' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Development Dropdown */}
              {openDropdown === 'development' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 opacity-0 animate-fadeIn">
                      <div className="space-y-3">
                    <a href="/development-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                      <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                        <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Web Applications</div>
                        <p className="text-xs text-gray-500 mt-0.5">React, Vue, Angular solutions</p>
                          </div>
                        </a>
                    <a href="/development-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                      <Smartphone className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                        <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Mobile Apps</div>
                        <p className="text-xs text-gray-500 mt-0.5">Native and cross-platform</p>
                          </div>
                        </a>
                    <a href="/development-services" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                        <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">API Development</div>
                        <p className="text-xs text-gray-500 mt-0.5">RESTful and GraphQL APIs</p>
                          </div>
                        </a>
                  </div>

                  {/* Bottom Link */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a href="/development-services" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2">
                      View all development services
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
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">E-Commerce</div>
                            <p className="text-xs text-gray-500 mt-0.5">Price monitoring, inventory tracking</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Real Estate</div>
                            <p className="text-xs text-gray-500 mt-0.5">Listing scraping, market analysis</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Finance</div>
                            <p className="text-xs text-gray-500 mt-0.5">Data aggregation, reporting</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-4">By Use Case</h3>
                      <div className="space-y-3">
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Marketing</div>
                            <p className="text-xs text-gray-500 mt-0.5">Lead generation, social automation</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Enterprise</div>
                            <p className="text-xs text-gray-500 mt-0.5">Custom automation solutions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group">
                          <Rocket className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm group-hover:text-purple-600">Startups</div>
                            <p className="text-xs text-gray-500 mt-0.5">MVP automation and scaling</p>
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

            <a href="/pricing" className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-base font-normal text-gray-900">Pricing</span>
            </a>

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
          <div className="hidden md:flex items-center">
            <a href="/contact">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                Book Free Audit
            </Button>
            </a>
          </div>
        </div>
        
        {/* Mobile Menu with Slide Animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links with Staggered Animation */}
              <div className="space-y-2">
                <a 
                  href="/" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '50ms' : '0ms' }}
                >
                  Home
                </a>
                <a 
                  href="/automation-services" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/automation-services') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '100ms' : '0ms' }}
                >
                  Automation Services
                </a>
                <a 
                  href="/development-services" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/development-services') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '150ms' : '0ms' }}
                >
                  Development Services
                </a>
                <a 
                  href="/pricing" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/pricing') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '200ms' : '0ms' }}
                >
                  Pricing
                </a>
                <a 
                  href="/case-studies" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/case-studies') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '250ms' : '0ms' }}
                >
                  Case Studies
                </a>
                <a 
                  href="/contact" 
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:translate-x-2 hover:shadow-md mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  } ${
                    isActivePage('/contact') 
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600 font-semibold' 
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                  style={{ transitionDelay: mobileMenuOpen ? '300ms' : '0ms' }}
                >
                  Contact
                </a>
              </div>
              
              {/* Mobile CTA Button with Professional Animation */}
              <div className="pt-4 border-t border-gray-200">
                <a href="/contact" onClick={closeMobileMenu}>
                  <Button className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold btn-professional mobile-menu-item ${
                    mobileMenuOpen ? 'mobile-menu-item-enter-active' : 'mobile-menu-item-enter'
                  }`}
                  style={{ transitionDelay: mobileMenuOpen ? '350ms' : '0ms' }}
                  >
                    Book Free Audit
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
