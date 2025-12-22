import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQVariant, faqDatasets, defaultFaqs } from "@/data/faqs";

interface FAQProps {
  variant?: FAQVariant;
}

export const FAQ = ({ variant = "default" }: FAQProps) => {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());
  const faqs = faqDatasets[variant] ?? defaultFaqs;
  const sectionPadding = variant === "pricing" ? "py-12 sm:py-16 md:py-20 pb-16 sm:pb-20 md:pb-24" : "py-12 sm:py-16 md:py-24 pb-40 sm:pb-60 md:pb-80";

  const toggleFAQ = (cardKey: string) => {
    setOpenCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardKey)) {
        newSet.delete(cardKey);
      } else {
        newSet.add(cardKey);
      }
      return newSet;
    });
  };

  return (
    <section className={`${sectionPadding} bg-gray-50`}>
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
        </div>

        {/* FAQ Grid - 2 Column */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="flex-1 space-y-6 sm:space-y-8">
              {faqs.filter((_, index) => index % 2 === 0).map((faq, columnIndex) => {
                const leftStateKey = `left-${variant}-${columnIndex}`;
                return (
                  <div
                    key={`left-${columnIndex}`}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(leftStateKey)}
                      className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-3 sm:gap-4 min-h-[44px] lg:min-h-0"
                    >
                      <span className="font-semibold text-gray-900 text-base sm:text-lg lg:text-lg leading-relaxed pr-2">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 mt-0.5 ${
                          openCards.has(leftStateKey) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        openCards.has(leftStateKey) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                        <p className="text-gray-600 text-sm sm:text-base lg:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Right Column */}
            <div className="flex-1 space-y-6 sm:space-y-8">
              {faqs.filter((_, index) => index % 2 === 1).map((faq, columnIndex) => {
                const rightStateKey = `right-${variant}-${columnIndex}`;
                return (
                  <div
                    key={`right-${columnIndex}`}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(rightStateKey)}
                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-start justify-between gap-3 sm:gap-4 min-h-[44px] lg:min-h-0"
              >
                <span className="font-semibold text-gray-900 text-base sm:text-lg lg:text-lg leading-relaxed pr-2">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0 mt-0.5 ${
                    openCards.has(rightStateKey) ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openCards.has(rightStateKey) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                  <p className="text-gray-600 text-sm sm:text-base lg:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

