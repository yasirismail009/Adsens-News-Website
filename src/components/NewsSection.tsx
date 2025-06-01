import React from 'react';
import { NewsArticle } from '../services/newsService';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface NewsSectionProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles, loading, error }) => {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleArticleClick = (article: NewsArticle) => {
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodeURIComponent(JSON.stringify(article)) }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Top Headlines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            index > 3 && (
              <div 
                key={index} 
                className={`rounded-lg shadow-md overflow-hidden transition-colors duration-200 cursor-pointer ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                }`}
                onClick={() => handleArticleClick(article)}
              >
                {article.multimedia && article.multimedia.length > 0 && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.multimedia[0].url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {article.multimedia[0].caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-black bg-opacity-50">
                        {article.multimedia[0].caption}
                        {article.multimedia[0].copyright && (
                          <span className="ml-2">© {article.multimedia[0].copyright}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  {article.kicker && (
                    <span className={`text-sm font-semibold text-yellow-500 mb-2 block ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                      {article.kicker}
                    </span>
                  )}
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {article.title}
                  </h3>
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {article.description?.substring(0, 150)}...
                  </p>
                  <div className="space-y-2">
                    <div className={`flex flex-wrap gap-2 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {article.geo_facet && article.geo_facet.length > 0 && (
                        <div className="flex items-center">
                          <span className="mr-1">📍</span>
                          {article.geo_facet.join(', ')}
                        </div>
                      )}
                      {article.per_facet && article.per_facet.length > 0 && (
                        <div className="flex items-center">
                          <span className="mr-1">👤</span>
                          {article.per_facet.join(', ')}
                        </div>
                      )}
                    </div>
                    <div className={`flex justify-between items-center text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span>{article.source}</span>
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 