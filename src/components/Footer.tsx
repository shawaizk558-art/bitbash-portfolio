// import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { scrollToTopImmediate } from "@/lib/scrollToTop";
// import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const Footer = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  // const [copied, setCopied] = useState(false);

  // const handleCopyEmail = async () => {
  //   try {
  //     await navigator.clipboard.writeText("sale@bitbash.dev");
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 1500);
  //   } catch {
  //     // Fallback: do nothing if clipboard is unavailable
  //   }
  // };

  return (
    <footer className={`relative ${isHomepage ? 'pt-40 sm:pt-60 md:pt-80 pb-8 sm:pb-12 md:pb-16' : 'pt-12 sm:pt-16 pb-6 sm:pb-8'} bg-[#1a1d29] text-white z-0`}>
      <div className="container-responsive">
        {/* Footer Links Grid - Mobile Optimized */}
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${isHomepage ? 'mb-24 sm:mb-32 md:mb-40 lg:mb-48' : 'mb-20 sm:mb-24 md:mb-28 lg:mb-32'}`}>
          {/* Left Side Text */}
          <div className="lg:max-w-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Ready to build your next product?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
              From automation systems to scalable SaaS products, we design and ship software that performs in real-world conditions.
            </p>

            <ul className="m-0 mb-6 p-0 list-none space-y-2.5">
              <li className="text-xs sm:text-sm text-gray-300">2500+ projects delivered across multiple industries</li>
              <li className="text-xs sm:text-sm text-gray-300">Transparent process with weekly progress visibility</li>
              <li className="text-xs sm:text-sm text-gray-300">Dedicated team focused on speed, quality, and outcomes</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/portfolio"
                onClick={scrollToTopImmediate}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors"
              >
                View Portfolio
              </Link>
              <Link
                to="/pricing"
                onClick={scrollToTopImmediate}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-600 hover:border-gray-400 text-white text-sm font-semibold transition-colors"
              >
                Explore Pricing
              </Link>
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
                  to="/portfolio"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Portfolio
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

          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Why BitBash</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none">
              <li className="m-0 p-0 text-xs sm:text-sm text-gray-400">Execution-first product teams</li>
              <li className="m-0 p-0 text-xs sm:text-sm text-gray-400">Fast iterations and clean delivery</li>
              <li className="m-0 p-0 text-xs sm:text-sm text-gray-400">Architecture built for long-term scale</li>
              <li className="m-0 p-0 text-xs sm:text-sm text-gray-400">Clear reporting with zero guesswork</li>
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
                {/*<Link
                  to="/partners"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Partners
                </Link>*/}
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
              {/* <li className="m-0 p-0">
                <Link
                  to="/contact"
                  onClick={scrollToTopImmediate}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Contact
                </Link>
              </li> */}
              <li className="m-0 p-0">
                <Link
                  to="/careers"
                  onClick={(e) => {
                    // Don't prevent default - let React Router handle navigation
                    // Scroll will be handled by useEffect in Careers component
                  }}
                  className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block"
                >
                  Career
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
           {/* Trusted Partner and Certification Badges - aligned with logo removed */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              {/* Trusted Partner Separator and Logo
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
              */}
              {/* Certification Badges */}
              <img
                src="/badges/ssl-secured.webp"
                alt="SSL Secured"
                className="h-14 sm:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
              <img
                src="/badges/norton-secured.webp"
                alt="Norton Secured"
                className="h-14 sm:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
              <img
                src="/badges/pci-compliant.webp"
                alt="PCI Compliant"
                className="h-14 sm:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12 mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-500 m-0 p-0 block">
              Copyright 2026. BITBASH. LTD. All rights reserved!
            </p>

            {/* Email Link removed
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
            */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
