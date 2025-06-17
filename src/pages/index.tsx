import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import NYTRssSection from '../components/NYTRssSection';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';
import { useTheme } from '../contexts/ThemeContext';
import { NewsArticle, NewsResponse } from '../services/newsService';
import { fetchTopHeadlines } from '../services/newsService';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { Article } from '../types';

interface NewsItem {
  uuid: string;
  title: string;
  abstract: string;
  byline: string;
  published_date: string;
  created_date: string;
  kicker: string;
  source: string;
  url?: string;
  web_url?: string;
  multimedia: {
    url: string;
    caption: string;
    copyright: string;
  }[];
  des_facet: string[];
  geo_facet: string[];
  per_facet: string[];
}

const Home: React.FC = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [currentSection, setCurrentSection] = useState('home');
  const [mainStory, setMainStory] = useState<Article | null>(null);
  const [newsGrid, setNewsGrid] = useState<Article[]>([]);
  const [newsInFocus, setNewsInFocus] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleArticleClick = (article: Article) => {
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodeURIComponent(JSON.stringify(article)) }
    });
  };

  useEffect(() => {
    fetchTopStories();
  }, [currentSection]);

  const fetchTopStories = async () => {
    setLoading(true);
    try {
      const response = await fetchTopHeadlines(currentSection);
      
      if (response.results && response.results.length > 0) {
        setMainStory(response.results[0] as Article);
        setNewsGrid(response.results.slice(1, 4) as Article[]);
        setNewsInFocus(response.results.slice(4, 7) as Article[]);
      }
    } catch (error) {
      console.error('Error fetching top stories:', error);
    }
    setLoading(false);
  };

  // Main story data
  const mainStoryData: NewsItem = {
    uuid: "b8e792a9-b64e-52ab-93f7-46be32391471",
    title: "With No Clear Off-Ramp, Israel's War With Iran May Last Weeks, Not Days",
    abstract: "Israel and Iran both have little incentive to stop and no obvious route to outright victory. Much depends on President Trump.",
    byline: "By Patrick Kingsley",
    published_date: "2025-06-16T05:30:59-04:00",
    created_date: "2025-06-16T05:30:59-04:00",
    kicker: "News Analysis",
    source: "The New York Times",
    multimedia: [
      {
        url: "https://static01.nyt.com/images/2025/06/16/multimedia/16int-israel-iran-assess-lpzc/16int-israel-iran-assess-lpzc-superJumbo.jpg",
        caption: "Damage from an Iranian missile attack in Rehovot, Israel, on Sunday morning.",
        copyright: "Avishag Shaar-Yashuv for The New York Times"
      }
    ],
    des_facet: ["War and Armed Conflicts", "Nuclear Weapons"],
    geo_facet: ["Israel", "Iran", "Tehran (Iran)"],
    per_facet: ["Trump, Donald J"]
  };

  // Bullet points based on the article's facets and abstract
  const bulletPoints = mainStory?.abstract
    ? mainStory.abstract.split('. ').filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Main Story Section */}
            {mainStory && (
              <div className="mb-8 cursor-pointer" onClick={() => handleArticleClick(mainStory)}>
                <div className="mb-2 text-xs text-pink-600 font-semibold uppercase">{mainStory.kicker}</div>
                <div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} News
                </div>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {/* Main Image */}
                  {mainStory.multimedia && mainStory.multimedia.length > 0 && (
                    <div className="md:w-2/3 w-full h-80 relative rounded-lg overflow-hidden shadow-md">
                      <img
                        src={mainStory.multimedia[0].url}
                        alt={mainStory.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-black bg-opacity-50">
                        {mainStory.multimedia[0].caption}
                        <div className="text-xs mt-1">{mainStory.multimedia[0].copyright}</div>
                      </div>
                    </div>
                  )}
                  {/* Main Story Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {mainStory.title}
                    </h1>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {mainStory.byline} &middot; Published: {new Date(mainStory.published_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} &middot; Created: {new Date(mainStory.created_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-base mb-4">{mainStory.abstract}</p>
                    <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-200">
                      {bulletPoints.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {mainStory.geo_facet.map((location, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {newsGrid.map((article) => (
                <div 
                  key={article.uuid} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  {article.multimedia && article.multimedia.length > 0 && (
                    <img
                      src={article.multimedia[0].url}
                      alt={article.title}
                      className="object-cover w-full h-40"
                    />
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-pink-600 font-semibold mb-1 uppercase">{article.kicker || 'News'}</div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{article.abstract?.substring(0, 100)}...</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{article.source} &middot; {new Date(article.created_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                    <button
                      onClick={() => handleArticleClick(article)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <span>Explore</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Ad/Newsletter Section */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-8 shadow-md">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Get breaking news and interactive live blogs</h2>
                <p className="text-gray-700 dark:text-gray-300">Sign up for our newsletter to receive the latest updates directly in your inbox.</p>
              </div>
              <form className="flex gap-2 w-full md:w-auto">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-md font-semibold hover:bg-blue-700 transition-colors">Subscribe</button>
              </form>
              <div className="hidden md:block ml-8">
                <AdUnit className="w-64 h-20" />
              </div>
            </div>
            {/* News in Focus */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">News in Focus</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsInFocus.map((article) => (
                  <div 
                    key={article.uuid} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                  >
                    {article.multimedia && article.multimedia.length > 0 && (
                      <img
                        src={article.multimedia[0].url}
                        alt={article.title}
                        className="object-cover w-full h-32"
                      />
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="text-xs text-blue-600 font-semibold mb-1 uppercase">{article.kicker || 'Focus'}</div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{article.abstract?.substring(0, 100)}...</p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">{article.source} &middot; {new Date(article.created_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</div>
                      <button
                        onClick={() => handleArticleClick(article)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <span>Explore</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NYT RSS Feed */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Latest from The New York Times</h2>
              <NYTRssSection section="HomePage" />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
