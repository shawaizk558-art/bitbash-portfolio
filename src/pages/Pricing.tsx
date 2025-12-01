import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Check, Info, Database, Zap } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { useNavigate } from "react-router-dom";
import { Showcase } from "@/components/Showcase";
import { ContactButton } from "@/components/ContactButton";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Pricing
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent project-based pricing. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto">

          <div className="relative py-16">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-6 text-lg font-bold uppercase tracking-widest text-purple-600">
                Engagement Models
              </span>
            </div>
          </div>

          <div className="mt-8 mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Monthly Basis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hire dedicated developers on a monthly basis - Junior, Associate, or Senior level
            </p>
          </div>

          {/* Desktop comparison table */}
          <div className="overflow-x-auto pb-12 -mx-4 px-4 sm:mx-0 sm:px-0 mt-8 hidden md:block">
            <div className="min-w-[800px] grid grid-cols-4 gap-x-4">

              {/* Header Row - Plans */}
              <div className="p-6 border-b border-gray-300 bg-white flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-semibold text-gray-900 mb-2">
                  Characteristics
                </p>
                <p className="text-base text-gray-600">
                  Key expectations at each level
                </p>
              </div>

              {/* Junior Developer */}
              <div className="p-6 border border-gray-300 text-center bg-white rounded-t-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Junior Developer</h3>
                <div className="text-3xl font-bold text-gray-900">$1,000</div>
                <p className="text-base text-gray-600 mt-2">per month</p>
              </div>

              {/* Associate Developer */}
              <div className="p-6 border border-gray-300 text-center bg-white rounded-t-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Associate Developer</h3>
                <div className="text-3xl font-bold text-gray-900">$1,500</div>
                <p className="text-base text-gray-600 mt-2">per month</p>
              </div>

              {/* Senior Developer */}
              <div className="p-6 border border-gray-300 text-center bg-white rounded-t-2xl rounded-tr-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Senior Developer</h3>
                <div className="text-3xl font-bold text-gray-900">$3,000</div>
                <p className="text-base text-gray-600 mt-2">per month</p>
              </div>

              {/* Row 1: Code Quality & Completion of Tasks */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Code Quality & Completion of Tasks</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Basic quality; needs reviews</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Good quality; mostly self-managed</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">High quality; minimal/no review required</p>
              </div>

              {/* Row 2: % of Tasks Delivered on Time */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">% of Tasks Delivered on Time</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Inconsistent; still learning planning</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Mostly on time</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Consistently on or before deadlines</p>
              </div>

              {/* Row 3: Client Communication */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Client Communication</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Limited; supervised</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Handles routine updates</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Leads client calls & escalations confidently</p>
              </div>

              {/* Row 4: Contribution as Solution Architect */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Contribution as Solution Architect</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Not expected</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Gives suggestions</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Leads architectural decisions</p>
              </div>

              {/* Row 5: Demonstrate Full Empowerment in Role */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Demonstrate Full Empowerment in Role</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Not yet; depends on mentors</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Owns modules and sections</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Fully accountable for major areas</p>
              </div>

              {/* Row 6: Adhere to Team Communication Standards */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Adhere to Team Communication Standards</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Needs reminders</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Consistent</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Sets and enforces standards</p>
              </div>

              {/* Row 7: Maintain Meeting Etiquette and Standards */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Maintain Meeting Etiquette and Standards</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Learning professionalism</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Follows consistently</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Exemplary behavior; guides others</p>
              </div>

              {/* Row 8: Follow Baselag Reporting Practices */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Follow Baselag Reporting Practices</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Needs reminders</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Regular and consistent</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Fully consistent; mentors others</p>
              </div>

              {/* Row 9: Deep Work Focus & Execution */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Deep Work Focus & Execution</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Developing discipline</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Strong focus</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">High discipline; deep execution</p>
              </div>

              {/* Row 10: Git & GitHub Ethics */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Git & GitHub Ethics</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Understands basics; guided</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Strong discipline; helps juniors</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Enforces standards; mentors team</p>
              </div>

              {/* Row 11: Follow PDLC Process Consistently */}
              <div className="p-6 border-y border-gray-300 bg-white">
                <p className="text-base font-medium text-gray-900">Follow PDLC Process Consistently</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Learning and following instructions</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Consistent without reminders</p>
              </div>
              <div className="p-6 border border-gray-300 bg-white">
                <p className="text-base text-gray-700">Ensures entire team follows PDLC</p>
              </div>

              {/* Row 12: Plan CTAs */}
              <div className="p-6 border-t border-gray-300 bg-white rounded-bl-2xl" />
              <div className="p-6 border border-gray-300 bg-white rounded-b-2xl flex items-center justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base sm:text-lg font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire a Junior Developer
                </button>
              </div>
              <div className="p-6 border border-gray-300 bg-white rounded-b-2xl flex items-center justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base sm:text-lg font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire an Associate Developer
                </button>
              </div>
              <div className="p-6 border border-gray-300 bg-white rounded-b-2xl flex items-center justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base sm:text-lg font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire a Senior Developer
                </button>
              </div>

            </div>
          </div>

          {/* Mobile comparison cards */}
          <div className="mt-8 space-y-6 md:hidden">
            {/* Junior Developer Card */}
            <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Junior Developer</h3>
                <div className="text-2xl font-bold text-gray-900">$1,000</div>
                <p className="text-sm text-gray-600 mt-1">per month</p>
              </div>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-900">Code Quality & Completion of Tasks</p>
                  <p className="text-sm text-gray-700">Basic quality; needs reviews</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">% of Tasks Delivered on Time</p>
                  <p className="text-sm text-gray-700">Inconsistent; still learning planning</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Client Communication</p>
                  <p className="text-sm text-gray-700">Limited; supervised</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Contribution as Solution Architect</p>
                  <p className="text-sm text-gray-700">Not expected</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Demonstrate Full Empowerment in Role</p>
                  <p className="text-sm text-gray-700">Not yet; depends on mentors</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Adhere to Team Communication Standards</p>
                  <p className="text-sm text-gray-700">Needs reminders</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Maintain Meeting Etiquette and Standards</p>
                  <p className="text-sm text-gray-700">Learning professionalism</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow Baselag Reporting Practices</p>
                  <p className="text-sm text-gray-700">Needs reminders</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Deep Work Focus & Execution</p>
                  <p className="text-sm text-gray-700">Developing discipline</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Git & GitHub Ethics</p>
                  <p className="text-sm text-gray-700">Understands basics; guided</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow PDLC Process Consistently</p>
                  <p className="text-sm text-gray-700">Learning and following instructions</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire a Junior Developer
                </button>
              </div>
            </div>

            {/* Associate Developer Card */}
            <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Associate Developer</h3>
                <div className="text-2xl font-bold text-gray-900">$1,500</div>
                <p className="text-sm text-gray-600 mt-1">per month</p>
              </div>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-900">Code Quality & Completion of Tasks</p>
                  <p className="text-sm text-gray-700">Good quality; mostly self-managed</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">% of Tasks Delivered on Time</p>
                  <p className="text-sm text-gray-700">Mostly on time</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Client Communication</p>
                  <p className="text-sm text-gray-700">Handles routine updates</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Contribution as Solution Architect</p>
                  <p className="text-sm text-gray-700">Gives suggestions</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Demonstrate Full Empowerment in Role</p>
                  <p className="text-sm text-gray-700">Owns modules and sections</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Adhere to Team Communication Standards</p>
                  <p className="text-sm text-gray-700">Consistent</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Maintain Meeting Etiquette and Standards</p>
                  <p className="text-sm text-gray-700">Follows consistently</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow Baselag Reporting Practices</p>
                  <p className="text-sm text-gray-700">Regular and consistent</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Deep Work Focus & Execution</p>
                  <p className="text-sm text-gray-700">Strong focus</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Git & GitHub Ethics</p>
                  <p className="text-sm text-gray-700">Strong discipline; helps juniors</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow PDLC Process Consistently</p>
                  <p className="text-sm text-gray-700">Consistent without reminders</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire an Associate Developer
                </button>
              </div>
            </div>

            {/* Senior Developer Card */}
            <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Senior Developer</h3>
                <div className="text-2xl font-bold text-gray-900">$3,000</div>
                <p className="text-sm text-gray-600 mt-1">per month</p>
              </div>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-sm font-medium text-gray-900">Code Quality & Completion of Tasks</p>
                  <p className="text-sm text-gray-700">High quality; minimal/no review required</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">% of Tasks Delivered on Time</p>
                  <p className="text-sm text-gray-700">Consistently on or before deadlines</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Client Communication</p>
                  <p className="text-sm text-gray-700">Leads client calls & escalations confidently</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Contribution as Solution Architect</p>
                  <p className="text-sm text-gray-700">Leads architectural decisions</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Demonstrate Full Empowerment in Role</p>
                  <p className="text-sm text-gray-700">Fully accountable for major areas</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Adhere to Team Communication Standards</p>
                  <p className="text-sm text-gray-700">Sets and enforces standards</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Maintain Meeting Etiquette and Standards</p>
                  <p className="text-sm text-gray-700">Exemplary behavior; guides others</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow Baselag Reporting Practices</p>
                  <p className="text-sm text-gray-700">Fully consistent; mentors others</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Deep Work Focus & Execution</p>
                  <p className="text-sm text-gray-700">High discipline; deep execution</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Git & GitHub Ethics</p>
                  <p className="text-sm text-gray-700">Enforces standards; mentors team</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow PDLC Process Consistently</p>
                  <p className="text-sm text-gray-700">Ensures entire team follows PDLC</p>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => navigate('/contact')}
                  className="text-base font-semibold text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Hire a Senior Developer
                </button>
              </div>
            </div>
          </div>

          <div className="relative py-24">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-6 text-lg font-bold uppercase tracking-widest text-purple-600">
                Fixed Cost Projects
              </span>
            </div>
          </div>

          {/* New Fixed Cost Card */}
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

          <div className="relative py-24">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-6 text-lg font-bold uppercase tracking-widest text-purple-600">
                Supercharge Your Workflow
              </span>
            </div>
          </div>

          {/* Automation Project Card */}
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
        </div>
      </section>

      {/* Showcase Section */}
      <section className="pt-16 pb-16 bg-white">
        <div className="container-responsive text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Exceptional Work Delivered by Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the results of our dedicated engineering and design expertise.
          </p>
        </div>
      </section >

      <Showcase
        showHeader={false}
        showTestimonials={false}
        paddingClass="pt-0 pb-16 sm:pb-24 bg-white"
      />

      {/* Pricing FAQ */}
      <FAQ variant="pricing" />

      <Footer isHomepage={false} />
    </div >
  );
};

export default Pricing;
