
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ContentItem } from '@/hooks/useContentData';

interface ServiceDetailCTAProps {
    service: ContentItem;
}

const ServiceDetailCTA = ({ service }: ServiceDetailCTAProps) => {
    return (
        <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                <p className="text-gray-600 mb-6">
                    Contact us today for a free consultation and estimate for your {service.title.toLowerCase()} needs.
                </p>
                <Link to="/contact">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        Get Free Estimate
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetailCTA;