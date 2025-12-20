import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { HeroBackground } from "@/components/HeroBackground";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Code, Building2, Users, MessageCircle, CheckCircle2, Calendar, FileText, Zap, TrendingUp, BarChart3, Target } from "@/lib/icons";
import { OurValues } from "@/components/OurValues";
import { Benefits } from "@/components/Benefits";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Careers = () => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll if hash is explicitly set to #open-positions
    if (location.hash && location.hash === '#open-positions') {
      // Wait for page to be fully rendered
      setTimeout(() => {
        const element = document.getElementById('open-positions');
        if (element) {
          const yOffset = -80; // Offset for fixed header if any
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash]);

  const workTypes = [
    {
      title: "In-House SaaS Products",
      description: "Work on tools and products which we've built and sell directly to users.",
      icon: Code
    },
    {
      title: "White-Label Services",
      description: "Build custom solutions around our SaaS apps, branded for our clients.",
      icon: Building2
    },
    {
      title: "Client Service Projects",
      description: "Dive into a range of projects from freelance-style builds to long-term retainers, working with clients across diverse industries.",
      icon: Users
    }
  ];

  const careerTracks = [
    {
      title: "CT Track",
      description: "Focus on hands-on coding and building scalable solutions.",
      icon: Code,
      subtitle: "Technical Excellence"
    },
    {
      title: "OT Track",
      description: "Lead projects, work with clients, and help shape BitBash's future.",
      icon: TrendingUp,
      subtitle: "Operational Leadership"
    }
  ];

  const qualityCategories = [
    {
      title: "Technical Excellence",
      icon: Code,
      qualities: [
        {
          name: "Master Software Development & Coding",
          points: [
            "Strong foundation in writing clean, scalable code",
            "Efficient problem-solving techniques",
            "Ability to work with modern development tools",
            "Focus on long-term code maintainability",
            "Constantly learning and improving coding skills"
          ]
        },
        {
          name: "Contribute as a Solution Architect",
          points: [
            "Ability to design scalable, robust solutions",
            "Strong decision-making in technology choices",
            "Collaboration with teams to shape architecture",
            "Focus on aligning solutions with client needs",
            "Continuous improvement of solution design skills"
          ]
        },
        {
          name: "Follow PDLC Process Consistently",
          points: [
            "Adhering to the full Product Development Life Cycle process",
            "Ensuring each phase is thoroughly executed",
            "Staying aligned with project timelines and milestones",
            "Contributing to quality assurance at every stage",
            "Continuously improving understanding of PDLC"
          ]
        },
        {
          name: "Provide Support and Maintenance",
          points: [
            "Taking responsibility for post-launch support",
            "Troubleshooting issues and delivering timely resolutions",
            "Building long-term relationships with clients",
            "Keeping past projects up-to-date and optimal",
            "Ensuring smooth transitions for ongoing needs"
          ]
        }
      ]
    },
    {
      title: "Project Management",
      icon: Target,
      qualities: [
        {
          name: "Deliver Work Within Deadlines",
          points: [
            "Effective time management and prioritization",
            "Clear estimation of project timelines",
            "Focus on meeting client expectations",
            "Ability to balance speed with quality",
            "Accountability for timely project delivery"
          ]
        },
        {
          name: "Estimate & Price Features and Projects",
          points: [
            "Accurate project scope definition",
            "Understanding of cost-effective development",
            "Ability to break down features into tasks",
            "Clear communication of timelines and budgets",
            "Strategic thinking for pricing and scope"
          ]
        },
        {
          name: "Project Development Plans and Reviews",
          points: [
            "Ability to create comprehensive development plans",
            "Regularly reviewing progress for alignment",
            "Identifying risks and mitigation strategies",
            "Iterative feedback loops for improvement",
            "Ensuring projects are on track and on budget"
          ]
        },
        {
          name: "Oversee Project Transfer and Handover",
          points: [
            "Structured approach to project handover",
            "Clear documentation of status and deliverables",
            "Smooth transfer of knowledge",
            "Ensuring continuity and avoiding disruptions",
            "Effective communication during transitions"
          ]
        }
      ]
    },
    {
      title: "Client Relations",
      icon: MessageCircle,
      qualities: [
        {
          name: "Client Communication",
          points: [
            "Clear and professional communication",
            "Ability to translate technical concepts",
            "Regular updates and transparent reporting",
            "Active listening to understand needs",
            "Building strong client relationships"
          ]
        },
        {
          name: "Lead Client Calls",
          points: [
            "Confidence in leading meetings and demos",
            "Strong presentation and communication skills",
            "Ability to manage client expectations",
            "Problem-solving during escalations",
            "Expertise in delivering value during sprints"
          ]
        },
        {
          name: "Participate in Sales Calls",
          points: [
            "Understanding technical solutions alignment",
            "Ability to present to non-technical clients",
            "Effective communication of features",
            "Collaboration with sales team",
            "Building trust with prospective clients"
          ]
        },
        {
          name: "Deliver Sales Demos",
          points: [
            "Demonstrating solutions compellingly",
            "Tailoring demos to client requirements",
            "Communicating features engagingly",
            "Building confidence in functionality",
            "Continuous improvement of demo skills"
          ]
        },
        {
          name: "Lead Project & Client Onboarding",
          points: [
            "Structured onboarding approach",
            "Clear documentation of project scope",
            "Establishing strong initial relationships",
            "Effective planning and resource allocation",
            "Smooth transition from sales to development"
          ]
        },
        {
          name: "Manage Payment-Related Client Calls",
          points: [
            "Confidence in discussing budgets",
            "Clear communication of payment terms",
            "Handling financial discussions professionally",
            "Ensuring transparency in costs",
            "Problem-solving for billing discrepancies"
          ]
        },
        {
          name: "Identify Upselling Opportunities",
          points: [
            "Spotting client needs for upsells",
            "Proactively suggesting additional services",
            "Effective communication of value",
            "Building trust to expand scope",
            "Knowledge of available services"
          ]
        },
        {
          name: "Suggest New Service Offerings",
          points: [
            "Assessing client pain points",
            "Creative thinking for new solutions",
            "Strong understanding of technologies",
            "Proactively proposing innovative ideas",
            "Building long-term relationships"
          ]
        }
      ]
    },
    {
      title: "Team & Leadership",
      icon: Users,
      qualities: [
        {
          name: "Demonstrate Full Empowerment",
          points: [
            "Taking ownership of responsibilities",
            "Confidence in making decisions",
            "Self-motivated and proactive",
            "Taking initiative to improve processes",
            "Embracing a leadership mindset"
          ]
        },
        {
          name: "Adhere to Team Communication Standards",
          points: [
            "Consistent, clear communication",
            "Following established channels",
            "Ensuring transparency and openness",
            "Encouraging feedback and collaboration",
            "Fostering a positive team environment"
          ]
        },
        {
          name: "Maintain Meeting Etiquette",
          points: [
            "Punctuality and preparedness",
            "Clear, constructive communication",
            "Respect for others' time",
            "Active participation in discussions",
            "Setting and respecting agendas"
          ]
        },
        {
          name: "Follow Bashlog Reporting Practices",
          points: [
            "Adhering to reporting frameworks",
            "Accurately documenting progress",
            "Ensuring team alignment",
            "Using Bashlog effectively",
            "Providing clear, concise updates"
          ]
        },
        {
          name: "Deep Work Focus and Execution",
          points: [
            "Managing distractions effectively",
            "Commitment to high-quality code",
            "Effective time blocking",
            "Delivering results with minimal supervision",
            "Consistently exceeding expectations"
          ]
        },
        {
          name: "Join Weekly GTD Review Sessions",
          points: [
            "Actively participating in GTD sessions",
            "Learning efficient task management",
            "Collaborating to refine workflows",
            "Sharing insights and best practices",
            "Continuously improving work habits"
          ]
        },
        {
          name: "Contribute to Project Archiving",
          points: [
            "Thorough documentation of projects",
            "Organizing detailed project records",
            "Contributing to knowledge base",
            "Streamlining project handovers",
            "Improving project tracking processes"
          ]
        },
        {
          name: "Conduct PMD Performance Reviews",
          points: [
            "Actively participating in reviews",
            "Providing constructive feedback",
            "Setting clear performance goals",
            "Identifying growth areas",
            "Contributing to team improvement"
          ]
        },
        {
          name: "Lead Technical Interviews",
          points: [
            "Participating in interview process",
            "Evaluating technical skills and fit",
            "Asking insightful questions",
            "Providing clear, fair feedback",
            "Building a strong, capable team"
          ]
        },
        {
          name: "Be Part of Candidate Review System",
          points: [
            "Evaluating technical talent effectively",
            "In-depth understanding of developer qualities",
            "Providing constructive feedback",
            "Enhancing recruitment process",
            "Improving hiring and evaluation skills"
          ]
        }
      ]
    },
    {
      title: "Business & Growth",
      icon: BarChart3,
      qualities: [
        {
          name: "Participate in 3-Month Referral Challenge",
          points: [
            "Actively engaging in team-building",
            "Motivating peers to participate",
            "Contributing to collaborative culture",
            "Supporting Bitbash's growth",
            "Striving to achieve goals"
          ]
        },
        {
          name: "Sales Team Process Reviews",
          points: [
            "Assessing and optimizing processes",
            "Collaborating with sales team",
            "Providing technical insights",
            "Ensuring sales-development alignment",
            "Contributing to sales strategies"
          ]
        },
        {
          name: "Contribute to Company Thought Leadership",
          points: [
            "Contributing valuable insights",
            "Sharing knowledge through blogs and talks",
            "Engaging with external communities",
            "Driving innovation within company",
            "Positioning Bitbash as a leader"
          ]
        },
        {
          name: "Help Design and Refine Internal Playbooks",
          points: [
            "Contributing to playbooks and SOPs",
            "Streamlining workflows",
            "Ensuring clear documentation",
            "Driving best practices",
            "Continuously updating SOPs"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Careers - Join BitBash | BitBash"
        description="Join the BitBash team to help people get more value from automation and web data. Explore open positions and build amazing software solutions."
        canonical="/careers"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-4 sm:pt-32 sm:pb-8 overflow-hidden">
        <HeroBackground />
        <div className="container-responsive relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-4 leading-tight">
              Careers at BitBash
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
              Join the BitBash team to help people get more value from automation and web data.
            </p>
            <div className="px-4">
              <a
                href="#open-positions"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('open-positions');
                  if (element) {
                    const yOffset = -80;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                    // Update URL without triggering scroll
                    window.history.pushState(null, '', '#open-positions');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl min-h-[44px]"
              >
                View open positions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Developer Team Section */}
      <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
        <div className="container-responsive">
          <div className="px-4 sm:px-0">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-lg p-5 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Join Our Team at BitBash – Where Growth Meets Innovation
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                At BitBash, we specialize in automation projects and building systems that drive innovation. Whether you're into coding or business, join us to contribute to impactful products and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - Three Types */}
      <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
        <div className="container-responsive">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 sm:mb-12 md:mb-16 tracking-tight px-2">
              Here's How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {workTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-lg p-5 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <type.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                    {type.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Career Tracks */}
      <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
        <div className="container-responsive">
          <div className="px-4 sm:px-0">
            <div className="text-center mb-8 sm:mb-12 md:mb-16 px-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                Developer Career Tracks
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At BitBash, we offer two clear career tracks for developers with clear milestones and key achievements on your path to growth, ensuring you have the right tools and support to succeed at every step.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {careerTracks.map((track, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-lg p-5 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                    <track.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {track.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-purple-600 font-semibold mb-3 sm:mb-4">
                    {track.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                    {track.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BitBash & How We Work Sections - KEEP THESE */}
      <section className="pt-4 pb-12 sm:pt-8 sm:pb-16 md:pb-20 lg:pb-24 bg-white">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-12 px-4 sm:px-0">
            {/* Why Choose BitBash Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto border border-gray-200 rounded-2xl overflow-hidden h-full">
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  Why choose BitBash?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  The BitBash platform helps individuals, startups, and the world's largest companies
                  automate workflows, extract data from the web, and build full-stack applications.
                  As the generative AI revolution accelerates, the need for high-quality automation
                  and web data solutions is exploding.
                </p>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px]">
                <div className="h-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src="/team Large.png"
                    alt="BitBash Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* How We Work Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch max-w-6xl mx-auto border border-gray-200 rounded-2xl overflow-hidden h-full">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[250px] order-1 lg:order-1">
                <div className="h-full overflow-hidden shadow-xl bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src="/silent-zone Large.png"
                    alt="BitBash Office / Work Environment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 order-2 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                  How we work
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  We're builders at heart. At BitBash, we value ownership, move fast, and believe in
                  forgiveness rather than permission. We keep things transparent, friendly, and fun.
                  We work remotely, collaborate asynchronously, and trust our team to deliver great
                  software that makes a real impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <OurValues />

      {/* Benefits Section */}
      <Benefits />

      {/* Qualities You'll Develop Section */}
      <section className="pt-6 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-24 bg-white">
        <div className="container-responsive">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 sm:mb-12 md:mb-16 tracking-tight px-2">
              Qualities You'll Develop at BitBash
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
              {qualityCategories.map((category, categoryIndex) => (
                category.qualities.map((quality, qualityIndex) => (
                  <div
                    key={`${categoryIndex}-${qualityIndex}`}
                    className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-lg p-5 sm:p-6 md:p-8 lg:p-10 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                      <category.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight break-words">
                      {quality.name}
                    </h3>
                  </div>
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                Open Positions
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Explore opportunities to join our growing team
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-200 shadow-sm">
              <div className="text-center">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-5 sm:mb-6 leading-relaxed">
                  We're currently building our careers page. Check back soon for open positions!
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium min-h-[44px] text-sm sm:text-base"
                >
                  Get in Touch
                  <Rocket className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isHomepage={false} />
    </div>
  );
};

export default Careers;
