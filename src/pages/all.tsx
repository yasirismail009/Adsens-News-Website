import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import AdUnit from '../components/AdUnit';
import { useRouter } from 'next/router';

interface Article {
  uuid: string;
  title: string;
  abstract: string;
  multimedia: Array<{ url: string }>;
  kicker: string;
  source: string;
  created_date: string;
  section: string;
  url: string;
}

const categories = {
  'News & Politics': ['politics', 'us', 'world', 'nyregion', 'upshot'],
  'Arts & Entertainment': ['arts', 'movies', 'theater', 'books', 't-magazine'],
  'Business & Technology': ['business', 'technology', 'automobiles', 'realestate'],
  'Lifestyle & Culture': ['fashion', 'food', 'travel', 'magazine', 'sundayreview'],
  'Sports & Health': ['sports', 'health', 'science'],
  'Regional & World': ['home', 'insider', 'obituaries', 'opinion']
};

export default function AllNews() {
  const { isDarkMode } = useTheme();
  const [articles, setArticles] = useState<{ [key: string]: Article[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles: { [key: string]: Article[] } = {};
        
        // Fetch articles for each section
        for (const sections of Object.values(categories)) {
          for (const section of sections) {
            const response = await fetch(`/api/news?section=${section}`);
            const data = await response.json();
            allArticles[section] = data.results || [];
          }
        }
        
        setArticles(allArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article: Article) => {
    localStorage.setItem('currentArticle', JSON.stringify(article));
    router.push(`/news/${encodeURIComponent(article.url)}`);
  };

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Navbar onSectionChange={handleSectionChange} currentSection={selectedSection || ''} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar onSectionChange={handleSectionChange} currentSection={selectedSection || ''} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Categories Grid */}
        {Object.entries(categories).map(([category, sections]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white border-b pb-2">
              {category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.map((section) => (
                <div key={section} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 capitalize">
                    {section}
                  </h3>
                  
                  <div className="space-y-4">
                    {articles[section]?.slice(0, 3).map((article) => (
                      <div 
                        key={article.uuid}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                      >
                        {article.multimedia && article.multimedia.length > 0 && (
                          <img
                            src={article.multimedia[0].url}
                            alt={article.title}
                            className="object-cover w-full h-32"
                          />
                        )}
                        <div className="p-4">
                          <div className="text-xs text-blue-600 font-semibold mb-1 uppercase">
                            {article.kicker || section}
                          </div>
                          <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            {article.abstract?.substring(0, 100)}...
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {article.source} &middot; {new Date(article.created_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <button
                            onClick={() => handleArticleClick(article)}
                            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <span>Read More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Newsletter Section */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between mb-8 shadow-md">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Stay Updated with All Sections</h2>
            <p className="text-gray-700 dark:text-gray-300">Get the latest news from all sections delivered to your inbox.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white" 
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-r-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <div className="hidden md:block ml-8">
            <AdUnit className="w-64 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
} 