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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:useEffect',message:'Logo component mounted',data:{size,variant,isMobile:window.innerWidth<1024},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    const dot = dotRef.current;
    const container = containerRef.current;
    if (!dot || !container) return;

    // #region agent log
    const dotRect = dot.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(dot);
    fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:useEffect',message:'Dot element found',data:{hasWillChange:computedStyle.willChange!=='auto',hasTransform:computedStyle.transform!=='none',opacity:computedStyle.opacity,animationName:computedStyle.animationName,animationDuration:computedStyle.animationDuration,width:dotRect.width,height:dotRect.height},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    let animationIterationCount = 0;
    let lastOpacity = parseFloat(computedStyle.opacity);

    const handleAnimationStart = () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:handleAnimationStart',message:'Animation started',data:{iteration:animationIterationCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    };

    const handleAnimationIteration = () => {
      animationIterationCount++;
      const currentOpacity = parseFloat(window.getComputedStyle(dot).opacity);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:handleAnimationIteration',message:'Animation iteration',data:{iteration:animationIterationCount,opacity:currentOpacity,opacityChange:Math.abs(currentOpacity-lastOpacity)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      lastOpacity = currentOpacity;
    };

    const handleAnimationEnd = () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:handleAnimationEnd',message:'Animation ended unexpectedly',data:{iteration:animationIterationCount},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
    };

    dot.addEventListener('animationstart', handleAnimationStart);
    dot.addEventListener('animationiteration', handleAnimationIteration);
    dot.addEventListener('animationend', handleAnimationEnd);

    // Monitor opacity changes
    const opacityObserver = new MutationObserver(() => {
      const currentOpacity = parseFloat(window.getComputedStyle(dot).opacity);
      if (Math.abs(currentOpacity - lastOpacity) > 0.1) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:opacityObserver',message:'Opacity changed significantly',data:{from:lastOpacity,to:currentOpacity,change:currentOpacity-lastOpacity},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        lastOpacity = currentOpacity;
      }
    });

    opacityObserver.observe(dot, { attributes: true, attributeFilter: ['style', 'class'] });

    // Monitor layout shifts
    let lastRect = dot.getBoundingClientRect();
    const layoutObserver = new ResizeObserver(() => {
      const currentRect = dot.getBoundingClientRect();
      if (Math.abs(currentRect.top - lastRect.top) > 1 || Math.abs(currentRect.left - lastRect.left) > 1) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:layoutObserver',message:'Layout shift detected',data:{topChange:currentRect.top-lastRect.top,leftChange:currentRect.left-lastRect.left},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
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
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/355e7c21-0ece-4d51-b822-cffffbac4c7d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Logo.tsx:handleResize',message:'Media query breakpoint crossed',data:{fromWidth:lastWidth,toWidth:currentWidth,fromMobile:wasMobile,toMobile:isMobile,animationDuration:computedStyle.animationDuration},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
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

