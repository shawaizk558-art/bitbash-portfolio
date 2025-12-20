export const ConsistentDelivery = () => {
  return (
    <section className="bg-white pt-12 sm:pt-16 md:pt-24">
      <div className="container-responsive">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl shadow-xl border border-purple-100 py-8 sm:py-10 md:py-12 relative" style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(168, 85, 247, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            {/* Enhanced bottom shadow */}
            <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-b-3xl blur-xl pointer-events-none"></div>
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
              Consistent Delivery, Every Week
            </h2>
            
            {/* Image */}
            <div className="w-full max-w-5xl mx-auto">
              <img 
                src="/client-communication.png" 
                alt="Real client communication examples" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

