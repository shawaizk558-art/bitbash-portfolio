import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "white";
}

const sizeClasses = {
  sm: "text-base sm:text-lg",
  md: "text-xl md:text-2xl",
  lg: "text-xl md:text-2xl lg:text-3xl",
  xl: "text-2xl md:text-3xl lg:text-4xl"
};

const variantClasses = {
  default: "text-gray-900",
  white: "text-white"
};

export const Logo = ({ className, size = "lg", variant = "default" }: LogoProps) => {
  const dotRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const container = containerRef.current;
    if (!dot || !container) return;

    const dotRect = dot.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(dot);

    let animationIterationCount = 0;
    let lastOpacity = parseFloat(computedStyle.opacity);

    const handleAnimationStart = () => {
    };

    const handleAnimationIteration = () => {
      animationIterationCount++;
      const currentOpacity = parseFloat(window.getComputedStyle(dot).opacity);
      lastOpacity = currentOpacity;
    };

    const handleAnimationEnd = () => {
    };

    dot.addEventListener('animationstart', handleAnimationStart);
    dot.addEventListener('animationiteration', handleAnimationIteration);
    dot.addEventListener('animationend', handleAnimationEnd);

    // Monitor opacity changes
    const opacityObserver = new MutationObserver(() => {
      const currentOpacity = parseFloat(window.getComputedStyle(dot).opacity);
      if (Math.abs(currentOpacity - lastOpacity) > 0.1) {
        lastOpacity = currentOpacity;
      }
    });

    opacityObserver.observe(dot, { attributes: true, attributeFilter: ['style', 'class'] });

    // Monitor layout shifts
    let lastRect = dot.getBoundingClientRect();
    const layoutObserver = new ResizeObserver(() => {
      const currentRect = dot.getBoundingClientRect();
      if (Math.abs(currentRect.top - lastRect.top) > 1 || Math.abs(currentRect.left - lastRect.left) > 1) {
        lastRect = currentRect;
      }
    });

    layoutObserver.observe(dot);

    // Monitor media query changes (animation duration switch)
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const wasMobile = lastWidth < 1024;
      const isMobile = currentWidth < 1024;
      if (wasMobile !== isMobile) {
        const computedStyle = window.getComputedStyle(dot);
      }
      lastWidth = currentWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      dot.removeEventListener('animationstart', handleAnimationStart);
      dot.removeEventListener('animationiteration', handleAnimationIteration);
      dot.removeEventListener('animationend', handleAnimationEnd);
      opacityObserver.disconnect();
      layoutObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [size, variant]);

  return (
    <span ref={containerRef} className={cn("font-bold leading-none", sizeClasses[size], variantClasses[variant], className)}>
      B
      <span className="relative inline-block align-baseline">
        {/* Use dotless i to avoid the default black dot */}
        ı
        {/* Purple dot overlay */}
        <span ref={dotRef} className="absolute top-[0.25em] lg:top-[0.16em] left-1/2 -translate-x-1/2 w-[0.2em] h-[0.2em] bg-purple-600 rounded-full animate-pulse-dot"></span>
      </span>
      tBash
    </span>
  );
};

