export const Footer = () => {
  return (
    <footer className="relative pt-80 pb-32 bg-[#1a1d29] text-white z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20 mb-32">
          {/* Development Services */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Development</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Custom Software</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Web Applications</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Development</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          {/* Automation */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Automation</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Web Scraping</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Data Extraction</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Workflow Automation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Browser Automation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Integration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Integrations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">AWS</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Slack</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Zapier</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Webhooks</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">E-Commerce</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Startups</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Agencies</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">SaaS</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-16 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">BitBash</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">support@bitbash.com</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center md:text-left mt-4">
            Copyright 2025. BITBASH PTE. LTD. All rights reserved!
          </p>
        </div>
      </div>
    </footer>
  );
};

