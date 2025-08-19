
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-48 h-48 bg-blue-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-lg animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="text-center">
                    <AnimatedSection animation="scale-in" delay={200}>
                        <div className="flex justify-center mb-8">
                            <div className="bg-yellow-400 p-4 rounded-full animate-bounce hover:animate-none hover:scale-110 transition-transform duration-300">
                                <Zap className="h-12 w-12 text-blue-900" />
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={400}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Powering Your
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Future
              </span>
                        </h1>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={600}>
                        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Professional electrical construction services with cutting-edge technology.
                            We illuminate possibilities and energize your projects.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={800}>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                            <Link
                                to="/contact"
                                className="group bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 flex items-center"
                            >
                                Get Free Quote
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>

                            <Link
                                to="/view-our-work"
                                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-white/25"
                            >
                                View Our Work
                            </Link>
                        </div>
                    </AnimatedSection>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: Shield, title: "Licensed & Insured", desc: "Fully certified professionals" },
                            { icon: Clock, title: "24/7 Emergency", desc: "Round-the-clock support" },
                            { icon: Zap, title: "Modern Solutions", desc: "Latest electrical technology" }
                        ].map((feature, index) => (
                            <AnimatedSection
                                key={index}
                                animation="fade-up"
                                delay={1000 + (index * 200)}
                            >
                                <div className="text-center group hover:scale-105 transition-all duration-500 cursor-pointer">
                                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-xl">
                                        <feature.icon className="h-8 w-8 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-300 transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-blue-200 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <AnimatedSection animation="fade-in" delay={1600}>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:animate-none transition-all duration-300">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center hover:border-yellow-400 transition-colors duration-300">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse hover:bg-yellow-400 transition-colors duration-300"></div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

export default Hero;