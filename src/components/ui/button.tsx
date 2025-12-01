import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px] lg:min-h-0",
  {
    variants: {
      variant: {
      default: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 border border-transparent before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-150%] before:skew-x-[-15deg] before:animate-shimmer",
        glass: "bg-white/60 backdrop-blur-md border border-white/40 text-gray-900 hover:bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105",
      },
      size: {
        default: "h-11 lg:h-10 px-4 py-2",
        sm: "h-10 lg:h-9 rounded-md px-3",
        lg: "h-12 lg:h-11 rounded-md px-8",
        icon: "h-11 w-11 lg:h-10 lg:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
