import { Button } from "./ui/button";

interface LearnMoreButtonProps {
    onClick?: () => void;
    className?: string;
}

const LearnMoreButton = ({ onClick, className = "" }: LearnMoreButtonProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Default behavior - could navigate to a services detail page
            console.log("Learn more clicked");
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className={`text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 p-0 h-auto ${className}`}
        >
            Learn More →
        </Button>
    );
};

export default LearnMoreButton;
