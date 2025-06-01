import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';
import { NewsArticle, NewsResponse } from '../services/newsService';
import { fetchTopHeadlines } from '../services/newsService';

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response: NewsResponse = await fetchTopHeadlines();
        setArticles(response.articles);
        setLoading(false);
      } catch {
        setError('Failed to fetch news articles. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Layout>
      <SEO 
        title="Global Scholarships - Latest News and Updates"
        description="Discover the latest news and updates about scholarships, education, and academic opportunities worldwide."
        keywords="scholarships, education news, academic updates, global education"
      />
      <Hero isDarkMode={isDarkMode} />
      <NewsSection articles={articles} loading={loading} error={error} />
    </Layout>
  );
};

export default Home;
