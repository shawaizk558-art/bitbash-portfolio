import {
    MessageCircle,
    Cloud,
    FileText,
    Zap,
    Github,
    Rocket,
    Users,
    Database,
    BarChart3,
    Target,
    GitBranch,
    TrendingUp,
    Slack,
    Video,
    Mail,
    Calendar,
    ArrowRight
} from "@/lib/icons";

import { HomepagePricing } from "@/components/HomepagePricing";
import { Testimonials } from "@/components/Testimonials";

const communicationSteps = [
    {
        step: "STEP 1",
        title: "Slack Connect",
        description: "Direct access to your project team via dedicated channels.",
        icon: Slack,
        color: "text-purple-600",
        bgColor: "bg-purple-50"
    },
    {
        step: "STEP 2",
        title: "Weekly Syncs",
        description: "Video calls to align on progress, demos, and priorities.",
        icon: Video,
        color: "text-blue-600",
        bgColor: "bg-blue-50"
    },
    {
        step: "STEP 3",
        title: "Regular Updates",
        description: "Transparent reporting on tasks, blockers, and timelines.",
        icon: Mail,
        color: "text-green-600",
        bgColor: "bg-green-50"
    },
    {
        step: "STEP 4",
        title: "Strategic Planning",
        description: "Roadmap reviews to ensure we hit long-term goals.",
        icon: Calendar,
        color: "text-orange-600",
        bgColor: "bg-orange-50"
    }
];

const pdlcSteps = [
    {
        title: "Problem & Scope",
        description: "Align on goals, scope, and constraints before any code is written.",
        icon: MessageCircle
    },
    {
        title: "Planning & Roadmapping",
        description: "Turn the vision into a sequenced roadmap with clear milestones.",
        icon: Calendar
    },
    {
        title: "Build, Review & QA",
        description: "Ship in focused sprints with code review, tests, and QA baked in.",
        icon: Zap
    },
    {
        title: "Launch & Iteration",
        description: "Release, measure real usage, and feed learnings into the next cycle.",
        icon: Rocket
    }
];

const features = [
    {
        title: "Solution Architect: Practical, Tailored Solutions",
        description: "We design solutions that fit your needs, backed by research and clear plans.",
        points: [
            "Continuous collaboration ensures reliable, effective outcomes.",
            "Practical solutions that drive your project's success."
        ],
        icon: Cloud,
        image: "/images/how-we-work/solution_architect.webp",
        label: "ARCHITECTURE"
    },
    {
        title: "Bashlog Reporting Practices",
        description: "Detailed insights into every development cycle.",
        points: [
            "Granular progress tracking with our custom Bashlog system",
            "Real-time visibility into tasks and blockers",
            "Data-driven decision making for project timelines"
        ],
        icon: FileText,
        image: "/images/how-we-work/bashlog_reporting.webp",
        label: "REPORTING"
    },
    {
        title: "Deep Work Focus",
        description: "Uninterrupted execution for maximum quality.",
        points: [
            "Dedicated deep work blocks for complex problem solving",
            "Distraction-free environment for high-velocity coding",
            "Focus on delivering robust, bug-free features"
        ],
        icon: Zap,
        image: null, // Custom layout
        label: "EXECUTION"
    },
    {
        title: "Git & GitHub Ethics",
        description: "Clean code history and collaborative best practices.",
        points: [
            "Structured branching strategies (Gitflow/Trunk-based)",
            "Rigorous code reviews and pull request protocols",
            "Clean commit history for long-term maintainability"
        ],
        icon: Github,
        image: null, // Custom layout
        label: "VERSION CONTROL"
    },
    {
        title: "PDLC Process Consistently",
        description: "Agile methodology from concept to launch.",
        points: [
            "Iterative development cycles (Sprints)",
            "Continuous Integration/Continuous Deployment (CI/CD)",
            "Rigorous QA testing at every stage"
        ],
        icon: Rocket,
        image: "/images/how-we-work/pdlc_process.webp",
        label: "PROCESS"
    }
];

export const HowWeWorkFeatures = () => {
    return (
        <section className="pt-12 sm:pt-16 md:pt-20 pb-24 sm:pb-32 md:pb-40 bg-white overflow-x-hidden">
            <div className="container-responsive">
                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-16 px-4">
                    <div className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 mb-3 sm:mb-4 md:mb-4 rounded-full bg-purple-50 border border-purple-100">
                        <span className="text-xs sm:text-sm font-medium text-purple-700 tracking-wide uppercase">Our Process</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-4 tracking-tight">
                        Methodology for Success
                    </h2>
                    <p className="text-base sm:text-lg md:text-lg text-gray-500 leading-relaxed">
                        A disciplined approach to software engineering that guarantees transparency, quality, and speed.
                    </p>
                </div>

                <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
                    {/* Client Communication Section - Special Layout */}
                    <div className="space-y-12">
                        <div className="px-4">
                            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-100 shadow-sm px-6 sm:px-10 py-10 sm:py-12">
                                <div className="text-center mb-8 sm:mb-10">
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                                        Client Communication
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
                                        Seamless collaboration with dedicated channels and concise, transparent updates.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                    {communicationSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group w-full max-w-[320px] mx-auto"
                                        >
                                            <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <step.icon className={`w-10 h-10 ${step.color}`} />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                {step.title}
                                            </h4>
                                            <p className="text-gray-500 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Reports Section - Different Style */}
                    <div className="px-4">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">
                                {/* Text Content */}
                                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center h-full order-2 lg:order-1">
                                    <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                                        <div className="p-2 rounded-lg bg-purple-50">
                                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
                                        </div>
                                        <span className="font-bold text-purple-600 uppercase text-xs tracking-wide">
                                            REPORTING
                                        </span>
                                    </div>

                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                                        Daily Reports
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                                        Stay informed with comprehensive daily updates and actionable insights.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Transparent daily updates on progress and tasks
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Quick identification of blockers for immediate resolution.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Continuous client visibility, reducing check-in needs.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Data-driven insights for faster, better decisions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Content - Newspaper Style Documents */}
                                <div className="relative min-h-[350px] overflow-visible order-1 lg:order-2 flex items-center justify-center bg-white px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
                                    {/* Purple Glow Behind Documents */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-full max-w-5xl h-3/4 bg-gradient-to-br from-purple-400/60 via-purple-300/40 to-purple-100/20 rounded-full blur-3xl"></div>
                                    </div>
                                    <div className="flex items-center justify-center -space-x-6 sm:-space-x-8 lg:-space-x-12 w-full max-w-5xl relative z-10">
                                        {/* Document 1 - Left */}
                                        <div className="transform -rotate-6 translate-y-0 z-10 hover:z-20 transition-all duration-300 hover:scale-105">
                                            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-5 w-56 sm:w-64">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-purple-600">h1</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">Daily Progress Updates</span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs text-gray-600">Real-Time Tracking</span>
                                                </div>
                                                <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                                                    <p>Transparent daily updates on progress and tasks keep you informed every step of the way. No surprises, only clear visibility.</p>
                                                    <p className="mt-2">Each report includes completed tasks, current progress, and upcoming milestones for complete transparency...</p>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-700">100% Visibility</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Document 2 - Center */}
                                        <div className="transform z-30 hover:z-40 transition-all duration-300 hover:scale-105">
                                            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-5 w-56 sm:w-64">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-purple-600">h1</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">Blockers & Solutions</span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs text-gray-600">Quick Resolution</span>
                                                </div>
                                                <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                                                    <p>Quick identification of blockers for immediate resolution ensures nothing slows down your project. We flag issues early and provide solutions proactively.</p>
                                                    <p className="mt-2">Every blocker is documented with impact assessment, proposed solutions, and resolution timeline to keep your project on track...</p>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-700">Same-Day Response</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Document 3 - Right */}
                                        <div className="transform rotate-6 translate-y-4 z-10 hover:z-20 transition-all duration-300 hover:scale-105">
                                            <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-5 w-56 sm:w-64">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-purple-600">h1</span>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">Data-Driven Insights</span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs text-gray-600">Actionable Metrics</span>
                                                </div>
                                                <div className="space-y-1 text-xs text-gray-500 leading-relaxed">
                                                    <p>Data-driven insights for faster, better decisions. Every report includes key metrics, trends, and recommendations to help you make informed choices.</p>
                                                    <p className="mt-2">We track performance indicators, completion rates, and efficiency metrics to provide you with actionable intelligence for strategic planning...</p>
                                                </div>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded flex items-center justify-center">
                                                        <span className="text-xs font-bold text-orange-600">h2</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-700">Real-Time Analytics</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Empowerment & Autonomy Card - Alternate Design */}
                    <div className="px-4">
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
                            {/* Slight Purple Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30 pointer-events-none"></div>
                            
                            <div className="flex flex-col lg:grid lg:grid-cols-2 h-full relative z-10">
                                {/* Left Side - Visual Content */}
                                <div className="relative min-h-[300px] lg:min-h-full overflow-hidden order-1 lg:order-1 flex items-center justify-center bg-white p-6 sm:p-8">
                                    {/* Purple Glow Behind Cards */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-full max-w-md h-3/4 bg-gradient-to-br from-purple-400/60 via-purple-300/40 to-purple-100/20 rounded-full blur-3xl"></div>
                                    </div>
                                    
                                    <div className="w-full max-w-md space-y-4 sm:space-y-5 relative z-10">
                                        {/* Stats/Metrics Cards */}
                                        <div className="flex flex-col gap-5 sm:gap-6">
                                            <div className="rounded-2xl bg-white border border-purple-100 px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-3 shadow-sm shadow-purple-100/80 w-full">
                                                <div className="inline-flex items-center gap-2">
                                                    <Target className="w-5 h-5 text-purple-500" />
                                                    <span className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide">
                                                        Autonomy
                                                    </span>
                                                </div>
                                                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                                    100%
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Developers make independent decisions, keeping projects on track.
                                                </p>
                                            </div>

                                            <div className="rounded-2xl bg-white border border-purple-100 px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-3 shadow-sm shadow-purple-100/80 w-full">
                                                <div className="inline-flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-purple-500" />
                                                    <span className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide">
                                                        Ownership
                                                    </span>
                                                </div>
                                                <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                                                    24/7
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Full ownership ensures accountability and faster delivery cycles.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Text Content */}
                                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center h-full order-2 lg:order-2">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                                        Empowerment & Autonomy: Accelerating Results
                                    </h3>
                                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                                        Our team takes full ownership, ensuring quick, high-quality delivery.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Developers make decisions independently, keeping your project on track.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Proactive communication solves problems before they arise.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Full ownership ensures accountability and faster delivery cycles.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                            <p className="text-gray-700 text-base sm:text-lg">
                                                Autonomous teams reduce dependencies and accelerate development speed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Remaining Features - Standard Layout */}
                    <div className="space-y-16 sm:space-y-24">
                        {features.map((feature, index) => {
                            const isProcess = feature.label === "PROCESS";
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                                >
                                    <div className={`flex flex-col ${isProcess ? '' : 'lg:grid lg:grid-cols-2'} h-full`}>
                                    {/* Text Content */}
                                    <div
                                        className={`p-6 sm:p-8 md:p-12 flex flex-col justify-center h-full ${isProcess ? 'items-center text-center' : ''}
                        ${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}
                      `}
                                    >
                                        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                                            <div className="p-2 rounded-lg bg-purple-50">
                                                <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600" />
                                            </div>
                                            <span className="font-bold text-purple-600 uppercase text-xs tracking-wide">
                                                {feature.label}
                                            </span>
                                        </div>

                                        <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight ${isProcess ? 'max-w-2xl mx-auto px-4' : ''}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 ${isProcess ? 'max-w-2xl mx-auto px-4' : ''}`}>
                                            {feature.description}
                                        </p>

                                        {/* For PROCESS, we keep this top section as heading/description only */}
                                        {!isProcess && (
                                            <div className="space-y-4">
                                                {feature.points.map((point, pointIndex) => (
                                                    <div key={pointIndex} className="flex items-start gap-3">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                                                        <p className="text-gray-700 text-base sm:text-lg">
                                                            {point}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                        {/* Visual Content */}
                                        <div
                                            className={`relative min-h-[300px] lg:min-h-full overflow-hidden ${index % 2 === 0 && !isProcess ? 'pl-2 sm:pl-3' : ''} flex items-center justify-center
                        ${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}
                      `}
                                        >
                                        {feature.image && feature.label !== "PROCESS" ? (
                                            <img
                                                src={feature.image}
                                                alt={feature.title}
                                                className={`w-full h-auto object-contain ${index === 1 ? 'pt-8 sm:pt-12 pr-8 sm:pr-12' : ''}`}
                                            />
                                        ) : feature.label === "EXECUTION" ? (
                                            // Custom visual for Deep Work Focus
                                            <div className="w-full h-full bg-gradient-to-bl from-purple-50 to-white flex items-center justify-center">
                                                <div className="text-center space-y-6">
                                                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-2xl">
                                                        <Zap className="w-16 h-16 text-purple-600" />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h4 className="text-3xl font-bold text-gray-900">
                                                            100% Focus
                                                        </h4>
                                                        <p className="text-lg text-gray-600 max-w-md mx-auto">
                                                            Uninterrupted deep work sessions designed for maximum productivity and code quality
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-4">
                                                        <div className="text-center">
                                                            <div className="text-4xl font-bold text-purple-600">8hrs</div>
                                                            <div className="text-sm text-gray-500 mt-1">Deep Work Blocks</div>
                                                        </div>
                                                        <div className="w-px h-16 bg-gray-300"></div>
                                                        <div className="text-center">
                                                            <div className="text-4xl font-bold text-gray-900">0</div>
                                                            <div className="text-sm text-gray-500 mt-1">Distractions</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : feature.label === "VERSION CONTROL" ? (
                                            // Custom visual for Git & GitHub Ethics (white & purple theme)
                                            <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center px-6 sm:px-10 py-10">
                                                <div className="w-full max-w-xl space-y-8">
                                                    {/* Git & GitHub logos */}
                                                    <div className="flex items-center justify-center gap-6 mb-4">
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-purple-100 shadow-lg shadow-purple-200/60 flex items-center justify-center">
                                                            <img
                                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                                                                alt="Git logo"
                                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                                            />
                                                        </div>
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-purple-100 shadow-lg shadow-purple-200/60 flex items-center justify-center">
                                                            <img
                                                                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                                                alt="GitHub logo"
                                                                className="w-10 h-10 sm:w-12 sm:h-12"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Title */}
                                                    <div className="text-center space-y-2">
                                                        <p className="text-xs font-semibold tracking-[0.2em] text-purple-600 uppercase">
                                                            Git & GitHub Ethics
                                                        </p>
                                                        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                                            Clean history, predictable releases.
                                                        </h4>
                                                        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                                                            We enforce branch discipline, reviewed pull requests, and traceable changes so your codebase
                                                            stays healthy as it scales.
                                                        </p>
                                                    </div>

                                                    {/* Stats row */}
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                                                        <div className="rounded-2xl bg-white border border-purple-100 px-4 py-4 flex flex-col gap-2 shadow-sm shadow-purple-100/80">
                                                            <div className="inline-flex items-center gap-2">
                                                                <GitBranch className="w-4 h-4 text-emerald-500" />
                                                                <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
                                                                    Branch Strategy
                                                                </span>
                                                            </div>
                                                            <p className="text-xl font-semibold text-gray-900 leading-tight">
                                                                100% Structured
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Feature, release, and hotfix branches follow a documented convention.
                                                            </p>
                                                        </div>

                                                        <div className="rounded-2xl bg-white border border-purple-100 px-4 py-4 flex flex-col gap-2 shadow-sm shadow-purple-100/80">
                                                            <div className="inline-flex items-center gap-2">
                                                                <BarChart3 className="w-4 h-4 text-blue-500" />
                                                                <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
                                                                    PR Quality
                                                                </span>
                                                            </div>
                                                            <p className="text-xl font-semibold text-gray-900 leading-tight">
                                                                2+ Reviews
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                Every production change passes peer review and automated checks.
                                                            </p>
                                                        </div>

                                                        <div className="rounded-2xl bg-white border border-purple-100 px-4 py-4 flex flex-col gap-2 shadow-sm shadow-purple-100/80">
                                                            <div className="inline-flex items-center gap-2">
                                                                <GitBranch className="w-4 h-4 text-purple-500 rotate-[-40deg]" />
                                                                <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">
                                                                    Main Stability
                                                                </span>
                                                            </div>
                                                            <p className="text-xl font-semibold text-gray-900 leading-tight">
                                                                Zero Dirty Commits
                                                            </p>
                                                            <p className="text-xs text-gray-600">
                                                                No direct pushes to main—only fast-forward merges from reviewed branches.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : feature.label === "PROCESS" ? (
                                            // Custom visual for PDLC Process - pills like Client Communication cards
                                            <div className="w-full h-full bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 sm:px-8 py-10">
                                                <div className="w-full max-w-6xl">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                                        {pdlcSteps.map((step, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="group relative bg-white p-8 rounded-3xl shadow-lg border border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center w-full max-w-[320px] overflow-hidden"
                                                            >
                                                                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                                    <step.icon className="w-10 h-10 text-purple-600" />
                                                                </div>
                                                                <h5 className="text-lg font-bold text-gray-900 mb-3">
                                                                    {step.title}
                                                                </h5>
                                                                <p className="text-gray-600 leading-relaxed text-base">
                                                                    {step.description}
                                                                </p>
                                                                
                                                                {/* Decorative Line - Curved to match card border */}
                                                                <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                  <div className="w-full h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-b-3xl"></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Key Benefits Section */}
                    <div className="pb-12 sm:pb-16 mb-16 sm:mb-20 md:mb-24">
                        <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-100 shadow-sm px-6 sm:px-10 py-10 sm:py-12">
                            <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    Key Benefits of Partnering with BitBash
                                </h2>
                                <p className="text-base sm:text-lg text-gray-600">
                                    Tangible results you can expect when working with our engineering team.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 px-4">
                            {/* Benefit 1 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-4 sm:mb-6">
                                    <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                                    Accelerated Time-to-Market with Proven Workflows
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    By leveraging our disciplined PDLC and deep work focus, we eliminate bottlenecks and deliver features faster. Our streamlined process ensures that your product reaches your users without unnecessary delays.
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-4 sm:mb-6">
                                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                                    Scalable Architecture & Future-Proof Code
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    We don't just write code; we architect solutions. Our focus on solid system design and clean code practices means your application will scale effortlessly as your user base grows, saving you from costly rewrites.
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-4 sm:mb-6">
                                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                                    Complete Transparency & Collaborative Partnership
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    With our custom Bashlog reporting and direct Slack access, you are never in the dark. We treat your project as our own, providing honest updates and data-driven insights to guide your decisions.
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
       
            
            {/* Pricing Section */}
            <HomepagePricing />
            
            {/* Testimonials */}
            <Testimonials />
        </section>
    );
};

