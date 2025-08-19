
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContentData } from '@/hooks/useContentData';
import ViewAllButton from './ViewAllButton';
import AnimatedSection from './AnimatedSection';

const Gallery = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const { data: projects, loading, error } = useContentData('project');

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'residential', label: 'Residential' },
        { key: 'commercial', label: 'Commercial' },
        { key: 'industrial', label: 'Industrial' }
    ];

    // Dynamically create filters based on available project categories
    const availableCategories = [...new Set(projects.map(p => p.category).filter(Boolean))];
    const dynamicFilters = [
        { key: 'all', label: 'All Projects' },
        ...availableCategories.map(cat => ({
            key: cat!,
            label: cat!.charAt(0).toUpperCase() + cat!.slice(1)
        }))
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects.slice(0, 6)
        : projects.filter(project => project.category === activeFilter).slice(0, 6);

    const handleViewAllProjects = () => {
        navigate('/view-our-work');
    };

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading projects...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">Error loading projects: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Our Featured Projects
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Discover our portfolio of successful electrical installations across residential,
                        commercial, and industrial sectors.
                    </p>

                    {/* Dynamic filter buttons */}
                    {dynamicFilters.length > 1 && (
                        <AnimatedSection animation="fade-up" delay={200}>
                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                {dynamicFilters.map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => setActiveFilter(filter.key)}
                                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-lg ${
                                            activeFilter === filter.key
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-gray-200/50'
                                        }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </AnimatedSection>
                    )}
                </AnimatedSection>

                {/* Project grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">No projects available for this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <AnimatedSection
                                key={project.id}
                                animation="scale-in"
                                delay={index * 100}
                            >
                                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={project.imageUrl || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop"}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        {project.category && (
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 transition-all duration-300 ${
                                                project.category === 'residential' ? 'bg-green-500 group-hover:bg-green-400' :
                                                    project.category === 'commercial' ? 'bg-blue-500 group-hover:bg-blue-400' : 'bg-orange-500 group-hover:bg-orange-400'
                                            }`}>
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                                        )}
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">{project.title}</h3>
                                        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                )}

                <AnimatedSection animation="fade-up" delay={600} className="text-center mt-12">
                    <ViewAllButton onClick={handleViewAllProjects} />
                </AnimatedSection>
            </div>
        </section>
    );
};

export default Gallery;