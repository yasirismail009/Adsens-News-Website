import React, { useEffect, useState } from 'react';
import { fetchTopHeadlines, NewsArticle } from '../services/newsService';
import { useTheme } from '../contexts/ThemeContext';

const NewsSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetchTopHeadlines();
        setArticles(response.articles);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news articles');
        setLoading(false);
      }
    };

    loadNews();
  }, []);

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
              className={`rounded-lg shadow-md overflow-hidden transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-white'
              }`}
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:underline ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    {article.title}
                  </a>
                </h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {article.description?.substring(0, 150)}...
                </p>
                <div className={`flex justify-between items-center text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>{article.source.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            )          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 