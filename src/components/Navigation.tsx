import { Button } from "@/components/ui/button";
import { ChevronDown, Code, Smartphone, Palette, Zap, Database, Globe, Cloud, Github, Building2, ShoppingCart, Rocket, Bot, GitBranch, Shield, Menu, X } from "@/lib/icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile, useResponsive } from "@/hooks/use-mobile";
import { Logo } from "@/components/Logo";

export const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const isMobile = useIsMobile();
  const { isTablet } = useResponsive();
  const location = useLocation();

  // Refs used to measure available space and decide when to collapse
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerLinksRef = useRef<HTMLDivElement | null>(null);
  const rightCtaRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const isTransitioningRef = useRef(false);
  const lastMeasurementRef = useRef(0);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const automationRef = useRef<HTMLDivElement | null>(null);
  const developmentRef = useRef<HTMLDivElement | null>(null);
  const solutionsRef = useRef<HTMLDivElement | null>(null);

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

  // Detect overflow of nav items and force collapse if needed
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let lastWidth = 0;

    const measureAndSet = () => {
      // Prevent measurement during transitions
      if (isTransitioningRef.current) return;
      
      // Throttle measurements - don't measure more than once per 200ms
      const now = Date.now();
      if (now - lastMeasurementRef.current < 200) return;
      lastMeasurementRef.current = now;

      const container = containerRef.current;
      const center = centerLinksRef.current;
      const right = rightCtaRef.current;
      const logo = logoRef.current;
      
      if (!container || !center || !right || !logo) return;

      const containerWidth = container.clientWidth;
      
      // Skip if width hasn't changed significantly
      if (Math.abs(containerWidth - lastWidth) < 10) {
        return;
      }
      lastWidth = containerWidth;

      // Temporarily show elements to measure accurately using inline styles
      const centerOriginalStyle = center.style.cssText;
      const rightOriginalStyle = right.style.cssText;
      
      // Force visibility for measurement (override any CSS classes)
      center.style.setProperty('visibility', 'visible', 'important');
      center.style.setProperty('opacity', '1', 'important');
      center.style.setProperty('pointer-events', 'auto', 'important');
      right.style.setProperty('visibility', 'visible', 'important');
      right.style.setProperty('opacity', '1', 'important');
      right.style.setProperty('pointer-events', 'auto', 'important');
      
      // Force reflow to ensure styles are applied
      void container.offsetHeight;

      const centerRect = center.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();

      // Restore original styles
      center.style.cssText = centerOriginalStyle;
      right.style.cssText = rightOriginalStyle;

      const centerWidth = centerRect.width;
      const rightWidth = rightRect.width;
      const logoWidth = logoRect.width;
      const spacing = 80; // Larger buffer to avoid any near-collisions

      // Calculate total space needed
      const totalNeeded = logoWidth + centerWidth + rightWidth + spacing;
      
      // Hysteresis: different thresholds for collapsing vs expanding
      const collapseThreshold = containerWidth - 180; // Collapse much earlier
      const expandThreshold = containerWidth - 260; // Require generous space to expand

      let nextState: boolean;
      
      if (shouldCollapse) {
        // Currently collapsed - only expand if there's clearly enough space
        // If totalNeeded is less than expandThreshold, we have enough space to expand
        nextState = totalNeeded >= expandThreshold; // true = stay collapsed, false = expand
      } else {
        // Currently expanded - collapse if not enough space
        nextState = totalNeeded > collapseThreshold; // true = collapse, false = stay expanded
      }

      if (nextState !== shouldCollapse) {
        isTransitioningRef.current = true;
        setShouldCollapse(nextState);
        // Allow measurements again after transition completes
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 300);
      }
    };

    const debouncedMeasure = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        requestAnimationFrame(measureAndSet);
      }, 50);
    };

    // Initial measurement after mount
    timeoutId = setTimeout(() => {
      requestAnimationFrame(measureAndSet);
    }, 300);

    // Observe container size changes
    const ro = new ResizeObserver(debouncedMeasure);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    
    window.addEventListener('resize', debouncedMeasure, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      ro.disconnect();
      window.removeEventListener('resize', debouncedMeasure);
    };
  }, [shouldCollapse]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const panel = mobileMenuRef.current;
      const toggle = menuToggleRef.current;
      if (!panel) return;
      const target = event.target as Node;
      if (!panel.contains(target) && (!toggle || !toggle.contains(target))) {
        closeMobileMenu();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const panel = mobileMenuRef.current;
      if (!panel) return;
      const target = event.target as Node;
      if (!panel.contains(target)) {
        closeMobileMenu();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("pointermove", handlePointerMove);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!openDropdown) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const refsMap: Record<string, React.RefObject<HTMLDivElement>> = {
        automation: automationRef,
        development: developmentRef,
      };
      const activeRef = refsMap[openDropdown];
      if (activeRef?.current && !activeRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
    };
  }, [openDropdown]);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container-responsive" ref={containerRef}>
        <div className="flex items-center h-16">
          {/* Logo - Left Side */}
          <a ref={logoRef} href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity lg:min-h-[44px] min-h-[44px]" onClick={closeMobileMenu}>
            <Logo size="lg" variant="default" />
          </a>
          
          {/* Mobile Menu Button - Sleek & Simple */}
          <button
            ref={menuToggleRef}
            onClick={toggleMobileMenu}
            className={`${shouldCollapse ? 'flex' : 'lg:hidden'} flex items-center justify-center w-11 h-11 rounded-lg focus:outline-none ml-auto min-h-[44px] min-w-[44px]`}
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
          
          {/* Desktop Navigation Links with Dropdowns - Centered */}
          <div
            ref={centerLinksRef}
            className={`hidden lg:flex items-center space-x-1 xl:space-x-2 absolute left-1/2 transform -translate-x-1/2 ${shouldCollapse ? 'lg:invisible lg:pointer-events-none' : ''}`}
          >
            {/* Automation Dropdown - PRIMARY */}
            <div className="relative" ref={automationRef}>
              <div 
                onClick={() => toggleDropdown('automation')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
              >
                <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Automation</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'automation' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Automation Dropdown */}
              {openDropdown === 'automation' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-[600px] lg:w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 opacity-0 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {/* Browser & Mobile Column */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">Browser & Mobile</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a href="/automation-services" className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors group min-h-[44px]">
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
                      <h3 className="text-sm font-bold text-gray-900 mb-3 sm:mb-4">Data & Workflow</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <a href="/automation-services" className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors group min-h-[44px]">
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
            <div className="relative" ref={developmentRef}>
              <div 
                onClick={() => toggleDropdown('development')}
                className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
              >
                <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Development</span>
                <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'development' ? 'rotate-180' : ''}`} />
              </div>
              
              {/* Development Dropdown */}
              {openDropdown === 'development' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-[400px] lg:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 opacity-0 animate-fadeIn">
                      <div className="space-y-2 sm:space-y-3">
                    <a href="/development-services" className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors group min-h-[44px]">
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


            <a href="/projects" className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0">
              <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Portfolio</span>
            </a>

            <a href="/pricing" className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0">
              <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Pricing</span>
            </a>

            <a href="/how-we-work" className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0">
              <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Our Work Model</span>
            </a>

          </div>
          
          {/* Desktop CTA Buttons - Right Side */}
          <div
            ref={rightCtaRef}
            className={`hidden lg:flex items-center ml-auto ${shouldCollapse ? 'lg:absolute lg:right-0 lg:opacity-0 lg:pointer-events-none' : ''}`}
          >
            <a href="/contact">
              <button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-5 py-2 rounded-md flex items-center justify-center"
                style={{
                  height: '38px'
                }}
              >
                Contact us
              </button>
            </a>
          </div>
        </div>
        
      </div>
    </nav>
    
    {/* Mobile Menu - Sidebar Design - OUTSIDE NAV */}
        {mobileMenuOpen && (
          <div 
            className={`${shouldCollapse ? '' : 'lg:hidden'} fixed inset-0`} 
            style={{ zIndex: 9999 }} 
          >
            {/* Semi-transparent backdrop */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={closeMobileMenu}
            />
            
            {/* Menu Panel - Dark sidebar */}
            <div 
              className="absolute left-0 top-0 h-full w-[85vw] sm:w-80 max-w-sm z-10 flex flex-col"
              style={{ 
                backgroundColor: 'oklch(21% 0.034 264.665)',
                opacity: 1
              }}
              ref={mobileMenuRef}
            >
              <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 flex-1 overflow-y-auto">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 pb-6">
                  <Logo size="md" variant="white" />
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                <a 
                  href="/" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <span>Home</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/automation-services" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <span>Automation</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/development-services" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <span>Development</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a 
                  href="/pricing" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <span>Pricing</span>
                </a>
                <a 
                  href="/how-we-work" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <span>Our Work Model</span>
                </a>
                <a 
                  href="/contact" 
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
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
              <div className="px-4 sm:px-6 py-4 sm:py-6 pt-6 sm:pt-8">
                <a href="/contact" onClick={closeMobileMenu} className="block w-full text-center py-3 sm:py-4 text-base font-bold text-white border-2 border-white rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 mb-3 sm:mb-4 min-h-[44px] flex items-center justify-center">
                  Contact us
                </a>
                <a href="/contact" onClick={closeMobileMenu} className="block">
                  <button 
                    className="w-full py-3 sm:py-4 text-base font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 min-h-[44px]"
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
