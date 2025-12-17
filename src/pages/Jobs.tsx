import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Users, Building2, Rocket, Sparkles } from "@/lib/icons";
import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Jobs - We're Hiring! | BitBash"
        description="Join the BitBash team! We're looking for great minds to help us build amazing software solutions."
        canonical="/jobs"
      />
      <Navigation />
      
      <div className="pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 mb-6 sm:mb-8">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                We're Hiring!
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Don't worry, we're looking for some great minds to join our team!
              </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 sm:p-10 md:p-12 mb-8 sm:mb-12 border border-purple-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 shadow-sm">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-600">Work in Progress</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Jobs Page is Coming Soon
                </h2>
                
                <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 leading-relaxed">
                  We're currently building an amazing careers page where you'll be able to explore 
                  open positions, learn about our culture, and apply to join our team. 
                  Stay tuned for exciting opportunities!
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Great Culture</h3>
                    <p className="text-sm text-gray-600">Work with a supportive and innovative team</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                      <Rocket className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                    <p className="text-sm text-gray-600">Advance your career with exciting projects</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Amazing Team</h3>
                    <p className="text-sm text-gray-600">Collaborate with talented developers</p>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-purple-200">
                  <p className="text-gray-700 mb-4 sm:mb-6">
                    Interested in joining us? We'd love to hear from you!
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    Get in Touch
                    <Rocket className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-500">
                Check back soon for open positions and more details about working at BitBash.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Jobs;
