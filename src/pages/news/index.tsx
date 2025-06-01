import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function NewsPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('bitcoin');
  const [inputValue, setInputValue] = useState('bitcoin');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const url = searchQuery.trim() 
          ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=313971675a154a8f997840d98c7ebdf7`
          : `https://newsapi.org/v2/everything?apiKey=313971675a154a8f997840d98c7ebdf7`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }
        
        const data = await response.json();
        setArticles(data.articles);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setSearchQuery(inputValue);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading news articles...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className={`mt-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-xs py-1.5 px-4 rounded-sm transition-colors`}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  const handleArticleClick = (article: NewsArticle) => {
    // Store the article data in router state
    const encodedArticle = encodeURIComponent(JSON.stringify(article));
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodedArticle }
    });
  };

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Latest News</h1>
          </div>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                name="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => setSearchQuery(inputValue)}
                placeholder="Search news..."
                className={`flex-1 px-4 py-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                } transition-colors`}
              >
                Search
              </button>
            </div>
          </form>

          <div className="mb-4">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="underline">News API</a>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-md overflow-hidden transition-colors duration-200`}
              >
                {article.urlToImage && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {article.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {article.source.name}
                    </span>
                    <span className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleArticleClick(article)}
                    className={`mt-4 inline-block ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-800'
                    } text-sm font-medium transition-colors`}
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {articles.length === 0 && (
            <div className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-md shadow-sm p-6 text-center transition-colors duration-200`}>
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              } mb-2`}>
                No articles found
              </h3>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } mb-4 text-sm`}>
                Try adjusting your search query
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 