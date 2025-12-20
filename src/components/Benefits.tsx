import React from 'react';
import { Sparkles, Heart, Rocket, GraduationCap, Gift } from 'lucide-react';

const benefits = [
    {
        icon: Sparkles,
        title: "Competitive compensation & equity",
        description: "We offer competitive salaries that reflect your expertise in full-stack development, AI solutions, and automation engineering. Performance bonuses and equity participation ensure you share in BitBash's growth as we scale our software development agency."
    },
    {
        icon: Heart,
        title: "Work-life balance",
        description: "We believe in sustainable productivity. Generous paid time off, flexible vacation policies, and no micromanagement. Focus on delivering exceptional web development, data scraping, and AI automation projects while maintaining a healthy work-life balance."
    },
    {
        icon: Rocket,
        title: "Impactful projects & growth",
        description: "Work on meaningful projects ranging from SaaS MVP development to enterprise automation solutions. Help startups launch products and Fortune 500 companies streamline operations with AI-powered automation and modern web applications."
    },
    {
        icon: GraduationCap,
        title: "Continuous learning & development",
        description: "Stay ahead in AI, machine learning, and automation technologies. We invest in your growth with learning budgets, conference attendance, certifications, and access to the latest tools and frameworks in full-stack development and data engineering."
    },
    {
        icon: Gift,
        title: "Monthly lunches and bonuses",
        description: "Enjoy monthly team lunches to connect with colleagues and celebrate our shared success. We also offer performance bonuses and recognition rewards to acknowledge your contributions to our software development projects and team achievements."
    }
];

export const Benefits = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits at BitBash</h2>
                    <p className="text-lg text-gray-600">
                        Join a software development agency that values your growth, work-life balance, and impact. Build cutting-edge AI solutions, automation systems, and full-stack applications with the best tools and support at BitBash.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-7xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-col items-start text-left">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                                <benefit.icon size={24} strokeWidth={2} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
