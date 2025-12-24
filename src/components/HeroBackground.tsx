import { InteractiveGridPattern } from "@/components/InteractiveGridPattern";
import { useEffect, useRef } from "react";

export const HeroBackground = () => {
    const beam1Ref = useRef<HTMLDivElement>(null);
    const beam2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const beam1 = beam1Ref.current;
        const beam2 = beam2Ref.current;
        if (!beam1 || !beam2) return;

        const handleBeam1Animation = (e: AnimationEvent) => {
        };

        const handleBeam2Animation = (e: AnimationEvent) => {
        };

        beam1.addEventListener('animationstart', handleBeam1Animation);
        beam1.addEventListener('animationiteration', handleBeam1Animation);
        beam1.addEventListener('animationend', handleBeam1Animation);
        beam2.addEventListener('animationstart', handleBeam2Animation);
        beam2.addEventListener('animationiteration', handleBeam2Animation);
        beam2.addEventListener('animationend', handleBeam2Animation);


        return () => {
            beam1.removeEventListener('animationstart', handleBeam1Animation);
            beam1.removeEventListener('animationiteration', handleBeam1Animation);
            beam1.removeEventListener('animationend', handleBeam1Animation);
            beam2.removeEventListener('animationstart', handleBeam2Animation);
            beam2.removeEventListener('animationiteration', handleBeam2Animation);
            beam2.removeEventListener('animationend', handleBeam2Animation);
        };
    }, []);

    return (
        <>
            {/* Mesh Gradient Background - Clean Center */}
            {/* Mesh Gradient Background - Clean Center */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-white">
                {/* Top Left Beam - Points Upwards (Hugging Left Side) */}
                <div
                    ref={beam1Ref}
                    className="absolute inset-0 animate-beam opacity-80"
                    style={{
                        background: 'conic-gradient(from 350deg at 0% 100%, transparent 0deg, rgba(168, 85, 247, 0.5) 15deg, rgba(99, 102, 241, 0.5) 35deg, transparent 50deg)',
                        filter: 'blur(60px)',
                        transformOrigin: '0% 100%'
                    }}
                />

                {/* Top Right Beam - Points Downwards (Hugging Right Side) */}
                <div
                    ref={beam2Ref}
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
            {/* Ensure grid is above white background but below content */}
            {/* Note: Grid pattern only animates on desktop (>=1024px), but canvas still renders on mobile */}
            {/* Optimized: Uses IntersectionObserver to pause when not visible */}
            <InteractiveGridPattern className="z-[1] opacity-80" style={{ contain: 'layout style paint', willChange: 'auto' }} />
        </>
    );
};
