import { Link } from "react-router-dom";

import { SEO } from "@/components/SEO";

const HowWeWork = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 text-center sm:px-12">
      <SEO
        title="How We Work - BitBash"
        description="Learn about our transparent and efficient software development process. From kickoff to launch, we are with you every step of the way."
        canonical="/how-we-work"
      />
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full bg-purple-50 px-4 py-1 text-sm font-semibold text-purple-600">
          Coming Soon
        </span>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Our How We Work page is on its way
        </h1>
        <p className="text-base text-gray-600 sm:text-lg">
          We’re polishing up this section to share a transparent look at our process—from kickoff to launch.
          Check back soon for the full breakdown.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-purple-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-500"
          >
            Talk with our team
          </Link>
          <Link
            to="/projects"
            className="inline-flex h-11 items-center justify-center rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
          >
            Explore our work
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HowWeWork;


