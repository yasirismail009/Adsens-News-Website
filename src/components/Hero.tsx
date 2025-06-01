import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const router = useRouter();
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
          // Store articles in localStorage
          localStorage.setItem('newsArticles', JSON.stringify(data.articles));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleArticleClick = (article: NewsArticle) => {
    // Create a unique ID from the article URL
    const articleId = Buffer.from(article.url).toString('base64');
    // Pass article data through router state
    const articleData = encodeURIComponent(JSON.stringify(article));
    router.push({
      pathname: `/news/${articleId}`,
      query: { article: articleData }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 w-full rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {mainArticle && (
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => handleArticleClick(mainArticle)}
        >
          <div className={`relative h-[400px] rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            {mainArticle.urlToImage && (
              <img
                src={mainArticle.urlToImage}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {mainArticle.title}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                {mainArticle.description}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-300">
                <span>{mainArticle.source.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(mainArticle.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 gap-4">
        {secondaryArticles.map((article, index) => (
          <div 
            key={index}
            className={`cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
            onClick={() => handleArticleClick(article)}
          >
            <div className="flex h-32">
              {article.urlToImage && (
                <div className="w-1/3">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {article.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.source.name}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero; 