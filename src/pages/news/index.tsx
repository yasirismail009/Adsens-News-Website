import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import SEO from '@/components/SEO';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

const NewsPage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchNews = async (retryCount = 0) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        
        if (!apiUrl || !apiKey) {
          throw new Error('News API configuration is missing');
        }

        const response = await axios.get(`${apiUrl}/everything`, {
          params: {
            q: 'scholarships education',
            apiKey: apiKey,
            language: 'en',
            sortBy: 'publishedAt'
          },
          timeout: 10000 // 10 second timeout
        });
        
        if (!response.data || !Array.isArray(response.data.articles)) {
          throw new Error('Invalid response format from News API');
        }

        const newsData = response.data.articles;
        setArticles(newsData);
        // Store articles in localStorage for offline access
        localStorage.setItem('newsArticles', JSON.stringify(newsData));
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching news:', err);
        
        // Retry logic for network errors
        if (retryCount < 3 && axios.isAxiosError(err) && !err.response) {
          console.log(`Retrying... Attempt ${retryCount + 1} of 3`);
          setTimeout(() => fetchNews(retryCount + 1), 1000 * (retryCount + 1));
          return;
        }

        // Set appropriate error message based on error type
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Invalid API key. Please check your configuration.');
          } else if (err.response?.status === 429) {
            setError('API rate limit exceeded. Please try again later.');
          } else {
            setError('Failed to fetch news articles. Please try again later.');
          }
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        if (retryCount === 0) { // Only set loading to false on initial attempt
          setLoading(false);
        }
      }
    };

    fetchNews();
  }, []);

  const handleArticleClick = (article: NewsArticle) => {
    // Store the article data in router state
    const encodedArticle = encodeURIComponent(JSON.stringify(article));
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodedArticle }
    });
  };

  return (
    <>
      <SEO
        title="Latest News - Global Scholarships"
        description="Stay updated with the latest news and developments in scholarships, education, and academic opportunities worldwide."
        keywords="scholarship news, education updates, academic news, global education"
        ogType="website"
      />
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen py-8 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Latest News
            </h1>

            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 p-4">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-md overflow-hidden cursor-pointer transition-colors duration-200 ${
                      isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleArticleClick(article)}
                  >
                    {article.urlToImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={article.urlToImage}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h2 className={`text-xl font-semibold mb-2 line-clamp-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {article.title}
                      </h2>
                      <p className={`mb-4 line-clamp-3 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {article.description}
                      </p>
                      <div className={`flex justify-between items-center text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>{article.source.name}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewsPage; 