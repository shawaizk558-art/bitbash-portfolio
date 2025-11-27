import { Button } from "@/components/ui/button";
import { SocialProof } from "@/components/SocialProof";
import { HeroBackground } from "@/components/HeroBackground";

export const Hero = () => {
  return (
    <section className="hero-tablet-height relative min-h-[clamp(300px,50vh,400px)] sm:min-h-[clamp(350px,55vh,450px)] md:min-h-[clamp(420px,65vh,540px)] lg:min-h-[clamp(360px,65vh,520px)] 2xl:min-h-[clamp(360px,64vh,560px)] flex items-center justify-center overflow-hidden pt-14 pb-8 sm:pb-12 lg:pb-0">
      <HeroBackground />


      <div className="relative z-10 container-responsive text-center 2xl:-mt-4">
        <div className="max-w-4xl mx-auto space-responsive-lg animate-fade-in">
          <div className="space-responsive-sm mt-6 sm:mt-10 lg:mt-14">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-sans px-2 sm:px-0">
              <span className="block sm:inline">Your Software, Built <span className="text-purple-600">Right</span> — Delivered<br className="md:block lg:hidden" /> <span className="text-purple-600">Fast</span> by a Team You Can Count On.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-black mx-auto max-w-none whitespace-normal overflow-visible break-words px-4 sm:px-0">
              The Software Development Agency for Full Stack Apps and Scripts
            </p>
          </div>

          {/* Call-to-Action Buttons (no input) */}
          <div className="relative max-w-3xl mx-auto mt-8 sm:mt-10 lg:mt-12">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:-translate-y-2">
              <Button
                variant="outline"
                size="lg"
                className="h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto bg-transparent hover:bg-transparent text-gray-900 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg shadow-gray-400/20 hover:shadow-gray-400/35 transition-colors transition-shadow duration-300"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="h-12 lg:h-12 py-4 px-6 text-base sm:text-lg lg:text-lg font-semibold rounded-xl w-full sm:w-auto hover:scale-100 transition-all duration-300"
              >
                Book a Call
              </Button>
            </div>

            {/* Social Proof - Reusable */}
            <SocialProof
              className="pt-6 sm:pt-8 pb-4 sm:pb-8 lg:pb-8"
              avatars={["/zee.jpg", "/awais.jpg", "/hassan-arslan.png", "/mughees.jpg", "/fras.png"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
