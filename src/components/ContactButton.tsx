import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  label?: string;
  /** Whether the button should take full width on small screens */
  fullWidth?: boolean;
  /** Optional extra classes for fine-tuning in specific layouts */
  className?: string;
  /** Button size variant */
  size?: "default" | "large";
}

export const ContactButton = ({
  label = "Contact Us",
  fullWidth = true,
  className,
  size = "default",
}: ContactButtonProps) => {
  const navigate = useNavigate();

  const sizeClasses = {
    default: "px-5 py-2 text-base",
    large: "px-6 py-2.5 text-base sm:text-lg",
  };

  const sizeHeight = {
    default: "38px",
    large: "44px",
  };

  return (
    <button
      onClick={() => navigate("/contact")}
      className={cn(
        fullWidth ? "w-full lg:w-auto" : "w-auto",
        "bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center whitespace-nowrap",
        sizeClasses[size],
        className
      )}
      style={{
        height: sizeHeight[size],
      }}
    >
      {label}
    </button>
  );
};


