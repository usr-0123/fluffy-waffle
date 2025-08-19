
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                HenKem Kenya
              </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <div className="flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                    isActive('/')
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/contact"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                    isActive('/contact')
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden animate-fade-in">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                    isActive('/')
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/view-our-work"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                    isActive('/view-our-work')
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                View Our Work
                            </Link>
                            <Link
                                to="/contact"
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                    isActive('/contact')
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;