import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { scrollToTopImmediate } from "@/lib/scrollToTop";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export const Footer = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sale@bitbash.dev");
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
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${isHomepage ? 'mb-24 sm:mb-32 md:mb-40 lg:mb-48' : 'mb-20 sm:mb-24 md:mb-28 lg:mb-32'}`}>
          {/* Left Side Text */}
          <div className="lg:max-w-xs">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              READY TO WORK
              <br />
              TOGETHER?
            </h2>
            <p className="text-sm sm:text-base text-white leading-relaxed mb-6">
              LET'S MAKE IT HAPPEN
            </p>
            
            {/* Quick Chat Options */}
            <div className="space-y-3">
              <a
                href="https://api.whatsapp.com/send/?phone=923249868488&text=Hi+Zeeshan%2C+I%27m+interested+in+automation.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
              >
                Chat on WhatsApp
              </a>
              <a
                href="https://t.me/Bitbash333"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 hover:bg-blue-500 text-white text-center py-3 px-4 rounded-lg transition-colors font-medium"
              >
                Chat on Telegram
              </a>
            </div>
          </div>

          {/* Right Side Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Services Section */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none">
              <li className="m-0 p-0">
                <Link
                  to="/services/automation"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Automation
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/services/scraping"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Scraping
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/services/full-stack"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Full Stack Development
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/services/ai-solutions"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  AI Solutions
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/services/saas-mvp"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  SAAS MVP
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/services"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none">
              <li className="m-0 p-0">
                <Link
                  to="/pricing"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Pricing
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/projects"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Projects
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/blog"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none">
              <li className="m-0 p-0">
                <a
                  href="mailto:sale@bitbash.dev"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="#EA4335" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                  Email
                </a>
              </li>
              <li className="m-0 p-0">
                <a
                  href="https://api.whatsapp.com/send/?phone=923249868488&text=Hi+Zeeshan%2C+I%27m+interested+in+automation.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block flex items-center gap-2"
                >
                  <img
                    src="/logos/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-4 h-4"
                  />
                  WhatsApp
                </a>
              </li>
              <li className="m-0 p-0">
                <a
                  href="https://t.me/Bitbash333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block flex items-center gap-2"
                >
                  <img
                    src="/logos/telegram.svg"
                    alt="Telegram"
                    className="w-4 h-4"
                  />
                  Telegram
                </a>
              </li>
              <li className="m-0 p-0">
                <a
                  href="https://calendar.app.google/RSyUVmGtkqpucGCY7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5zm7 4h5v5h-5v-5z"/>
                  </svg>
                  Book a Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none">
              <li className="m-0 p-0">
                <Link
                  to="/"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  About Us
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/partners"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Partners
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/our-work-model"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Our Work Model
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/contact"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Contact
                </Link>
              </li>
              <li className="m-0 p-0">
                <Link
                  to="/jobs"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block flex items-center gap-2"
                >
                  Jobs
                  <Badge className="bg-white text-gray-900 hover:bg-gray-100 text-xs sm:text-sm px-2 py-0.5 rounded-md">
                    We're hiring!
                  </Badge>
                </Link>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Full Width Divider */}
      <div className={`${isHomepage ? 'pt-12 sm:pt-16 md:pt-20 lg:pt-24' : 'pt-8 sm:pt-10 md:pt-12 lg:pt-14'} border-t border-gray-800`}>
        <div className="container-responsive">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12 mt-4 sm:mt-6 md:mt-8 mb-0">
            <Link
              to="/"
              onClick={scrollToTopImmediate}
              className="hover:opacity-80 transition-opacity inline-block"
            >
              <Logo size="lg" variant="white" />
            </Link>
            {/* Trusted Partner and Certification Badges - aligned with logo */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              {/* Trusted Partner Separator and Logo */}
              <div className="flex flex-col items-center gap-2 pr-3 sm:pr-4 border-r border-gray-700">
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider whitespace-nowrap">Trusted Partner</span>
                <a
                  href="https://tradeproxy.net/?utm_source=bitbash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity"
                  title="TradeProxy - Residential and Mobile Proxies"
                >
                  <img
                    src="/trade-proxy.svg"
                    alt="TradeProxy"
                    className="h-10 sm:h-12 w-auto"
                  />
                </a>
              </div>
              {/* Certification Badges */}
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
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12 mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-500 m-0 p-0 block">
              Copyright 2025. BITBASH. LTD. All rights reserved!
            </p>

            {/* Email Link - aligned with copyright text */}
            <div className="flex items-center">
              <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors focus:outline-none"
                  >
                    sale@bitbash.dev
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
