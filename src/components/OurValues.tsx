import React, { Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load ThreeDScene only on desktop - skip entirely on mobile
const ThreeDScene = lazy(() => 
  import("./ThreeDValues").then(module => ({ default: module.ThreeDScene }))
);

const values = [
    {
        title: "Open",
        description:
            "Just like our platform, we're open towards each other, our community, new ideas, and feedback.",
        type: "Open",
    },
    {
        title: "Driven",
        description:
            "We focus on goals with the highest impact and get them done. Each of us can initiate and lead change.",
        type: "Driven",
    },
    {
        title: "Responsible",
        description:
            "We respect our decisions, deliver on commitments, own our mistakes, and learn from them.",
        type: "Responsible",
    },
    {
        title: "Flexible",
        description:
            "We will always find a way while staying true to our core principles.",
        type: "Flexible",
    },
    {
        title: "Team",
        description:
            "We encourage mutual trust and support while remaining humble.",
        type: "Team",
    },
];

export const OurValues = () => {
    const isMobile = useIsMobile();

    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our values</h2>
                    <p className="text-lg text-gray-600">
                        Although we no longer fit into one room, we act as if we were in one.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center max-w-7xl mx-auto">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="group relative p-10 bg-white border border-gray-100 -ml-[1px] -mt-[1px] w-full md:w-1/2 lg:w-1/3 hover:z-10 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-full h-48 mb-8 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100">
                                    {isMobile ? (
                                        // Mobile: Show simple icon placeholder instead of 3D scene
                                        <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-purple-600">{value.title.charAt(0)}</span>
                                        </div>
                                    ) : (
                                        // Desktop: Load 3D scene lazily
                                        <Suspense fallback={<div className="w-8 h-8 rounded-full bg-purple-200 animate-pulse" />}>
                                            <ThreeDScene type={value.type} />
                                        </Suspense>
                                    )}
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {value.title}
                                </h3>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
