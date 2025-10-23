export const Footer = ({ isHomepage = false }: { isHomepage?: boolean }) => {
  return (
    <footer className={`relative ${isHomepage ? 'pt-40 sm:pt-60 md:pt-80 pb-16 sm:pb-24 md:pb-32' : 'pt-12 sm:pt-16 pb-12 sm:pb-16'} bg-[#1a1d29] text-white z-10`}>
      <div className="container-responsive">
        {/* Footer Links Grid - Mobile Optimized */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16 lg:gap-20 ${isHomepage ? 'mb-16 sm:mb-24 md:mb-32' : 'mb-12 sm:mb-16'}`}>
          {/* Automation - PRIMARY (80%) */}
          <div>
            <h3 className="text-responsive-xs font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">Automation</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/browser-automation" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Browser Automation</a></li>
              <li><a href="/mobile-automation" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Mobile Automation</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Web Scraping</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Data Extraction</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Workflow Automation</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Stealth Technology</a></li>
            </ul>
          </div>

          {/* Development - SECONDARY (20%) */}
          <div>
            <h3 className="text-responsive-xs font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">Development</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/development-services" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Web Applications</a></li>
              <li><a href="/development-services" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Mobile Apps</a></li>
              <li><a href="/development-services" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">API Development</a></li>
              <li><a href="/development-services" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-responsive-xs font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">E-Commerce</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Real Estate</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Finance</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Marketing</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Enterprise</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-responsive-xs font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/case-studies" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Case Studies</a></li>
              <li><a href="/pricing" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Pricing</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Blog</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Documentation</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">API Docs</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-responsive-xs font-bold text-white mb-3 sm:mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">About Us</a></li>
              <li><a href="/contact" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Contact</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Careers</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Privacy</a></li>
              <li><a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Mobile Optimized */}
        <div className={`${isHomepage ? 'pt-12 sm:pt-16' : 'pt-6 sm:pt-8'} border-t border-gray-800`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity touch-friendly">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">B</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">BitBash</span>
            </a>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">support@bitbash.com</a>
              <a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Privacy</a>
              <a href="#" className="text-responsive-xs text-gray-400 hover:text-white transition-colors touch-friendly">Terms of Service</a>
            </div>
          </div>
          
          <p className="text-responsive-xs text-gray-500 text-center sm:text-left mt-4">
            Copyright 2025. BITBASH PTE. LTD. All rights reserved!
          </p>
        </div>
      </div>
    </footer>
  );
};

