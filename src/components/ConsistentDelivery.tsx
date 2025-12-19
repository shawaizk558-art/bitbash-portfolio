import { CheckCircle2, Calendar, Eye, Target } from "lucide-react";

export const ConsistentDelivery = () => {
  const features = [
    {
      icon: Calendar,
      title: "Weekly Deliverables",
      description: "Tangible progress delivered on time, every week."
    },
    {
      icon: Eye,
      title: "Transparent Tracking",
      description: "Real-time updates through daily check-ins and Bashlogs."
    },
    {
      icon: Target,
      title: "Reliable Results",
      description: "No missed deadlines, only consistent, quality progress."
    }
  ];

  return (
    <section className="bg-white pt-12 sm:pt-16 md:pt-24">
      <div className="container-responsive">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl shadow-xl border border-purple-100 px-8 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100 rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-5 mb-8 sm:mb-10 md:mb-12">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-200/50 flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        Consistent Delivery, Every Week
                      </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                      At Bitbash, we deliver production-ready code every Friday, ensuring your project is always on track.
                    </p>
                  </div>
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Decorative Line - Curved to match card border */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-b-2xl"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

