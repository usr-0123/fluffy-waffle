
import { Mail, Phone, MapPin, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Company info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-gradient-to-r from-blue-600 to-yellow-500 p-2 rounded-lg">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                Henkem Kenya
              </span>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Your trusted partner for all electrical construction needs. We bring power,
                            reliability, and innovation to every project, ensuring safe and efficient
                            electrical solutions for homes, businesses, and industries.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social media or certification badges could go here */}
                            <div className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold">
                                Licensed & Bonded
                            </div>
                            <div className="bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold">
                                Insured
                            </div>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-yellow-400">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Portfolio
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-yellow-400">Contact Info</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300">+254 714 712424</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300">henkemelectricalworks@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300">Eldoret - 30100 Eldoret, Kenya</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 HenKem Kenya. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Terms of Service
                        </a>
                        <Link
                            to="/admin"
                            className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Shield className="h-4 w-4" />
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;