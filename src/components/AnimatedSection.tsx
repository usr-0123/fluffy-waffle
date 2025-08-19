
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right';
    delay?: number;
    threshold?: number;
}

const AnimatedSection = ({
                             children,
                             className,
                             animation = 'fade-up',
                             delay = 0,
                             threshold = 0.1
                         }: AnimatedSectionProps) => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold });

    const animationClasses = {
        'fade-up': 'translate-y-8 opacity-0',
        'fade-in': 'opacity-0',
        'scale-in': 'scale-95 opacity-0',
        'slide-in-left': '-translate-x-8 opacity-0',
        'slide-in-right': 'translate-x-8 opacity-0',
    };

    const visibleClasses = {
        'fade-up': 'translate-y-0 opacity-100',
        'fade-in': 'opacity-100',
        'scale-in': 'scale-100 opacity-100',
        'slide-in-left': 'translate-x-0 opacity-100',
        'slide-in-right': 'translate-x-0 opacity-100',
    };

    return (
        <div
            ref={elementRef}
            className={cn(
                'transition-all duration-700 ease-out',
                isVisible ? visibleClasses[animation] : animationClasses[animation],
                className
            )}
            style={{
                transitionDelay: isVisible ? `${delay}ms` : '0ms',
            }}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;