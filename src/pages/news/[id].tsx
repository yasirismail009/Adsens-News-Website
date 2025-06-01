import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import SEO from '@/components/SEO';

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

const NewsDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isDarkMode } = useTheme();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticleData = async () => {
      if (!id) return;

      try {
        // Try to get article from router state first
        const stateArticle = router.query.article;
        if (stateArticle) {
          const decodedArticle = JSON.parse(decodeURIComponent(stateArticle as string));
          setArticle(decodedArticle);
          setLoading(false);
          return;
        }

        // If not in router state, try localStorage
        const storedArticles = localStorage.getItem('newsArticles');
        if (storedArticles) {
          const articles = JSON.parse(storedArticles);
          // Decode the base64 ID to get the original URL
          const originalUrl = Buffer.from(id as string, 'base64').toString();
          const foundArticle = articles.find((a: NewsArticle) => a.url === originalUrl);
          if (foundArticle) {
            setArticle(foundArticle);
            setLoading(false);
            return;
          }
        }

        setError('Article not found');
      } catch (err) {
        setError('Error loading article');
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    };

    getArticleData();
  }, [id, router.query]);

  if (loading) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading article...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error || 'Article not found'}</p>
              <button
                onClick={() => router.push('/news')}
                className={`mt-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-xs py-1.5 px-4 rounded-sm transition-colors`}
              >
                Back to News
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description || ''}
        ogImage={article.urlToImage || undefined}
        ogUrl={article.url}
        ogType="article"
        keywords={`scholarships, education, news, ${article.source.name}`}
        articlePublishedTime={article.publishedAt}
        articleModifiedTime={article.publishedAt}
        articleAuthor={article.author || 'Global Scholarships'}
        articleSection="Education News"
        articleTag={[
          'scholarships',
          'education',
          'news',
          article.source.name,
          ...(article.title.toLowerCase().split(' ').filter(word => word.length > 3))
        ]}
      />
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-4">
              <Link 
                href="/news" 
                className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium flex items-center transition-colors`}
              >
                <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>

            <article className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 transition-colors duration-200`}>
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {article.source.name}
                  </span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  {article.author && (
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      By {article.author}
                    </span>
                  )}
                </div>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                  {article.title}
                </h1>
                {article.description && (
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    {article.description}
                  </p>
                )}
              </div>

              {article.urlToImage && (
                <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-base leading-relaxed`}>
                  {article.content}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-sm py-2 px-4 rounded-sm transition-colors`}
                >
                  Read Full Article
                </a>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewsDetail; 