
import { ContentItem } from '@/hooks/useContentData';

interface ServiceDetailImageProps {
    service: ContentItem;
}

const ServiceDetailImage = ({ service }: ServiceDetailImageProps) => {
    if (!service.imageUrl) {
        return null;
    }

    return (
        <div className="mb-12">
            <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
        </div>
    );
};

export default ServiceDetailImage;