import { InteractiveGridPattern } from "@/components/InteractiveGridPattern";

export const HeroBackground = () => {
    return (
        <>
            {/* Mesh Gradient Background - Clean Center */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
                <div className="absolute -top-[25%] -left-[25%] w-[50%] h-[50%] min-w-[500px] min-h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-mesh" />
                <div className="absolute -bottom-[25%] -right-[25%] w-[50%] h-[50%] min-w-[500px] min-h-[500px] bg-indigo-500/20 rounded-full blur-[120px] animate-mesh" style={{ animationDelay: '2s' }} />
                {/* Center white wash to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>

            {/* Interactive Dotted Background */}
            <InteractiveGridPattern className="z-0 opacity-60" />
        </>
    );
};
