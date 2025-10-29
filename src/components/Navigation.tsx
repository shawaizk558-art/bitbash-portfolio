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
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container-responsive">
        <div className="flex items-center h-16">
          {/* Logo - Left Side */}
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity" onClick={closeMobileMenu}>
            <span className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
              B
              <span className="relative inline-block align-baseline">
                {/* Use dotless i to avoid the default black dot */}
                ı
                {/* Purple dot overlay */}
                <span className="absolute top-[0.12em] left-1/2 -translate-x-1/2 w-[0.2em] h-[0.2em] bg-purple-600 rounded-full"></span>
              </span>
              tBash
            </span>
          </a>
          
          {/* Mobile Menu Button - Sleek & Simple */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none ml-auto"
            aria-label="Toggle mobile menu"
          >
            {!mobileMenuOpen && (
              <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                <span
                  className="hamburger-line"
                  style={{ 
                    transform: 'translateY(-3px)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{ 
                    transform: 'translateY(0px)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
                <span
                  className="hamburger-line"
                  style={{ 
                    transform: 'translateY(3px)',
                    transition: 'transform 0.3s ease-in-out'
                  }}
                />
              </div>
            )}
          </button>
          
          {/* Tablet Navigation - Simplified */}
          <div className="hidden md:flex lg:hidden items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
            <a href="/automation-services" className="flex items-center space-x-1 cursor-pointer group px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-normal text-black" style={{ fontSize: '17px' }}>Automation</span>
            </a>
            <a href="/development-services" className="flex items-center space-x-1 cursor-pointer group px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-normal text-black" style={{ fontSize: '17px' }}>Development</span>
            </a>
            <a href="/pricing" className="flex items-center space-x-1 cursor-pointer group px-2 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="font-normal text-black" style={{ fontSize: '17px' }}>Pricing</span>
            </a>
          </div>
          
          {/* Desktop Navigation Links with Dropdowns - Centered */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 absolute left-1/2 transform -translate-x-1/2">
            {/* Automation Dropdown - PRIMARY */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('automation')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-normal text-black" style={{ fontSize: '17px' }}>Automation</span>
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
                <span className="font-normal text-black" style={{ fontSize: '17px' }}>Development</span>
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
                <span className="font-normal text-black" style={{ fontSize: '17px' }}>Solutions</span>
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
              <span className="font-normal text-black" style={{ fontSize: '17px' }}>Pricing</span>
            </a>

            {/* Resources Dropdown */}
            <div className="relative">
              <div 
                onClick={() => toggleDropdown('resources')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-normal text-black" style={{ fontSize: '17px' }}>Resources</span>
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
          
          {/* Tablet CTA Buttons */}
          <div className="hidden md:flex lg:hidden items-center space-x-3 ml-auto">
            <a href="/contact" className="text-purple-600 hover:text-purple-700 font-bold text-sm transition-colors">
              Contact
            </a>
            <a href="/contact">
              <button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300 font-bold text-sm px-3 py-1.5 rounded-md"
                style={{ fontSize: '14px' }}
              >
                Schedule Call
              </button>
            </a>
          </div>
          
          {/* Desktop CTA Buttons - Right Side */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 ml-auto">
            <a href="/contact" className="text-purple-600 hover:text-purple-700 font-bold text-base transition-colors">
              Contact us
            </a>
            <a href="/contact">
              <button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-4 rounded-md flex items-center justify-center"
                style={{
                  width: '158.38px', 
                  height: '38px'
                }}
              >
                Schedule a call
              </button>
            </a>
          </div>
        </div>
        
      </div>
    </nav>
    
    {/* Mobile Menu - Sidebar Design - OUTSIDE NAV */}
    {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0" style={{ 
            zIndex: 9999
          }}>
            {/* Semi-transparent backdrop */}
            <div className="absolute inset-0" style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }} onClick={closeMobileMenu} />
            
            {/* Menu Panel - Dark sidebar */}
            <div className="absolute left-0 top-0 h-full w-80 z-10 flex flex-col" style={{ 
              backgroundColor: 'oklch(21% 0.034 264.665)',
              opacity: 1
            }} onClick={(e) => e.stopPropagation()}>
              <div className="p-8 space-y-8 flex-1">
              {/* Logo Section */}
              <div className="flex items-center space-x-3 pb-6">
                <span className="text-xl font-bold text-white">BitBash</span>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <a 
                  href="/" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Home</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/automation-services" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Automation</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/development-services" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Development</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/pricing" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Pricing</span>
                </a>
                <a 
                  href="/case-studies" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Case Studies</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/contact" 
                  className="flex items-center justify-between py-3 text-lg font-medium text-white hover:text-purple-300 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <span>Contact</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              </div>
              
              {/* CTA Buttons - At Bottom */}
              <div className="px-6 py-6 pt-8">
                <a href="/contact" onClick={closeMobileMenu} className="block w-full text-center py-3 text-base font-bold text-white border-2 border-white rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 mb-4">
                  Contact us
                </a>
                <a href="/contact" onClick={closeMobileMenu} className="block">
                  <button 
                    className="w-full py-3 text-base font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300"
                  >
                    Schedule a call
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
