import { Button } from "@/components/ui/button";
import { ChevronDown, Code, Smartphone, Palette, Zap, Database, Globe, Cloud, Github, Building2, ShoppingCart, Rocket, Bot, GitBranch, Shield, Menu, X, Search } from "@/lib/icons";
import { useEffect, useRef, useState, useMemo, memo, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "@/components/Logo";
import { ContactButton } from "@/components/ContactButton";
import { scrollToTopImmediate } from "@/lib/scrollToTop";
import { useProjectsSearch } from "@/contexts/ProjectsSearchContext";

const NavigationComponent = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";
  const { searchQuery, setSearchQuery, filteredCount, totalCount } = useProjectsSearch();

  // Track scroll position to show search bar only when scrolled on Projects page
  // Use throttled handler on mobile to reduce work
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50); // Show search after scrolling 50px
  }, []);

  useEffect(() => {
    if (!isProjectsPage) return;

    // On mobile, throttle scroll events more aggressively
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    // Defer initial scroll check to avoid forced reflow during mount
    // requestAnimationFrame ensures layout is complete before querying scroll position
    requestAnimationFrame(() => {
      handleScroll();
    });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [isProjectsPage, handleScroll]);

  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  // Memoize menu items to prevent recreation on every render
  const servicesMenuItems = useMemo(() => [
    {
      title: "Automation",
      description: "Browser, mobile, and workflow automation",
      icon: Zap,
      href: "/services/automation",
    },
    {
      title: "Scraping",
      description: "Data extraction and enrichment at scale",
      icon: Database,
      href: "/services/scraping",
    },
    {
      title: "Full Stack Development",
      description: "Frontend, backend, infra — end-to-end builds",
      icon: Code,
      href: "/services/full-stack",
    },
    {
      title: "AI Solutions",
      description: "Custom AI agents, copilots, and ML pipelines",
      icon: Bot,
      href: "/services/ai-solutions",
    },
    {
      title: "SAAS MVP",
      description: "Launch-ready SaaS builds in weeks",
      icon: Rocket,
      href: "/services/saas-mvp",
    },
  ], []);

  // Function to check if a page is currently active (mobile only)
  const isActivePage = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    return location.pathname === path;
  };

  // Memoize handlers to prevent re-renders
  const toggleDropdown = useCallback((dropdown: string) => {
    setOpenDropdown(prev => prev === dropdown ? null : dropdown);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
    setOpenDropdown(null); // Close any open dropdowns
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const panel = mobileMenuRef.current;
      const toggle = menuToggleRef.current;
      if (!panel) return;

      const target = event.target as Node;
      const isInPanel = panel.contains(target);
      const isInToggle = toggle && toggle.contains(target);

      // Only close if click is outside both panel and toggle
      if (!isInPanel && !isInToggle) {
        closeMobileMenu();
      }
    };

    // Only use click-outside detection, no hover-based closing
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!openDropdown) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const refsMap: Record<string, React.RefObject<HTMLDivElement>> = {
        services: servicesRef,
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
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="container-responsive px-4 sm:px-0">
          <div className="flex items-center h-14 sm:h-16">
            {/* Logo - Left Side */}
            <Link
              to="/"
              className="flex items-center space-x-1.5 sm:space-x-2 hover:opacity-80 transition-opacity lg:min-h-[44px] min-h-[44px]"
              onClick={() => {
                scrollToTopImmediate();
                closeMobileMenu();
              }}
            >
              <Logo size="lg" variant="default" className="text-lg sm:text-xl md:text-2xl lg:text-3xl" />
            </Link>

            {/* Mobile Menu Button - Sleek & Simple */}
            <button
              ref={menuToggleRef}
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-lg focus:outline-none ml-auto min-h-[44px] min-w-[44px]"
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

            {/* Desktop Navigation Links with Dropdowns - Centered OR Search Bar on Projects Page when scrolled or when searching */}
            <div
              className="hidden lg:flex items-center space-x-1 xl:space-x-2 absolute left-1/2 transform -translate-x-1/2 transition-all duration-300"
            >
              {isProjectsPage && (isScrolled || searchQuery.trim()) ? (
                /* Search Bar - Only on Projects Page when scrolled */
                <div className="w-[400px] max-w-[90vw]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white/95 backdrop-blur-md shadow-sm ${searchQuery.trim() ? 'pr-28' : 'pr-20'
                        }`}
                    />
                    {searchQuery.trim() && (
                      <>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium">
                          {filteredCount} {filteredCount === 1 ? 'project' : 'projects'}
                        </div>
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-20 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Clear search"
                        >
                          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      </>
                    )}
                    {!searchQuery.trim() && totalCount > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500 font-medium">
                        {totalCount} {totalCount === 1 ? 'project' : 'projects'}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Services Dropdown */}
                  <div className="relative" ref={servicesRef}>
                    <div
                      onClick={() => toggleDropdown('services')}
                      className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
                    >
                      <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Services</span>
                      <ChevronDown className={`w-4 h-4 text-gray-900 transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
                    </div>

                    {openDropdown === 'services' && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-3.5 sm:p-4 opacity-0 animate-fadeIn">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                          {servicesMenuItems.map(({ title, description, icon: Icon, href }) => (
                            <Link
                              key={title}
                              to={href}
                              onClick={() => {
                                scrollToTopImmediate();
                                setOpenDropdown(null);
                              }}
                              className="flex items-start gap-2.5 p-3 sm:p-3 rounded-xl border border-transparent hover:border-purple-100 hover:bg-purple-50/60 transition-all"
                            >
                              <div className="mt-0.5">
                                <Icon className="w-5 h-5 text-purple-600" />
                              </div>
                              <div className="space-y-1">
                                <div className="font-semibold text-gray-900 text-sm sm:text-sm">{title}</div>
                                <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">{description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3.5 pt-3.5 border-t border-gray-200 flex justify-center">
                          <a
                            href="/services"
                            onClick={scrollToTopImmediate}
                            className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 leading-tight"
                          >
                            View all services
                            <span className="text-base leading-none translate-y-[1px]">→</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>


                  <Link
                    to="/projects"
                    className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
                    onClick={scrollToTopImmediate}
                  >
                    <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Projects</span>
                  </Link>

                  <Link
                    to="/pricing"
                    className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
                    onClick={scrollToTopImmediate}
                  >
                    <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Pricing</span>
                  </Link>

                  <Link
                    to="/our-work-model"
                    className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
                    onClick={scrollToTopImmediate}
                  >
                    <span className="font-normal text-black text-base lg:text-[17px] whitespace-nowrap" style={{ fontSize: '17px' }}>Our Work Model</span>
                  </Link>

                  <Link
                    to="/careers"
                    className="flex items-center space-x-1 cursor-pointer group px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] lg:min-h-0"
                    onClick={scrollToTopImmediate}
                  >
                    <span className="font-normal text-black text-base lg:text-[17px]" style={{ fontSize: '17px' }}>Careers</span>
                  </Link>
                </>
              )}
            </div>

            {/* Desktop CTA Buttons - Right Side */}
            {/*<div className="hidden lg:flex items-center ml-auto">
              <ContactButton label="Contact us" fullWidth={false} />
            </div>*/}
          </div>

        </div>
      </nav>

      {/* Mobile Menu - Sidebar Design - OUTSIDE NAV */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0"
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
            className="absolute left-0 top-0 h-full w-[75vw] sm:w-80 max-w-sm z-10 flex flex-col"
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
                <Link
                  to="/"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Home</span>
                </Link>
                <div className="flex flex-col gap-2 py-3 px-2 text-base sm:text-lg font-medium text-white min-h-[44px] rounded-lg">
                  <div className="flex items-center justify-between">
                    <span>Services</span>
                  </div>
                  <div className="pl-3 space-y-2 text-sm sm:text-base font-normal text-white/90">
                    <div>Automation</div>
                    <div>Scraping</div>
                    <div>Full Stack Development</div>
                    <div>AI Solutions</div>
                    <div>SAAS MVP</div>
                  </div>
                </div>
                <Link
                  to="/projects"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Projects</span>
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Pricing</span>
                </Link>
                <Link
                  to="/our-work-model"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Our Work Model</span>
                </Link>
                <Link
                  to="/careers"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Careers</span>
                </Link>
                {/* <Link
                  to="/contact"
                  className="flex items-center justify-between py-3 px-2 text-base sm:text-lg font-medium text-white hover:text-purple-300 transition-colors min-h-[44px] rounded-lg"
                  onClick={() => {
                    scrollToTopImmediate();
                    closeMobileMenu();
                  }}
                >
                  <span>Contact</span>
                </Link>
                */}
              </div>
            </div>

            {/* CTA Buttons - At Bottom
            <div className="px-4 sm:px-6 py-4 sm:py-6 pt-6 sm:pt-8">
              <Link
                to="/contact"
                onClick={() => {
                  scrollToTopImmediate();
                  closeMobileMenu();
                }}
                className="block w-full text-center py-3 sm:py-4 text-base font-bold text-white border-2 border-white rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 mb-3 sm:mb-4 min-h-[44px] flex items-center justify-center"
              >
                Contact us
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  scrollToTopImmediate();
                  closeMobileMenu();
                }}
                className="block"
              >
                <button
                  className="w-full py-3 sm:py-4 text-base font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-all duration-300 min-h-[44px]"
                >
                  Schedule a call
                </button>
              </Link>
            </div>
            */}
          </div>
        </div>
      )}
    </>
  );
};

// Memoize Navigation component to prevent unnecessary re-renders on mobile
export const Navigation = memo(NavigationComponent);
