import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import { useContentData } from '@/hooks/useContentData';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { data: projects, loading, error } = useContentData('project');

    // Dynamically create filters based on available project categories
    const availableCategories = [...new Set(projects.map(p => p.category).filter(Boolean))];
    const filters = [
        { key: 'all', label: 'All Projects' },
        ...availableCategories.map(cat => ({
            key: cat!,
            label: cat!.charAt(0).toUpperCase() + cat!.slice(1)
        }))
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading projects...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>
                    <div className="text-center">
                        <p className="text-red-600">Error loading projects: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Featured Projects
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Explore our comprehensive portfolio of successful electrical installations across residential,
                        commercial, and industrial sectors throughout Kenya.
                    </p>

                    {/* Dynamic filter buttons */}
                    {filters.length > 1 && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {filters.map((filter) => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                                        activeFilter === filter.key
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">No projects available for this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Project Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={project.imageUrl || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=500&fit=crop"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        {project.category && (
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                                                project.category === 'residential' ? 'bg-green-500' :
                                                    project.category === 'commercial' ? 'bg-blue-500' : 'bg-orange-500'
                                            }`}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                                        )}
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                                    <p className="text-gray-600 mb-6">{project.description}</p>

                                    {/* Project Stats */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {project.location && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                {project.location}
                                            </div>
                                        )}
                                        {project.duration && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {project.duration}
                                            </div>
                                        )}
                                        {project.teamSize && (
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="h-4 w-4 mr-2" />
                                                {project.teamSize}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Project?</h2>
                        <p className="text-gray-600 mb-6">
                            Let us bring the same level of expertise and quality to your electrical project.
                        </p>
                        <Link to="/contact">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                Get Your Free Estimate
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
