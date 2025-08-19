import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            toast({
                title: "Request Submitted!",
                description: "We'll get back to you within 24 hours.",
            });
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero section */}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <div className="bg-yellow-400 p-4 rounded-full animate-bounce">
                                <Zap className="h-12 w-12 text-blue-900" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Ready to power your next project? Contact us for a free consultation
                            and discover how we can bring your electrical vision to life.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Request a Quote</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="(254) 123-4567"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Service Needed
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select a service...</option>
                                        <option value="residential">Residential Electrical</option>
                                        <option value="commercial">Commercial Projects</option>
                                        <option value="industrial">Industrial Solutions</option>
                                        <option value="emergency">Emergency Repairs</option>
                                        <option value="inspection">Safety Inspections</option>
                                        <option value="maintenance">Maintenance Services</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Details *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Please describe your project requirements, timeline, and any specific needs..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Send Request
                                            <Send className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Contact information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <Phone className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                            <p className="text-gray-600">+254 714 712424</p>
                                            <p className="text-sm text-gray-500">24/7 Emergency Hotline</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <Mail className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                            <p className="text-gray-600">henkemelectricalworks@gmail.com</p>
                                            <p className="text-sm text-gray-500">We reply within 24 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-100 p-3 rounded-lg">
                                            <MapPin className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                            <p className="text-gray-600">30100 Eldoret<br />Eldoret, Kenya</p>
                                            <p className="text-sm text-gray-500">Serving the entire metro area</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-100 p-3 rounded-lg">
                                            <Clock className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Mon-Sun: Open 24 hours
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white animate-scale-in" style={{ animationDelay: '0.2s' }}>
                                <h3 className="text-2xl font-bold mb-4">Why Choose ElectricPro?</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        Licensed & fully insured professionals
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        Free estimates and competitive pricing
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        24/7 emergency service availability
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        10+ years of experience
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                        100% satisfaction guarantee
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
