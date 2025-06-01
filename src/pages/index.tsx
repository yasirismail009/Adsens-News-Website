import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SEO from '@/components/SEO';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import { useTheme } from '../contexts/ThemeContext';

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

const HomePage = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news?q=scholarships education');
        const newsData = response.data.articles;
        setArticles(newsData);
        // Store articles in localStorage for offline access
        localStorage.setItem('newsArticles', JSON.stringify(newsData));
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news articles');
      } finally {
        setLoading(false);
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
        title="Global Scholarships - Latest News and Updates"
        description="Discover the latest news and updates about scholarships, education, and academic opportunities worldwide. Stay informed about funding opportunities and educational developments."
        keywords="scholarships, education news, academic updates, global education, funding opportunities"
        ogType="website"
      />
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-6xl">
            <Hero isDarkMode={isDarkMode} />
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm rounded-md overflow-hidden transition-colors duration-200`}>
              <NewsSection />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
