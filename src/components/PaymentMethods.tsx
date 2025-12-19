export const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: "Wise",
      logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/wise.svg",
      fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/New_Wise_%28formerly_TransferWise%29_logo.svg/512px-New_Wise_%28formerly_TransferWise%29_logo.svg.png",
      description: "Fast & secure international transfers"
    },
    {
      name: "Payoneer",
      logo: "/logos/Payoneer.png",
      fallback: "/logos/Payoneer.png",
      description: "Global payment platform"
    },
    {
      name: "Bank Transfer",
      logo: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
      fallback: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
      description: "USD/EUR/GBP"
    },
    {
      name: "Crypto",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      fallback: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      description: "USDT TRC20/ERC20"
    }
  ];

  return (
    <div className="py-8 sm:py-10">
      <div className="container-responsive">
        <div className="px-4">
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-100 shadow-sm px-8 sm:px-12 py-8 sm:py-12">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Payment Methods
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                Flexible payment options to suit your needs
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 flex items-center justify-center">
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        // Try fallback first
                        if (img.src !== method.fallback && !img.dataset.fallbackTried) {
                          img.dataset.fallbackTried = "true";
                          img.src = method.fallback;
                        } else {
                          // Final fallback - use text placeholder
                          img.style.display = "none";
                          const parent = img.parentElement;
                          if (parent && !parent.querySelector(".logo-placeholder")) {
                            const placeholder = document.createElement("div");
                            placeholder.className = "logo-placeholder text-purple-600 font-bold text-lg";
                            placeholder.textContent = method.name.charAt(0);
                            parent.appendChild(placeholder);
                          }
                        }
                      }}
                    />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 text-center">
                    {method.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

