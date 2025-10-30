import { Logo } from "@/components/Logo";

export const Footer = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  return (
    <footer className={`relative ${isHomepage ? 'pt-40 sm:pt-60 md:pt-80 pb-8 sm:pb-12 md:pb-16' : 'pt-12 sm:pt-16 pb-6 sm:pb-8'} bg-[#1a1d29] text-white z-10`}>
      <div className="container-responsive">
        {/* Footer Links Grid - Mobile Optimized */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${isHomepage ? 'mb-24 sm:mb-32 md:mb-40 lg:mb-48' : 'mb-20 sm:mb-24 md:mb-28 lg:mb-32'}`}>
          {/* Automation - PRIMARY (80%) */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Automation</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/browser-automation" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Browser Automation</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/mobile-automation" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Mobile Automation</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Web Scraping</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Data Extraction</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Workflow Automation</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Stealth Technology</a></li>
            </ul>
          </div>

          {/* Development - SECONDARY (20%) */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Development</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/development-services" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Web Applications</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/development-services" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Mobile Apps</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/development-services" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>API Development</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/development-services" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>UI/UX Design</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>E-Commerce</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Real Estate</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Finance</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Marketing</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Enterprise</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/case-studies" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Case Studies</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/pricing" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Pricing</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Blog</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Documentation</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>API Docs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 md:mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-3 m-0 p-0 list-none" style={{ paddingLeft: 0, marginLeft: 0 }}>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>About Us</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="/contact" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Contact</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Careers</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Privacy</a></li>
              <li className="m-0 p-0" style={{ paddingLeft: 0, marginLeft: 0, listStyle: 'none' }}><a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors" style={{ display: 'block' }}>Terms</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Full Width Divider */}
      <div className={`${isHomepage ? 'pt-12 sm:pt-16 md:pt-20 lg:pt-24' : 'pt-8 sm:pt-10 md:pt-12 lg:pt-14'} border-t border-gray-800`}>
        <div className="container-responsive">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <a href="/" className="hover:opacity-80 transition-opacity" style={{ padding: 0, display: 'block' }}>
              <Logo size="lg" variant="white" />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-gray-500" style={{ margin: 0, padding: 0, display: 'block' }}>
              Copyright 2025. BITBASH. LTD. All rights reserved!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">support@bitbash.com</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

