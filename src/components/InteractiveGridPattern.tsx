import { useEffect, useRef } from 'react';

interface InteractiveGridPatternProps {
    className?: string;
}

export const InteractiveGridPattern = ({ className }: InteractiveGridPatternProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', {
            alpha: true,
            desynchronized: false,
            willReadFrequently: false
        });
        if (!ctx) return;

        let animationFrameId: number | null = null;
        let width = 0;
        let height = 0;
        let lastFrameTime = 0;
        let canvasRect = canvas.getBoundingClientRect();
        let resizeObserver: ResizeObserver | null = null;

        // Grid configuration
        const gap = 42; // Distance between lines (larger gap reduces density)
        const lineWidth = 1;
        const flowSpeed = 0.5;
        const FRAME_INTERVAL = 1000 / 20; // Reduced to 20fps for background pattern
        let offset = 0;

        const isDesktop = () => window.innerWidth >= 1024;

        const updateCanvasRect = () => {
            canvasRect = canvas.getBoundingClientRect();
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            updateCanvasRect();
        };

        const clearCanvas = () => {
            ctx.clearRect(0, 0, width, height);
        };
        
        const draw = () => {
            if (!isDesktop() || document.hidden || !isIntersecting) {
                animationFrameId = null;
                clearCanvas();
                return;
            }

            const now = performance.now();
            if (now - lastFrameTime < FRAME_INTERVAL) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }
            
            lastFrameTime = now;

            clearCanvas();

            offset = (offset + flowSpeed) % gap;

            const cols = Math.ceil(width / gap) + 2;
            const rows = Math.ceil(height / gap) + 2;

            // Cache shimmer calculation (only once per frame - reuse 'now' from above)
            const shimmer = Math.sin(now / 900);
            
            // Pre-calculate constants to avoid repeated calculations
            const baseAlpha = 0.08;
            const alphaRange = 0.04;
            const colorR = 139;
            const colorG = 92;
            const colorB = 246;

            // Optimize canvas operations
            ctx.save();
            ctx.lineWidth = lineWidth;

            // Draw vertical lines - optimized with cached calculations
            for (let i = -1; i < cols; i++) {
                const baseX = i * gap + offset;
                const alpha = baseAlpha + alphaRange * Math.sin(i * 0.5 + shimmer);
                ctx.strokeStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(baseX, -gap);
                ctx.lineTo(baseX, height + gap);
                ctx.stroke();
            }

            // Draw horizontal lines - optimized with cached calculations
            for (let j = -1; j < rows; j++) {
                const baseY = j * gap + offset;
                const alpha = baseAlpha + alphaRange * Math.cos(j * 0.5 + shimmer);
                ctx.strokeStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(-gap, baseY);
                ctx.lineTo(width + gap, baseY);
                ctx.stroke();
            }
            
            ctx.restore();

            animationFrameId = requestAnimationFrame(draw);
        };

        const startAnimation = () => {
            if (!animationFrameId && isDesktop() && !document.hidden) {
                animationFrameId = requestAnimationFrame(draw);
            }
        };

        const stopAnimation = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            clearCanvas();
        };

        const handleVisibility = () => {
            if (isDesktop() && !document.hidden) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        const handleResize = () => {
            resize();
            handleVisibility();
        };

        resize();
        handleVisibility();
        window.addEventListener('resize', handleResize);
        
        // Use IntersectionObserver to pause animation when canvas is not visible
        let intersectionObserver: IntersectionObserver | null = null;
        let isIntersecting = true;
        
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        isIntersecting = entry.isIntersecting;
                        if (!isIntersecting && animationFrameId) {
                            stopAnimation();
                        } else if (isIntersecting && !animationFrameId && isDesktop() && !document.hidden) {
                            startAnimation();
                        }
                    });
                },
                { threshold: 0 }
            );
            intersectionObserver.observe(canvas);
        }
        
        // Throttle scroll updates to avoid jank - use requestAnimationFrame for smoother updates
        let scrollRafId: number | null = null;
        
        const throttledScroll = () => {
            if (scrollRafId !== null) return;
            
            scrollRafId = requestAnimationFrame(() => {
                updateCanvasRect();
                scrollRafId = null;
            });
        };
        window.addEventListener('scroll', throttledScroll, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);

        const supportsResizeObserver = typeof window !== 'undefined' && 'ResizeObserver' in window;

        if (supportsResizeObserver) {
            resizeObserver = new ResizeObserver(updateCanvasRect);
            resizeObserver.observe(canvas);
        } else {
            window.addEventListener('scroll', updateCanvasRect, true);
        }

        return () => {
            stopAnimation();
            window.removeEventListener('resize', handleResize);
            if (supportsResizeObserver && resizeObserver) {
                resizeObserver.disconnect();
            }
            if (intersectionObserver) {
                intersectionObserver.disconnect();
            }
            window.removeEventListener('scroll', throttledScroll);
            if (scrollRafId !== null) {
                cancelAnimationFrame(scrollRafId);
            }
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
        />
    );
};
