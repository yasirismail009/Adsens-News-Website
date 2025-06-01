import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  url: string;
}

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const [mainArticle, setMainArticle] = useState<NewsArticle | null>(null);
  const [secondaryArticles, setSecondaryArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=313971675a154a8f997840d98c7ebdf7');
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          setMainArticle(data.articles[0]);
          setSecondaryArticles(data.articles.slice(1, 4));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 w-full rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Main hero section - left */}
      <div className="md:w-2/3 relative">
        <div className={`relative h-64 md:h-96 rounded-md overflow-hidden ${isDarkMode ? 'shadow-lg shadow-gray-800' : 'shadow-md'}`}>
          {mainArticle?.urlToImage && (
            <Image
              src={mainArticle.urlToImage}
              alt={mainArticle.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                <span className="text-xs font-bold text-gray-800">
                  {mainArticle?.author?.[0] || 'N'}
                </span>
              </div>
              <span className="text-xs font-medium">{mainArticle?.author || 'News Staff'}</span>
              <span className="text-xs text-gray-300 ml-2">• {new Date(mainArticle?.publishedAt || '').toLocaleDateString()}</span>
            </div>
            
            <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">
              {mainArticle?.title || 'Loading...'}
            </h1>
            <p className="text-gray-200 mb-2 md:mb-3 text-xs md:text-sm line-clamp-2">
              {mainArticle?.description || 'Loading...'}
            </p>
            <div className="flex gap-3 items-center">
              <Link 
                href={mainArticle?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1.5 rounded text-xs font-medium transition-colors`}
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary stories - right */}
      <div className="md:w-1/3 space-y-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3 sm:gap-3 md:gap-0 md:space-y-3 mt-3 md:mt-0">
        {secondaryArticles.map((article, index) => (
          <div key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md overflow-hidden flex h-[110px] md:h-[120px] shadow-sm transition-colors duration-200`}>
            <div className="w-1/2 p-2 md:p-3">
              <span className="text-xs text-blue-500 font-medium">Latest News</span>
              <h3 className={`text-xs font-bold mt-1 mb-1 md:mb-2 line-clamp-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {article.title}
              </h3>
              <div className="flex items-center mt-auto">
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="w-1/2 relative">
              {article.urlToImage && (
                <Image 
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero; 