import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Filter, Grid, List } from 'lucide-react';

const ViewOurWork = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const projects = [
        {
            id: 1,
            title: "Modern Office Complex",
            category: "commercial",
            image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop",
            description: "Complete electrical system for 50,000 sq ft office building with energy-efficient LED lighting and smart automation systems.",
            location: "Nairobi, Kenya",
            duration: "3 months",
            teamSize: "8 technicians",
            budget: "$125,000",
            year: "2024",
            client: "Corporate Solutions Ltd"
        },
        {
            id: 2,
            title: "Smart Home Installation",
            category: "residential",
            image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=500&fit=crop",
            description: "Automated lighting and electrical system for luxury residence featuring climate control integration and home entertainment systems.",
            location: "Karen, Nairobi",
            duration: "6 weeks",
            teamSize: "4 technicians",
            budget: "$85,000",
            year: "2024",
            client: "Private Residence"
        },
        {
            id: 3,
            title: "Industrial Plant Upgrade",
            category: "industrial",
            image: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&h=500&fit=crop",
            description: "High-voltage electrical infrastructure for manufacturing facility including motor control centers and automation equipment.",
            location: "Thika, Kenya",
            duration: "4 months",
            teamSize: "12 technicians",
            budget: "$300,000",
            year: "2023",
            client: "Manufacturing Corp"
        },
        {
            id: 4,
            title: "Retail Shopping Center",
            category: "commercial",
            image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=500&fit=crop",
            description: "Energy-efficient lighting system for multi-tenant retail space with individual tenant electrical services.",
            location: "Westlands, Nairobi",
            duration: "2 months",
            teamSize: "6 technicians",
            budget: "$95,000",
            year: "2024",
            client: "Retail Holdings"
        },
        {
            id: 5,
            title: "Luxury Residential Complex",
            category: "residential",
            image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=800&h=500&fit=crop",
            description: "Premium electrical installation for high-end apartment complex with smart home pre-wiring and amenity systems.",
            location: "Kilimani, Nairobi",
            duration: "5 months",
            teamSize: "10 technicians",
            budget: "$200,000",
            year: "2023",
            client: "Luxury Developments"
        },
        {
            id: 6,
            title: "Data Center Infrastructure",
            category: "industrial",
            image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800&h=500&fit=crop",
            description: "Critical power systems for enterprise data center with redundant power distribution and UPS systems.",
            location: "Ruaraka, Nairobi",
            duration: "6 months",
            teamSize: "15 technicians",
            budget: "$500,000",
            year: "2023",
            client: "Tech Solutions Inc"
        },
        {
            id: 7,
            title: "Hospital Emergency Systems",
            category: "commercial",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&h=500&fit=crop",
            description: "Critical electrical infrastructure for hospital including emergency power systems and medical equipment support.",
            location: "Mombasa, Kenya",
            duration: "8 months",
            teamSize: "20 technicians",
            budget: "$400,000",
            year: "2022",
            client: "Regional Medical Center"
        },
        {
            id: 8,
            title: "Educational Institution Wiring",
            category: "commercial",
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800&h=500&fit=crop",
            description: "Complete electrical installation for new university campus including lecture halls, labs, and dormitories.",
            location: "Kisumu, Kenya",
            duration: "10 months",
            teamSize: "25 technicians",
            budget: "$600,000",
            year: "2022",
            client: "University of Excellence"
        }
    ];

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'residential', label: 'Residential' },
        { key: 'commercial', label: 'Commercial' },
        { key: 'industrial', label: 'Industrial' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
                <div
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  project.category === 'residential' ? 'bg-green-500' :
                      project.category === 'commercial' ? 'bg-blue-500' : 'bg-orange-500'
              }`}>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-900">
                            {project.year}
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="h-3 w-3 mr-2" />
                                {project.location}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-2" />
                                {project.duration}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                                <Users className="h-3 w-3 mr-2" />
                                {project.teamSize}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">{project.budget}</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const ListView = () => (
        <div className="space-y-6">
            {filteredProjects.map((project, index) => (
                <div
                    key={project.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/3 h-64 lg:h-auto">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none"
                            />
                        </div>

                        <div className="lg:w-2/3 p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      project.category === 'residential' ? 'bg-green-500' :
                          project.category === 'commercial' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                                    <span className="text-sm text-gray-500">{project.year}</span>
                                </div>
                                <span className="text-xl font-bold text-blue-600">{project.budget}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {project.location}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {project.duration}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Users className="h-4 w-4 mr-2" />
                                    {project.teamSize}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Client: {project.client}
                                </div>
                            </div>

                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                View Full Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Navigation */}
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        View Our Work
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Explore our comprehensive portfolio of successful electrical installations across Kenya.
                        From residential homes to industrial complexes, see how we deliver excellence in every project.
                    </p>

                    {/* Project Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}+</div>
                            <div className="text-gray-600 font-medium">Projects Completed</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                            <div className="text-gray-600 font-medium">Happy Clients</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                            <div className="text-gray-600 font-medium">Success Rate</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg">
                            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                            <div className="text-gray-600 font-medium">Support Available</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
                    {/* Filter buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                        <Filter className="h-5 w-5 text-gray-500 mt-1 mr-2" />
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                    activeFilter === filter.key
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-md">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors duration-200 ${
                                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors duration-200 ${
                                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredProjects.length}</span> projects
                        {activeFilter !== 'all' && (
                            <span> in <span className="font-semibold">{activeFilter}</span> category</span>
                        )}
                    </p>
                </div>

                {/* Projects Display */}
                {viewMode === 'grid' ? <GridView /> : <ListView />}

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                        <p className="text-lg mb-6 opacity-90">
                            Join our satisfied clients and experience the HenKem Kenya difference.
                            Let's discuss your electrical needs today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                                    Get Free Estimate
                                </button>
                            </Link>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                                Call: +254 123 456 789
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOurWork;
