import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SEO
        title="404 - Page Not Found | BitBash"
        description="The page you're looking for doesn't exist."
        canonical="/404"
      />
      <Navigation />
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center px-4">
          <h1 className="mb-4 text-4xl sm:text-5xl font-bold text-gray-900">404</h1>
          <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
          <p className="mb-8 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
      <Footer isHomepage={false} />
    </div>
  );
};

export default NotFound;
