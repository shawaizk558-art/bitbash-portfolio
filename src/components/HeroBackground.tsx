import { InteractiveGridPattern } from "@/components/InteractiveGridPattern";

export const HeroBackground = () => {
    return (
        <>
            {/* Mesh Gradient Background - Clean Center */}
            {/* Mesh Gradient Background - Clean Center */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
                {/* Top Left Beam - Points Upwards (Hugging Left Side) */}
                <div
                    className="absolute inset-0 animate-beam opacity-80"
                    style={{
                        background: 'conic-gradient(from 350deg at 0% 100%, transparent 0deg, rgba(168, 85, 247, 0.5) 15deg, rgba(99, 102, 241, 0.5) 35deg, transparent 50deg)',
                        filter: 'blur(60px)',
                        transformOrigin: '0% 100%'
                    }}
                />

                {/* Top Right Beam - Points Downwards (Hugging Right Side) */}
                <div
                    className="absolute inset-0 animate-beam opacity-80"
                    style={{
                        background: 'conic-gradient(from 170deg at 100% 0%, transparent 0deg, rgba(168, 85, 247, 0.5) 15deg, rgba(99, 102, 241, 0.5) 35deg, transparent 50deg)',
                        filter: 'blur(60px)',
                        transformOrigin: '100% 0%',
                        animationDelay: '1s'
                    }}
                />

                {/* Center white wash to ensure text readability - Reduced opacity */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>

            {/* Interactive Dotted Background */}
            <InteractiveGridPattern className="z-0 opacity-60" />
        </>
    );
};
