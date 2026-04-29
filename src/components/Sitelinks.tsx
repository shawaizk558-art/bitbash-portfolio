import { Link } from "react-router-dom";
import { scrollToTopImmediate } from "@/lib/scrollToTop";

export const Sitelinks = () => {
  const links = [
    { label: "View Our Portfolio", path: "/portfolio" },
    { label: "See Pricing Plans", path: "/pricing" },
    { label: "Services", path: "/services" },
    { label: "Hiring", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Explore BitBash
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={scrollToTopImmediate}
                  className="group flex items-center justify-center px-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all duration-300 text-center min-h-[44px]"
                >
                  <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

