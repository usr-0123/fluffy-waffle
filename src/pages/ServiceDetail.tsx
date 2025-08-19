import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useContentData } from '@/hooks/useContentData';
import ServiceDetailImage from '@/components/ServiceDetailImage';
import ServiceDetailContent from '@/components/ServiceDetailContent';
import ServiceDetailCTA from '@/components/ServiceDetailCTA';
import ServiceDetailHeader from "@/components/ServiceDetailsHeader";

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const { data: services, loading, error } = useContentData('service');

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading service details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Services
                    </Link>
                    <div className="text-center">
                        <p className="text-red-600">Error loading service: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const service = services.find(s => s.id === serviceId);

    if (!service) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Services
                </Link>

                {/* Service Header */}
                <ServiceDetailHeader service={service} />

                {/* Service Image */}
                <ServiceDetailImage service={service} />

                {/* Service Details */}
                <ServiceDetailContent service={service} />

                {/* Call to Action */}
                <ServiceDetailCTA service={service} />
            </div>
        </div>
    );
};

export default ServiceDetail;
