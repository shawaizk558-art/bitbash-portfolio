import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/HeroBackground";
import { ArrowRight, ExternalLink, Globe, TrendingUp, Users, Handshake, Building2, Target, GitBranch } from "@/lib/icons";
import { ContactButton } from "@/components/ContactButton";

interface Partner {
  name: string;
  link: string;
  logo: string;
  description: string;
  website: string;
}

const Partners = () => {
  const partners: Partner[] = [
    {
      name: "TradeProxy",
      link: "https://tradeproxy.net/?utm_source=bitbash",
      logo: "/trade-proxy.svg",
      description: "TradeProxy, an official partner of major proxy brands, offers residential and mobile IPv4 proxies at 30–70% less than the original prices, with full HTTP/SOCKS5 support and multilingual customer assistance",
      website: "tradeproxy.net"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Our Partners - BitBash"
        description="Meet our trusted partners who help us deliver exceptional automation, scraping, and development services."
        canonical="/partners"
      />
      <Navigation />

      {/* Partners Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Partners
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Working with trusted partners to deliver exceptional solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            {partners.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden"
                  >
                    {/* Partner Logo */}
                    <div className="p-6 sm:p-8 pb-4 sm:pb-6 flex items-center justify-center bg-gray-50 border-b border-gray-200">
                      <div className="relative w-full max-w-[200px] h-16 sm:h-20 flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Partner Content */}
                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {partner.name}
                      </h3>

                      <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                        {partner.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm text-gray-500 font-medium">
                          {partner.website}
                        </span>
                        <a
                          href={partner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors text-sm sm:text-base group/link"
                        >
                          Visit Website
                          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No partners to display at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits of Becoming a Partner */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Benefits of Becoming a Partner
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Join our network of trusted partners and unlock new opportunities for growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Benefit 1 */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Expanded Reach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get exposure to our client base and tap into new markets through our established network of businesses and developers.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <TrendingUp className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mutual Growth
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Collaborate on projects that drive value for both parties, creating win-win opportunities for sustainable business growth.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <GitBranch className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Strategic Collaboration
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Work closely with our team to integrate your services seamlessly into our solutions, ensuring the best experience for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container-responsive">
          <div className="relative max-w-7xl mx-auto z-20">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              {/* Top-Left Smoke Effect */}
              <div className="absolute -top-8 sm:-top-16 -left-8 sm:-left-16 w-80 h-80 sm:w-96 sm:h-96 opacity-80">
                <img 
                  src="/splash.png" 
                  alt="Splash effect" 
                  className="w-full h-full object-cover rotate-12 blur-[2px]"
                />
              </div>
              
              {/* Top-Right Smoke Effect */}
              <div className="absolute -top-8 sm:-top-16 -right-8 sm:-right-16 w-80 h-80 sm:w-96 sm:h-96 opacity-80">
                <img 
                  src="/splash.png" 
                  alt="Splash effect" 
                  className="w-full h-full object-cover -rotate-12 blur-[2px]"
                />
              </div>
              
              {/* Top-Left Gradient Blob */}
              <div className="absolute -top-16 sm:-top-32 -left-16 sm:-left-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-200 rounded-full blur-3xl opacity-60"></div>
              
              {/* Top-Right Gradient Blob */}
              <div className="absolute -top-16 sm:-top-32 -right-16 sm:-right-32 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-purple-300 via-purple-400 to-purple-200 rounded-full blur-3xl opacity-60"></div>
              
              {/* Center subtle glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 sm:h-64 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 blur-3xl opacity-30"></div>
              
              {/* Content */}
              <div className="relative z-10 px-4 sm:px-8 md:px-16 pt-8 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20">
                <div className="text-center space-y-2 sm:space-y-3 md:space-y-4">
                  <Handshake className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 mx-auto mb-4 sm:mb-6" />
                  <h2 className="text-responsive-3xl sm:text-responsive-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Interested in Becoming a Partner?
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                    We're always looking to collaborate with innovative companies that share
                    <br />
                    our commitment to quality. If your service would be a great fit, let's talk.
                  </p>
                  <div className="flex justify-center pt-4">
                    <ContactButton label="Get in Touch" fullWidth={false} size="large" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Partners;

