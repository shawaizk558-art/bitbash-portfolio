import { HeroBackground } from "@/components/HeroBackground";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[clamp(220px,42vh,340px)] sm:min-h-[clamp(260px,46vh,380px)] md:min-h-[clamp(300px,50vh,420px)] lg:min-h-[clamp(280px,48vh,400px)] 2xl:min-h-[clamp(300px,46vh,420px)] flex items-center justify-center overflow-hidden pt-14 pb-3 sm:pb-4">
      {/* Match homepage purple animated gradient */}
      {/* Match homepage purple animated gradient */}
      <HeroBackground />
      <div className="container-responsive relative z-20">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center relative top-2 sm:top-3 2xl:-mt-1">
          <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
            Contact <span className="text-purple-600">Us</span>
          </h1>
          <p className="text-responsive-base sm:text-responsive-lg text-black font-semibold">
            BitBash is available <span className="text-purple-600 font-semibold">24/7</span> to assist you.
          </p>
          <p className="text-responsive-base sm:text-responsive-lg text-black mt-3">
            Reach out anytime and our team will respond promptly
          </p>
          <p className="text-responsive-base sm:text-responsive-lg text-black">
            typically within minutes during business hours.
          </p>
        </div>
      </div>
      {/* Subtle divider at bottom to separate sections */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200/60 to-transparent" />
    </section>
  );
};

export default HeroBanner;


