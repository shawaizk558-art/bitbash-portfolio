import { useState } from "react";
import { Check, Database, Zap } from "lucide-react";
import { ContactButton } from "@/components/ContactButton";
import { Link } from "react-router-dom";

export const HomepagePricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"hourly" | "monthly">("monthly");

  const developerPlans = {
    junior: { monthlyMin: 1000, monthlyMax: 1500 },
    associate: { monthlyMin: 1500, monthlyMax: 2500 },
    senior: { monthlyMin: 2500, monthlyMax: 3500 },
  } as const;

  const HOURS_PER_MONTH = 160;

  const formatPrice = (amount: number) =>
    amount.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const getDisplayPrice = (plan: { monthlyMin: number; monthlyMax: number }) => {
    const { monthlyMin, monthlyMax } = plan;

    if (billingPeriod === "monthly") {
      return {
        amount: `${formatPrice(monthlyMin)} - ${formatPrice(monthlyMax)}`,
        suffix: "per month",
        note: "Save 20% vs hourly",
      };
    }

    // Derive base hourly rate from discounted monthly price:
    // monthlyDiscounted = hourlyRate * HOURS_PER_MONTH * 0.8
    const hourlyMinRaw = monthlyMin / (HOURS_PER_MONTH * 0.8);
    const hourlyMaxRaw = monthlyMax / (HOURS_PER_MONTH * 0.8);

    const hourlyMin = Math.round(hourlyMinRaw);
    const hourlyMax = Math.round(hourlyMaxRaw);

    return {
      amount: `${formatPrice(hourlyMin)} - ${formatPrice(hourlyMax)}`,
      suffix: "per hour",
      note: "",
    };
  };

  const juniorPricing = getDisplayPrice(developerPlans.junior);
  const associatePricing = getDisplayPrice(developerPlans.associate);
  const seniorPricing = getDisplayPrice(developerPlans.senior);
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 bg-white">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Fixed cost projects and flexible engagement models. No hidden fees.
          </p>
        </div>

        {/* Three Cards - Horizontal Layout */}
        <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
          {/* Card 1: Automation Project */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section */}
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-900">Automation Project</h3>
                  </div>
                  <div className="flex items-baseline justify-center flex-wrap mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$700 - $3,000</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Streamline business workflows with custom automation scripts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Seamless API integrations connecting your favorite tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Custom bots for Discord, Telegram, or Slack</span>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex-shrink-0">
                  <ContactButton />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Fixed Cost Scraping Project */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Section */}
              <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-gray-300 flex flex-col justify-center items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Database className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-900">Fixed Cost Scraping Project</h3>
                  </div>
                  <div className="flex items-baseline justify-center flex-wrap mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-gray-900">$400 - $1,500</span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-[2] p-8 flex flex-col lg:flex-row items-center gap-8 justify-between">
                <div className="flex flex-col gap-3 w-full pl-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Custom data extraction tailored to your specific requirements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Advanced anti-bot handling with automatic proxy rotation included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-900 text-sm">Receive clean data in CSV, JSON, or Excel</span>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex-shrink-0">
                  <ContactButton />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Monthly/Hourly Basis with Comparison Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-300 hover:shadow-md transition-shadow overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Header with Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {billingPeriod === "hourly" ? "Hourly Basis" : "Monthly Basis"}
                  </h3>
                  <p className="text-base text-gray-600">
                    {billingPeriod === "hourly"
                      ? "Hire dedicated developers on an hourly basis - flexible and scalable to your needs"
                      : "Hire dedicated developers on a monthly basis - save 20% compared to hourly"}
                  </p>
                </div>

                <div className="flex sm:justify-end">
                  <div className="inline-flex items-center rounded-full bg-white shadow-sm border border-gray-200 p-1.5 sm:p-2">
                    <button
                      type="button"
                      onClick={() => setBillingPeriod("hourly")}
                      aria-pressed={billingPeriod === "hourly"}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition ${
                        billingPeriod === "hourly"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-700"
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingPeriod("monthly")}
                      aria-pressed={billingPeriod === "monthly"}
                      className={`ml-1 flex items-center gap-1.5 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition ${
                        billingPeriod === "monthly"
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-700"
                      }`}
                    >
                      <span>Monthly</span>
                      <span className="text-[11px] sm:text-xs font-medium opacity-80">
                        Save 20%+
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comparison Table - Only Header Row */}
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[600px] grid grid-cols-3 gap-x-4">
                  {/* Junior Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Junior Developer</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${juniorPricing.amount}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      {juniorPricing.suffix}
                      {juniorPricing.note && (
                        <span className="text-gray-500"> · {juniorPricing.note}</span>
                      )}
                    </p>
                  </div>

                  {/* Associate Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Associate Developer</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${associatePricing.amount}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      {associatePricing.suffix}
                      {associatePricing.note && (
                        <span className="text-gray-500"> · {associatePricing.note}</span>
                      )}
                    </p>
                  </div>

                  {/* Senior Developer */}
                  <div className="p-6 border border-gray-300 text-center rounded-2xl">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Senior Developer</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                      ${seniorPricing.amount}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mt-2">
                      {seniorPricing.suffix}
                      {seniorPricing.note && (
                        <span className="text-gray-500"> · {seniorPricing.note}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* View Full Pricing CTA */}
              <div className="mt-8 text-center">
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white font-bold text-base px-6 py-3 rounded-md hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 whitespace-nowrap"
                >
                  View Full Pricing
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

