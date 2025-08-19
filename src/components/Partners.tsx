
import { useContentData } from '@/hooks/useContentData';
import { ExternalLink } from 'lucide-react';

const Partners = () => {
    const { data: partners, loading, error } = useContentData('partner');

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading partners...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">Error loading partners: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Trusted Partners
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We collaborate with industry-leading companies to deliver exceptional electrical solutions and services.
                    </p>
                </div>

                {partners.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">No partners to display at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {partners.map((partner, index) => (
                            <div
                                key={partner.id}
                                className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-lg transition-all duration-300 animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {partner.imageUrl && (
                                    <div className="mb-6">
                                        <img
                                            src={partner.imageUrl}
                                            alt={partner.title}
                                            className="w-20 h-20 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {partner.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4">
                                    {partner.description}
                                </p>

                                {partner.partnershipType && (
                                    <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {partner.partnershipType.charAt(0).toUpperCase() + partner.partnershipType.slice(1)}
                    </span>
                                    </div>
                                )}

                                {partner.website && (
                                    <a
                                        href={partner.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 text-sm font-semibold"
                                    >
                                        Visit Website
                                        <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Partners;