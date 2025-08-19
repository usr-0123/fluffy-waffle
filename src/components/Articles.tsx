
import { useContentData } from '@/hooks/useContentData';

const Articles = () => {
    const { data: articles, loading, error } = useContentData('article');

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading articles...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">Error loading articles: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Latest Articles
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Stay updated with industry insights, electrical safety tips, and latest trends in electrical services.
                    </p>
                </div>

                {articles.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600">No articles available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.slice(0, 6).map((article, index) => (
                            <div
                                key={article.id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {article.imageUrl && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {article.category && (
                                            <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-600">
                          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                        </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {article.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {article.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                                        <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Articles;