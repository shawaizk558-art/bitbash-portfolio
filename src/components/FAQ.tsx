import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQVariant = "default" | "pricing";

const defaultFaqs = [
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

const pricingFaqs = [
  {
    question: "How does Bitbash charge for projects?",
    answer: "We offer both hourly and project-based pricing models. Hourly rates range from $20 – $30/hour, while project pricing depends entirely on the features, scope, and technical complexity of your automation."
  },
  {
    question: "How is the final project cost determined?",
    answer: "Each project is unique. After discussing your requirements, we evaluate the tasks, integrations, and complexity level before sharing a clear cost estimate. Larger, feature-heavy automations naturally require more development hours."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently accept payments via Wise, Payoneer, Bank Transfer, and Crypto (USDT TRC-20)."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes — if we’re unable to meet the agreed-upon expectations or timelines, we provide a full or partial refund based on the project stage. Once the project meets the discussed scope, payments become non-refundable."
  },
  {
    question: "What is included in post-delivery support?",
    answer: "Every project includes 7–14 days of free support to ensure smooth operation. After that, clients can opt for monthly maintenance plans for continued improvements and technical assistance."
  },
  {
    question: "How are timelines defined?",
    answer: "Project timelines depend on the feature set, workflow complexity, and integrations involved. A clear delivery window is provided after reviewing your full requirement brief."
  },
  {
    question: "Are there any setup or hidden fees?",
    answer: "No. All costs are clearly shared before the project begins. There are no hidden charges — you pay only for the agreed development work and any optional post-delivery support."
  },
  {
    question: "Can I start with a small project before scaling up?",
    answer: "Absolutely. Many clients begin with a smaller MVP or test automation to validate results first. Once the workflow performs as expected, we can seamlessly expand the project into a larger, multi-platform system at your pace."
  }
];

const faqDatasets: Record<FAQVariant, typeof defaultFaqs> = {
  default: defaultFaqs,
  pricing: pricingFaqs
};

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

