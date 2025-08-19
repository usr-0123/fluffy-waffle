import { useNavigate } from 'react-router-dom';
import { useContentData } from '@/hooks/useContentData';
import { getIconComponent } from '@/lib/predefinedIcons';
import LearnMoreButton from './LearnMoreButton';
import AnimatedSection from './AnimatedSection';

const Services = () => {
    const navigate = useNavigate();
    const { data: services, loading, error } = useContentData('service');

    const handleLearnMore = (serviceId: string) => {
        navigate(`/service/${serviceId}`);
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading services...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">Error loading services: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Electrical Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From residential homes to industrial complexes, we deliver reliable electrical solutions
                        that power your world safely and efficiently.
                    </p>
                </AnimatedSection>

                {services.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">No services available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const IconComponent = getIconComponent(service.iconId || 'home');

                            return (
                                <AnimatedSection
                                    key={service.id}
                                    animation="fade-up"
                                    delay={index * 150}
                                >
                                    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-500">
                                            {service.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                                            {service.description}
                                        </p>

                                        {service.imageUrl && (
                                            <div className="mb-6 overflow-hidden rounded-lg">
                                                <img
                                                    src={service.imageUrl}
                                                    alt={service.title}
                                                    className="w-full h-32 object-cover rounded-lg group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                        )}

                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <LearnMoreButton onClick={() => handleLearnMore(service.id)} />
                                        </div>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;