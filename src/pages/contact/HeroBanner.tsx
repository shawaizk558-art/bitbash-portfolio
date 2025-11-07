const HeroBanner = () => {
  return (
    <section className="relative min-h-[50vh] sm:min-h-[55vh] lg:min-h-[65vh] 2xl:min-h-[clamp(280px,58vh,460px)] flex items-center justify-center overflow-hidden pt-12 pb-3 sm:pb-4">
      {/* Match homepage purple animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end animate-gradient opacity-60 pointer-events-none" />
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="container-responsive relative z-20">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center relative top-2 sm:top-3 lg:-mt-10 2xl:-mt-1">
          <h1 className="text-responsive-3xl sm:text-responsive-4xl md:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">
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


