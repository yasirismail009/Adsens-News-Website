"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useTheme } from '../../contexts/ThemeContext';
import Image from 'next/image';
import SEO from '@/components/SEO';
import AdUnit from '@/components/AdUnit';
import { NewsArticle } from '@/services/newsService';

const NewsDetail = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [article, setArticle] = useState<NewsArticle | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for article data in local storage first
    const storedArticle = localStorage.getItem('currentArticle');
    
    if (storedArticle) {
      try {
        const parsedArticle = JSON.parse(storedArticle);
        setArticle(parsedArticle);
        setIsLoading(false);
      } catch {
        setError('Failed to load article data');
        setIsLoading(false);
      }
    } else if (router.query.article) {
      try {
        const decodedArticle = JSON.parse(decodeURIComponent(router.query.article as string));
        setArticle(decodedArticle);
        // Save to local storage
        localStorage.setItem('currentArticle', JSON.stringify(decodedArticle));
        setIsLoading(false);
      } catch {
        setError('Failed to load article data');
        setIsLoading(false);
      }
    } else {
      // No data available, redirect to news page
      router.push('/news');
    }

    // Cleanup function to clear local storage when component unmounts
    return () => {
      localStorage.removeItem('currentArticle');
    };
  }, [router.query, router]);

  const handleBackClick = () => {
    localStorage.removeItem('currentArticle');
    router.push('/news');
  };

  // Helper function to get article title
  const getArticleTitle = (article: NewsArticle) => {
    return article.title;
  };

  // Helper function to get article description
  const getArticleDescription = (article: NewsArticle) => {
    return article.abstract;
  };

  // Helper function to get article URL
  const getArticleUrl = (article: NewsArticle) => {
    return article.url;
  };

  // Helper function to get article date
  const getArticleDate = (article: NewsArticle) => {
    return article.published_date;
  };

  // Helper function to get article author
  const getArticleAuthor = (article: NewsArticle) => {
    return article.byline;
  };

  // Helper function to get article section
  const getArticleSection = (article: NewsArticle) => {
    return article.section;
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-4xl">
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
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {error || 'Article not found'}
              </p>
              <button
                onClick={handleBackClick}
                className={`mt-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-sm py-2 px-4 rounded-md transition-colors`}
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
        description={article.abstract}
        image={article.multimedia?.[0]?.url}
        article={true}
        publishedTime={article.published_date || article.created_date || ''}
        modifiedTime={article.updated_date || article.published_date || article.created_date || ''}
        authors={[article.byline]}
        section={article.section}
        keywords={[
          article.section,
          ...(article.des_facet || []),
          ...(article.org_facet || []),
          ...(article.per_facet || []),
          ...(article.geo_facet || [])
        ]}
        tags={article.des_facet || []}
      />
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-4xl">
            <button
              onClick={handleBackClick}
              className={`mb-6 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-sm font-medium transition-colors`}
            >
              ← Back to News
            </button>
            <AdUnit className="my-8" />

            <article className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              {article.multimedia?.[0]?.url && (
                <div className="relative w-full h-96">
                  <Image
                    src={article.multimedia[0].url}
                    alt={article.multimedia[0].caption || article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {article.multimedia[0].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                      <p className="text-sm">{article.multimedia[0].caption}</p>
                      {article.multimedia[0].copyright && (
                        <p className="text-xs mt-1">{article.multimedia[0].copyright}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                {article.kicker && (
                  <p className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {article.kicker}
                  </p>
                )}

                <h1 className={`text-3xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {article.title}
                </h1>

                {article.byline && (
                  <p className={`text-sm mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {article.byline}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-6 text-sm">
                  <span className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(article.published_date || article.created_date).toLocaleDateString()}
                  </span>
                  <span className={`${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {article.section}
                    {article.subsection && ` > ${article.subsection}`}
                  </span>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className={`text-lg mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {article.abstract}
                  </p>
                </div>

                {(article.des_facet?.length || article.org_facet?.length || article.per_facet?.length || article.geo_facet?.length) && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h2 className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Topics
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {article.des_facet?.map((topic, index) => (
                        <span
                          key={`des-${index}`}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {topic}
                        </span>
                      ))}
                      {article.org_facet?.map((org, index) => (
                        <span
                          key={`org-${index}`}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {org}
                        </span>
                      ))}
                      {article.per_facet?.map((person, index) => (
                        <span
                          key={`per-${index}`}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {person}
                        </span>
                      ))}
                      {article.geo_facet?.map((location, index) => (
                        <span
                          key={`geo-${index}`}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors`}
                  >
                    Read Full Article on NYT
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewsDetail; 