import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What automation services does BitBash specialize in?",
    answer: "BitBash specializes in business process automation, data scraping, workflow automation, API integrations, and intelligent automation systems. We help businesses eliminate repetitive tasks, streamline operations, and scale efficiently through custom automation solutions."
  },
  {
    question: "What types of data scraping projects can you handle?",
    answer: "We build custom web scrapers for any website or data source including e-commerce sites, social media platforms, business directories, real estate listings, and more. Our scrapers handle dynamic content, pagination, authentication, and deliver clean, structured data in any format you need."
  },
  {
    question: "Can you automate our existing business processes?",
    answer: "Absolutely! We analyze your current workflows and build custom automation solutions for tasks like data entry, report generation, email processing, inventory management, customer onboarding, and any repetitive process. Most clients see 70-90% time savings."
  },
  {
    question: "What technologies do you use for automation projects?",
    answer: "We use Python (Selenium, Scrapy, BeautifulSoup), Node.js, Puppeteer, and headless browsers for web automation. For data processing, we leverage Pandas, APIs, cloud functions, and databases. Every solution is tailored to your specific requirements."
  },
  {
    question: "How do you handle websites with anti-scraping measures?",
    answer: "We implement advanced techniques including rotating proxies, user-agent rotation, request throttling, session management, and browser fingerprinting. We ensure ethical scraping that respects robots.txt and terms of service while delivering reliable results."
  },
  {
    question: "Can you integrate automation with our existing tools?",
    answer: "Yes! We integrate with CRMs (Salesforce, HubSpot), project management tools (Asana, Jira), spreadsheets (Google Sheets, Excel), databases, email systems, and any platform with an API. We create seamless workflows across all your business tools."
  },
  {
    question: "How long does it take to build an automation solution?",
    answer: "Simple automation scripts can be delivered in 1-2 weeks. Complex data scraping systems typically take 3-4 weeks. Enterprise-level workflow automation projects may require 6-8 weeks. We provide accurate timelines after reviewing your specific requirements."
  },
  {
    question: "Do you provide maintenance for automation scripts?",
    answer: "Yes! Websites change and automation needs updates. We offer maintenance packages to monitor your scripts, fix issues when sites update, add new features, and ensure continuous operation. Most clients opt for monthly or quarterly maintenance plans."
  },
  {
    question: "Is data scraping legal and ethical?",
    answer: "We only scrape publicly available data and ensure compliance with website terms of service, robots.txt files, and data protection regulations (GDPR, CCPA). We provide guidance on legal considerations and implement ethical scraping practices for all projects."
  },
  {
    question: "What ROI can I expect from automation projects?",
    answer: "Most clients see immediate ROI through time savings and reduced errors. Typical results include: 80% reduction in manual work, 95% fewer errors, ability to process 10x more data, and staff reallocation to higher-value tasks. We provide ROI projections during consultation."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 pb-80 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, features, and services.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-purple-200 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-base leading-relaxed pr-2">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

