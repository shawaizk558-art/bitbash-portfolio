import { Target, RefreshCw } from "lucide-react";

export const ServiceModels = () => {
  return (
    <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
      <div className="container-responsive">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 sm:mb-16 tracking-tight px-4">
          Choose Your Engagement Model
        </h2>
        
        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
          {/* Project-Based Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-2">
              Project-Based
            </h3>
            <p className="text-base sm:text-lg text-purple-600 font-semibold mb-6">
              Milestone Driven
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Clear milestones & timelines
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Fixed scope & deliverables
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Payment per milestone
                </span>
              </li>
            </ul>
          </div>

          {/* Monthly Retainer Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg p-6 sm:p-8 md:p-10 hover:shadow-xl transition-shadow duration-300">
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-2">
              Monthly Retainer
            </h3>
            <p className="text-base sm:text-lg text-purple-600 font-semibold mb-6">
              Continuous Partnership
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Ongoing development
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Priority support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                <span className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Flexible iterations
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

