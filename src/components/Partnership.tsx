
import { Shield, Award, Zap, Building, CheckCircle, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Partnership = () => {
    const partnerships = [
        {
            icon: Shield,
            name: "Licensed Contractor",
            description: "State Licensed & Bonded",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Award,
            name: "Safety Certified",
            description: "OSHA Compliant",
            color: "from-green-500 to-green-600"
        },
        {
            icon: Zap,
            name: "Master Electrician",
            description: "Certified Professional",
            color: "from-yellow-500 to-yellow-600"
        },
        {
            icon: Building,
            name: "Commercial Partner",
            description: "Trusted by Businesses",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: CheckCircle,
            name: "Quality Assured",
            description: "100% Satisfaction",
            color: "from-teal-500 to-teal-600"
        },
        {
            icon: Star,
            name: "Top Rated",
            description: "5-Star Service",
            color: "from-orange-500 to-orange-600"
        }
    ];

    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection animation="fade-up" className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Trusted Partners & Certifications
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We maintain the highest standards through our partnerships and certifications
                    </p>
                </AnimatedSection>

                {/* Animated sliding brands */}
                <AnimatedSection animation="fade-in" delay={300}>
                    <div className="relative">
                        <div className="flex animate-slide-brands space-x-8 mb-8 hover:animation-play-state-paused">
                            {[...partnerships, ...partnerships].map((partner, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 group hover:scale-110 transition-all duration-500 cursor-pointer"
                                >
                                    <div className={`w-32 h-32 bg-gradient-to-r ${partner.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:rotate-3 transition-all duration-500`}>
                                        <partner.icon className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300">{partner.name}</h3>
                                        <p className="text-xs text-gray-600">{partner.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                    {[
                        { number: "500+", label: "Projects Completed" },
                        { number: "15+", label: "Years Experience" },
                        { number: "100%", label: "Safety Record" },
                        { number: "24/7", label: "Emergency Service" }
                    ].map((stat, index) => (
                        <AnimatedSection
                            key={index}
                            animation="fade-up"
                            delay={500 + (index * 100)}
                            className="text-center group hover:scale-105 transition-transform duration-500 cursor-default"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>
                            <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">{stat.label}</p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partnership;