import { useState, useEffect, useRef, useCallback } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface NewsArticle {
  // Common fields
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
  multimedia?: Array<{
    url: string;
    format?: string;
    height: number;
    width: number;
    type?: string;
    subtype?: string;
    caption: string;
    copyright?: string;
  }>;
  kicker?: string;
  
  // Top Stories API specific fields
  uuid?: string;
  categories?: string[];
  section?: string;
  subsection?: string;
  byline?: string;
  des_facet?: string[];
  org_facet?: string[];
  per_facet?: string[];
  geo_facet?: string[];
  item_type?: string;
  updated_date?: string;
  created_date?: string;

  // Article Search API specific fields
  abstract?: string;
  web_url?: string;
  headline?: {
    main: string;
    kicker?: string;
    print_headline?: string;
  };
  pub_date?: string;
  section_name?: string;
  byline_original?: string;
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
  _id?: string;
  uri?: string;
}

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
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const fetchNews = useCallback(async (currentOffset: number, isNewSearch: boolean = false) => {
    try {
      if (isNewSearch) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchQuery}&api-key=${API_KEY}&page=${currentOffset}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch news articles');
      }
      
      const data = await response.json();
      const newArticles = data.response.docs.map((article: NYTArticleSearch) => ({
        title: article.headline.main,
        description: article.abstract,
        url: article.web_url,
        published_at: article.pub_date,
        source: article.source,
        multimedia: article.multimedia ? [{
          url: article.multimedia.thumbnail?.url || '',
          height: article.multimedia.thumbnail?.height || 0,
          width: article.multimedia.thumbnail?.width || 0,
          caption: article.multimedia.caption || '',
          copyright: article.multimedia.credit || ''
        }] : undefined,
        kicker: article.headline.kicker,
        abstract: article.abstract,
        web_url: article.web_url,
        headline: article.headline,
        pub_date: article.pub_date,
        section_name: article.section_name,
        byline_original: article.byline?.original,
        snippet: article.snippet,
        keywords: article.keywords,
        news_desk: article.news_desk,
        subsection_name: article.subsection_name,
        type_of_material: article.type_of_material,
        word_count: article.word_count,
        document_type: article.document_type,
        _id: article._id,
        uri: article.uri
      }));
      
      if (isNewSearch) {
        setArticles(newArticles);
      } else {
        setArticles(prevArticles => [...prevArticles, ...newArticles]);
      }
      
      setHasMore(newArticles.length === LIMIT);
      setIsLoading(false);
      setIsLoadingMore(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [searchQuery, API_KEY, LIMIT]);

  useEffect(() => {
    setOffset(0);
    fetchNews(0, true);
  }, [searchQuery, fetchNews]);

  useEffect(() => {
    if (offset > 0) {
      fetchNews(offset);
    }
  }, [offset, fetchNews]);

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
      pathname: `/news/${encodeURIComponent(article.web_url || article.url)}`,
      query: { article: encodeURIComponent(JSON.stringify(article)) }
    });
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article
                key={article.web_url || article.url || index}
                ref={index === articles.length - 1 ? lastArticleElementRef : null}
                onClick={() => handleArticleClick(article)}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-lg shadow-md overflow-hidden transition-colors duration-200 cursor-pointer`}
              >
                {article.multimedia?.[0]?.url && (
                  <div className="relative w-full h-48">
                    <Image
                      src={article.multimedia[0].url}
                      alt={article.multimedia[0].caption || article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {article.multimedia[0].caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                        <p className="text-xs">{article.multimedia[0].caption}</p>
                        {article.multimedia[0].copyright && (
                          <p className="text-xs mt-1 opacity-75">{article.multimedia[0].copyright}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-4">
                  {(article.kicker || article.headline?.kicker) && (
                    <p className={`text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {article.headline?.kicker || article.kicker}
                    </p>
                  )}
                  <h2 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {article.headline?.main || article.title}
                  </h2>
                  {(article.abstract || article.description) && (
                    <p className={`text-sm mb-4 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {article.abstract || article.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs">
                    <span className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {article.section_name || article.section}
                    </span>
                    <span className={`${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {new Date(article.pub_date || article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  {(article.byline_original || article.byline) && (
                    <p className={`text-xs mt-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {article.byline_original || article.byline}
                    </p>
                  )}
                  <button
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

          {isLoadingMore && (
            <div className="text-center mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading more articles...</p>
            </div>
          )}

          {!hasMore && articles.length > 0 && (
            <div className={`text-center mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No more articles to load
            </div>
          )}

          {articles.length === 0 && !isLoading && (
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