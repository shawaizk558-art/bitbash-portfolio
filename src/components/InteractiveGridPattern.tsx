import { useEffect, useRef } from 'react';

interface InteractiveGridPatternProps {
    className?: string;
}

export const InteractiveGridPattern = ({ className }: InteractiveGridPatternProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
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
        const FRAME_INTERVAL = 1000 / 30;
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
            if (!isDesktop() || document.hidden) {
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

            ctx.lineWidth = lineWidth;

            const shimmer = Math.sin(performance.now() / 900);

            for (let i = -1; i < cols; i++) {
                const baseX = i * gap + offset;
                const alpha = 0.08 + 0.04 * Math.sin(i * 0.5 + shimmer);
                ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(baseX, -gap);
                ctx.lineTo(baseX, height + gap);
                ctx.stroke();
            }

            for (let j = -1; j < rows; j++) {
                const baseY = j * gap + offset;
                const alpha = 0.08 + 0.04 * Math.cos(j * 0.5 + shimmer);
                ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(-gap, baseY);
                ctx.lineTo(width + gap, baseY);
                ctx.stroke();
            }

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
        window.addEventListener('scroll', updateCanvasRect, { passive: true });
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
            } else {
                window.removeEventListener('scroll', updateCanvasRect, true);
            }
            window.removeEventListener('scroll', updateCanvasRect);
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
