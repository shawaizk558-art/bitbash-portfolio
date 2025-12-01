import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  label?: string;
  /** Whether the button should take full width on small screens */
  fullWidth?: boolean;
  /** Optional extra classes for fine-tuning in specific layouts */
  className?: string;
}

export const ContactButton = ({
  label = "Contact Us",
  fullWidth = true,
  className,
}: ContactButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/contact")}
      className={cn(
        fullWidth ? "w-full lg:w-auto" : "w-auto",
        "bg-purple-600 text-white font-bold text-base px-5 py-2 rounded-md hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center whitespace-nowrap",
        className
      )}
      style={{
        height: "38px",
      }}
    >
      {label}
    </button>
  );
};


