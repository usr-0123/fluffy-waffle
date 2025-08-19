import { getIconComponent } from '@/lib/predefinedIcons';
import { ContentItem } from '@/hooks/useContentData';

interface ServiceDetailHeaderProps {
    service: ContentItem;
}

const ServiceDetailHeader = ({ service }: ServiceDetailHeaderProps) => {
    const IconComponent = getIconComponent(service.iconId || 'home');

    return (
        <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {service.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {service.description}
            </p>
        </div>
    );
};

export default ServiceDetailHeader;
