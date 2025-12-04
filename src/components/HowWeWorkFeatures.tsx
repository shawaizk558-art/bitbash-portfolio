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
        title: "Solution Architect",
        description: "Building a solid foundation for scalability.",
        points: [
            "Comprehensive system design and architecture planning",
            "Cloud-native infrastructure selection (AWS/GCP/Azure)",
            "Security and performance optimization from day one"
        ],
        icon: Cloud,
        image: "/images/how-we-work/solution_architect.png",
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
        image: "/images/how-we-work/bashlog_reporting.png",
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
        image: "/images/how-we-work/pdlc_process.png",
        label: "PROCESS"
    }
];

export const HowWeWorkFeatures = () => {
    return (
        <section className="pt-12 sm:pt-16 md:pt-24 pb-24 sm:pb-32 md:pb-40 bg-white overflow-x-hidden">
            <div className="container-responsive">
                <div className="text-center max-w-3xl mx-auto mb-20 px-4">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-purple-50 border border-purple-100">
                        <span className="text-sm font-medium text-purple-700 tracking-wide uppercase">Our Process</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Methodology for Success
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        A disciplined approach to software engineering that guarantees transparency, quality, and speed.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Client Communication Section - Special Layout */}
                    <div className="space-y-12">
                        <div className="px-4">
                            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-100 shadow-sm px-6 sm:px-10 py-10 sm:py-12">
                                <div className="text-center mb-10">
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Client Communication
                                    </h3>
                                    <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                                        Seamless collaboration with dedicated channels and concise, transparent updates.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                                    {communicationSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group w-full max-w-[320px]"
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
                                        className={`p-8 sm:p-12 flex flex-col justify-center h-full ${isProcess ? 'items-center text-center' : ''}
                        ${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}
                      `}
                                    >
                                        <div className="inline-flex items-center gap-2 mb-6">
                                            <div className="p-2 rounded-lg bg-purple-50">
                                                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                            </div>
                                            <span className="font-bold text-purple-600 uppercase text-xs tracking-wide">
                                                {feature.label}
                                            </span>
                                        </div>

                                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight ${isProcess ? 'max-w-2xl mx-auto' : ''}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-lg text-gray-600 mb-8 ${isProcess ? 'max-w-2xl mx-auto' : ''}`}>
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
                                                                className="bg-white p-8 rounded-3xl shadow-lg border border-purple-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group w-full max-w-[320px]"
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
                    <div className="py-12 sm:py-16">
                        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Key Benefits of Partnering with BitBash
                            </h2>
                            <p className="text-lg text-gray-600">
                                Tangible results you can expect when working with our engineering team.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                            {/* Benefit 1 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-6">
                                    <TrendingUp className="w-10 h-10 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Accelerated Time-to-Market with Proven Workflows
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    By leveraging our disciplined PDLC and deep work focus, we eliminate bottlenecks and deliver features faster. Our streamlined process ensures that your product reaches your users without unnecessary delays.
                                </p>
                            </div>

                            {/* Benefit 2 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-6">
                                    <Target className="w-10 h-10 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Scalable Architecture & Future-Proof Code
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We don't just write code; we architect solutions. Our focus on solid system design and clean code practices means your application will scale effortlessly as your user base grows, saving you from costly rewrites.
                                </p>
                            </div>

                            {/* Benefit 3 */}
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-6">
                                    <Users className="w-10 h-10 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Complete Transparency & Collaborative Partnership
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    With our custom Bashlog reporting and direct Slack access, you are never in the dark. We treat your project as our own, providing honest updates and data-driven insights to guide your decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
