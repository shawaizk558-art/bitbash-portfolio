import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to build a project?",
    answer: "Most MVPs are delivered within 30 days. Larger or custom projects depend on scope and complexity, but we always share clear timelines before we start."
  },
  {
    question: "What technologies do you use?",
    answer: "Our core stack includes Python, Django, React, Node.js, and Flutter — but we're flexible and adapt to your project's technical needs."
  },
  {
    question: "How do you handle project communication?",
    answer: "We keep it simple and transparent — you'll get regular updates, demo previews, and direct access to your assigned project manager or developer."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes. We offer ongoing maintenance, updates, and scaling support to keep your software running smoothly after launch."
  },
  {
    question: "Can I hire your developers for my team?",
    answer: "Absolutely. You can hire our engineers as dedicated or contract-based team members for short or long-term projects."
  },
  {
    question: "Do you sign NDAs or protect my project idea?",
    answer: "Yes. Every project starts with a confidentiality agreement to ensure your data and ideas stay secure."
  },
  {
    question: "How do I get started?",
    answer: "Just reach out through our contact form or schedule a quick call. We'll discuss your goals, suggest a development plan, and provide a free quote."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payments via Wise, Payoneer, Bank Transfer (USD/EUR/GBP), and Cryptocurrency (USDT TRC20 or ERC20)."
  },
  {
    question: "Do you require an upfront payment?",
    answer: "Yes. Most projects begin with a small upfront milestone (around 20–30%), with the balance due after delivery and approval."
  },
  {
    question: "Can I pay after testing the software?",
    answer: "Of course. We provide a working demo or test phase before final payment — ensuring you're satisfied with the results first."
  },
  {
    question: "Do you offer refunds?",
    answer: "We don't usually issue refunds after delivery, but if a milestone isn't met or a feature doesn't work as agreed, we'll fix it or refund that portion."
  },
  {
    question: "Do you charge monthly or one-time fees?",
    answer: "That depends on the project. One-time payments for standalone software or MVPs. Monthly retainers for ongoing automation, maintenance, or support."
  }
];

export const FAQ = () => {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

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
    <section className="py-12 sm:py-16 md:py-24 pb-40 sm:pb-60 md:pb-80 bg-gray-50">
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
                const leftStateKey = `left-${columnIndex}`;
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
                const rightStateKey = `right-${columnIndex}`;
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

