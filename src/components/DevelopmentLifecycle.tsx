import { MessageCircle, FileText, DollarSign, Calendar, Code, CheckCircle2 } from "lucide-react";

const lifecycleSteps = [
  {
    number: 1,
    title: "Initial Chat",
    subtitle: "Vision & feasibility",
    icon: MessageCircle,
    iconColor: "text-purple-600"
  },
  {
    number: 2,
    title: "Requirements",
    subtitle: "Goals & documentation",
    icon: FileText,
    iconColor: "text-purple-600"
  },
  {
    number: 3,
    title: "Pricing",
    subtitle: "Transparent breakdown",
    icon: DollarSign,
    iconColor: "text-purple-600"
  },
  {
    number: 4,
    title: "Planning",
    subtitle: "Milestones & timeline",
    icon: Calendar,
    iconColor: "text-purple-600"
  },
  {
    number: 5,
    title: "Execution",
    subtitle: "Daily updates & demos",
    icon: Code,
    iconColor: "text-purple-600"
  },
  {
    number: 6,
    title: "Delivery",
    subtitle: "QA & deployment",
    icon: CheckCircle2,
    iconColor: "text-green-600"
  }
];

export const DevelopmentLifecycle = () => {
  return (
    <section className="bg-white">
      <div className="container-responsive">
        <div className="px-4">
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-100 shadow-sm px-6 sm:px-10 py-10 sm:py-12">
            {/* Heading */}
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900">
                6 Stage Development Lifecycle
              </h3>
            </div>

            {/* 6 Steps Grid - Two Rows */}
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {lifecycleSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className="group relative bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* Center Content */}
                    <div className="flex flex-col items-center text-center">
                      {/* Icon - Outline style */}
                      <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className={`w-10 h-10 sm:w-12 sm:h-12 ${step.number === 6 ? 'text-green-600' : 'text-purple-600'} stroke-2`} />
                      </div>
                      
                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {step.title}
                      </h4>
                      
                      {/* Subtitle */}
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {step.subtitle}
                      </p>
                    </div>
                    
                    {/* Decorative Line - Curved to match card border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-full h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-b-3xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

