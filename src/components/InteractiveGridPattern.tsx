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

        let animationFrameId: number;
        let width = 0;
        let height = 0;
        let mouseX = -1000;
        let mouseY = -1000;

        // Grid configuration
        const gap = 40; // Distance between dots
        const dotSize = 2; // Base dot radius
        const hoverRadius = 100; // Radius of influence
        const flowSpeed = 0.2; // Speed of the background flow
        let offset = 0; // For flow animation

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000
            mouseY = -1000;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update flow offset
            offset = (offset + flowSpeed) % gap;

            // Calculate grid dimensions including buffer for smooth scrolling
            const cols = Math.ceil(width / gap) + 2;
            const rows = Math.ceil(height / gap) + 2;

            for (let i = -1; i < cols; i++) {
                for (let j = -1; j < rows; j++) {
                    // Base position with flow offset
                    const baseX = i * gap + offset;
                    const baseY = j * gap + offset;

                    // Calculate distance to mouse
                    const dx = mouseX - baseX;
                    const dy = mouseY - baseY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Interaction logic
                    let x = baseX;
                    let y = baseY;
                    let size = dotSize;
                    let alpha = 0.1; // Base opacity

                    if (distance < hoverRadius) {
                        // Calculate repulsion/attraction
                        const force = (hoverRadius - distance) / hoverRadius;

                        // Move dots away from cursor (repulsion)
                        const angle = Math.atan2(dy, dx);
                        const moveDistance = force * 20; // Max move distance

                        x -= Math.cos(angle) * moveDistance;
                        y -= Math.sin(angle) * moveDistance;

                        // Scale up and increase opacity near cursor
                        size = dotSize + force * 2;
                        alpha = 0.1 + force * 0.3;
                    }

                    // Draw dot
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`; // Purple-500
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // Initialize
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Start loop
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
        />
    );
};
