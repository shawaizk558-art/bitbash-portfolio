import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { scrollToTopImmediate } from "@/lib/scrollToTop";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const Footer = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("support@bitbash.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: do nothing if clipboard is unavailable
    }
  };

  return (
    <footer className={`relative ${isHomepage ? 'pt-40 sm:pt-60 md:pt-80 pb-8 sm:pb-12 md:pb-16' : 'pt-12 sm:pt-16 pb-6 sm:pb-8'} bg-[#1a1d29] text-white z-10`}>
      <div className="container-responsive">
        {/* Footer Links Grid - Mobile Optimized */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${isHomepage ? 'mb-24 sm:mb-32 md:mb-40 lg:mb-48' : 'mb-20 sm:mb-24 md:mb-28 lg:mb-32'}`}>
          {/* Automation - PRIMARY (80%) */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Automation</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Browser Automation
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Mobile Automation
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Web Scraping
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Data Extraction
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Workflow Automation
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/automation-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: 'block' }}
                >
                  Stealth Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Development - SECONDARY (20%) */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Development</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/development-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  Web Applications
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/development-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  Mobile Apps
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/development-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  API Development
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/development-services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  E-Commerce
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Real Estate
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Finance
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Marketing
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Enterprise
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/pricing"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  Pricing
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/projects"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  Projects
                </Link>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <Link
                  to="/how-we-work"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  style={{ display: "block" }}
                >
                  Engagement Model
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  About Us
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Contact
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Careers
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Privacy
                </span>
              </li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}>
                <span className="text-xs sm:text-sm text-gray-400" style={{ display: "block" }}>
                  Terms
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Full Width Divider */}
      <div className={`${isHomepage ? 'pt-12 sm:pt-16 md:pt-20 lg:pt-24' : 'pt-8 sm:pt-10 md:pt-12 lg:pt-14'} border-t border-gray-800`}>
        <div className="container-responsive">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <Link
              to="/"
              onClick={scrollToTopImmediate}
              className="hover:opacity-80 transition-opacity"
              style={{ padding: 0, display: "block" }}
            >
              <Logo size="lg" variant="white" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-500" style={{ margin: 0, padding: 0, display: 'block' }}>
              Copyright 2025. BITBASH. LTD. All rights reserved!
            </p>

            <div className="flex flex-col items-center sm:items-end gap-4">
              {/* Certification Badges */}
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src="/badges/ssl-secured.png"
                  alt="SSL Secured"
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/badges/norton-secured.png"
                  alt="Norton Secured"
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/badges/pci-compliant.png"
                  alt="PCI Compliant"
                  className="h-12 sm:h-14 w-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <Tooltip open={copied}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors focus:outline-none"
                    >
                      support@bitbash.com
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    sideOffset={6}
                    className="text-white bg-transparent border-none shadow-none px-0 py-0"
                  >
                    Copied
                  </TooltipContent>
                </Tooltip>
                <span className="text-xs sm:text-sm text-gray-400">
                  Privacy
                </span>
                <span className="text-xs sm:text-sm text-gray-400">
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

