import { cn } from "@/lib/utils";

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
  return (
    <span className={cn("font-bold leading-none", sizeClasses[size], variantClasses[variant], className)}>
      B
      <span className="relative inline-block align-baseline">
        {/* Use dotless i to avoid the default black dot */}
        ı
        {/* Purple dot overlay */}
        <span className="absolute top-[0.25em] lg:top-[0.16em] left-1/2 -translate-x-1/2 w-[0.2em] h-[0.2em] bg-purple-600 rounded-full animate-pulse-dot"></span>
      </span>
      tBash
    </span>
  );
};

