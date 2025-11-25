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
        let mouseX = -1000;
        let mouseY = -1000;
        let lastFrameTime = 0;
        let canvasRect = canvas.getBoundingClientRect();

        // Grid configuration
        const gap = 56; // Distance between dots (larger gap reduces density)
        const dotSize = 2;
        const hoverRadius = 100;
        const flowSpeed = 0.15;
        const FRAME_INTERVAL = 1000 / 15;
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

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX - canvasRect.left;
            mouseY = e.clientY - canvasRect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
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

            for (let i = -1; i < cols; i++) {
                for (let j = -1; j < rows; j++) {
                    const baseX = i * gap + offset;
                    const baseY = j * gap + offset;

                    const dx = mouseX - baseX;
                    const dy = mouseY - baseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    let x = baseX;
                    let y = baseY;
                    let size = dotSize;
                    let alpha = 0.08;

                    if (distance < hoverRadius) {
                        const force = (hoverRadius - distance) / hoverRadius;
                        const angle = Math.atan2(dy, dx);
                        const moveDistance = force * 18;

                        x -= Math.cos(angle) * moveDistance;
                        y -= Math.sin(angle) * moveDistance;

                        size = dotSize + force * 2;
                        alpha = 0.1 + force * 0.25;
                    }

                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`;
                    ctx.fill();
                }
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
        window.addEventListener('scroll', updateCanvasRect, true);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            stopAnimation();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', updateCanvasRect, true);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
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
