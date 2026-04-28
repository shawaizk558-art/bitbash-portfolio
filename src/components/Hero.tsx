import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/SocialProof";
import { HeroBackground } from "@/components/HeroBackground";
import type { ReactNode } from "react";

interface HeroButton {
  label: string;
  href: string;
  variant?: "default" | "outline";
}

interface HeroProps {
  title?: ReactNode;
  subtitle?: string;
  variant?: "default" | "compact";
  buttons?: HeroButton[];
}

export const Hero = ({ title, subtitle, variant = "default", buttons }: HeroProps = {}) => {
  // Default values for index page
  const defaultTitle = (
    <span className="block sm:inline">
      Your Software, Built <span className="text-purple-600">Right</span>
      <span className="sm:hidden">
        <br /> — Delivered <span className="text-purple-600">Fast</span>
        <br /> by a Team You Can Count On.
      </span>
      <span className="hidden sm:inline">
        {" "}— Delivered <span className="text-purple-600">Fast</span> by a Team You Can Count On.
      </span>
    </span>
  );
  const defaultSubtitle = "The No 1 Automation Company in the World, Built for Success.";

  // Default buttons for index page
  const defaultButtons: HeroButton[] = [
    //{ label: "Contact Us", href: "/contact", variant: "outline" },
    //{ label: "Book a Call", href: "/contact", variant: "default" }
  ];

  const heroButtons = buttons || defaultButtons;

  // Height classes based on variant
  // Default: Original index page heights (50vh-65vh)
  // Compact: Projects page heights (42vh-50vh)
  const heightClasses = variant === "compact"
    ? "min-h-[clamp(200px,40vh,320px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)]"
    : "hero-tablet-height min-h-[clamp(280px,48vh,400px)] sm:min-h-[clamp(350px,55vh,450px)] md:min-h-[clamp(420px,65vh,540px)] lg:min-h-[clamp(360px,65vh,520px)] 2xl:min-h-[clamp(360px,64vh,560px)]";

  // Padding adjustments for compact variant
  const paddingClasses = variant === "compact"
    ? "pt-12 pb-4 sm:pt-14 sm:pb-6 lg:pb-8 xl:pb-12"
    : "pt-16 pb-4 sm:pt-12 sm:pb-6 md:pb-8 lg:pb-0";

  return (
    <section className={`relative ${heightClasses} flex items-start sm:items-center justify-center overflow-hidden ${paddingClasses}`}>
      <HeroBackground />


      <div className="relative z-10 container-responsive px-4 sm:px-0 text-center 2xl:-mt-4 my-6 sm:my-0">
        <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
          {/* Core project hero content (title + description) */}
          <div
            className="space-responsive-sm mt-3 sm:mt-8 lg:mt-10"
            data-project-hero-core="true"
          >
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans px-2 sm:px-0 ml-4 md:ml-0">
              {title ? <span className="block sm:inline">{title}</span> : defaultTitle}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black mx-auto max-w-none whitespace-normal overflow-visible break-words px-4 sm:px-0">
              {subtitle || defaultSubtitle}
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="relative max-w-3xl mx-auto mt-6 sm:mt-8 lg:mt-10">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:-translate-y-2">
              {heroButtons.map((button, index) => (
              <Button
                  key={index}
                  variant={button.variant || "default"}
                size="lg"
                  className={
                    button.variant === "outline"
                      ? "h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto bg-transparent hover:bg-transparent text-gray-900 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
                      : "h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto hover:scale-100 transition-all duration-300"
                  }
                asChild
              >
                  <a href={button.href}>{button.label}</a>
              </Button>
              ))}
            </div>

            {/* Social Proof - Reusable */}
            <SocialProof
              className="pt-6 sm:pt-8 pb-4 sm:pb-8 lg:pb-8"
              avatars={["/zee.webp", "/awais.webp", "/hassan-arslan.webp", "/mughees.webp", "/fras.webp"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
