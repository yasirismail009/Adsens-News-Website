import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AdUnit from '@/components/AdUnit';
import CategoryFilter from '@/components/CategoryFilter';
import { fetchTopHeadlines, NewsArticle } from '@/services/newsService';

interface NYTArticleSearch {
  headline: {
    main: string;
    kicker?: string;
    print_headline?: string;
  };
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  multimedia?: {
    thumbnail?: {
      url: string;
      height: number;
      width: number;
    };
    caption?: string;
    credit?: string;
  };
  byline?: {
    original?: string;
  };
  section_name?: string;
  snippet?: string;
  keywords?: Array<{
    name: string;
    value: string;
    rank: number;
  }>;
  news_desk?: string;
  subsection_name?: string;
  type_of_material?: string;
  word_count?: number;
  document_type?: string;
  _id: string;
  uri: string;
}

export default function NewsPage() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('world');
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const LIMIT = 10;
  const API_KEY = '0Xn3xkJ3eaMFx4l0tofdsWFLseOz9ok7';

  const lastArticleElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setOffset(prevOffset => prevOffset + LIMIT);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchNews = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchTopHeadlines(category);
      setArticles(response.results);
    } catch (error) {
      setError('Failed to fetch news articles. Please try again later.');
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory, fetchNews]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      setOffset(0);
      setHasMore(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setSearchQuery(inputValue);
      setOffset(0);
      setHasMore(true);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodeURIComponent(JSON.stringify(article)) }
    });
  };

  if (loading) {
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

  return (
    <Layout
      showCategoryNav={true}
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    >
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-4xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Latest News
            </h1>
          </div>
          <AdUnit className="my-10" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className={`text-center py-8 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div
                  key={article.url}
                  onClick={() => handleArticleClick(article)}
                  className={`cursor-pointer group ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-lg overflow-hidden shadow-lg transition-all duration-200 hover:shadow-xl`}
                >
                  {article.multimedia && article.multimedia.length > 0 && (
                    <div className="relative h-48">
                      <Image
                        src={article.multimedia[0].url}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {article.kicker && (
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 block">
                        {article.kicker}
                      </span>
                    )}
                    <h2 className={`text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {article.title}
                    </h2>
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {article.abstract}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.byline}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(article.published_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 