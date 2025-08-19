
import { Button } from "./ui/button";

interface ViewAllButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
}

const ViewAllButton = ({ text = "View All Projects", onClick, className = "" }: ViewAllButtonProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Default behavior - could navigate to a projects page
            console.log("View all clicked");
        }
    };

    return (
        <Button
            onClick={handleClick}
            className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${className}`}
        >
            {text}
        </Button>
    );
};

export default ViewAllButton;