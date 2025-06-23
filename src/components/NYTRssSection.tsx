import React, { useEffect, useState } from 'react';
import { fetchNYTRssFeed, NYTRssItem } from '../services/nytRssService';
import type { NYTRssSection } from '../services/nytRssService';
import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';
import NYTRssSelector from './NYTRssSelector';

const NYTRssSectionComponent: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<NYTRssSection>('HomePage');
  const [items, setItems] = useState<NYTRssItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        setLoading(true);
        const response = await fetchNYTRssFeed(selectedSection);
        setItems(response.rss.channel.item);
        setError(null);
      } catch (err) {
        setError('Failed to load news feed');
        console.error('Error loading NYT RSS feed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, [selectedSection]);

  // Function to extract image URL from media content
  const getImageUrl = (item: NYTRssItem): string | null => {
    if (item['media:content'] && item['media:content'].length > 0) {
      const mediaContent = item['media:content'].find(content => content['@_medium'] === 'image');
      return mediaContent ? mediaContent['@_url'] : null;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  // Split items into featured and regular articles
  const featuredArticles = items.slice(0, 1);
  const regularArticles = items.slice(1);

  return (
    <div className={isDarkMode ? 'bg-gray-900' : 'bg-white'}>
      <NYTRssSelector 
        selectedSection={selectedSection}
        onSectionChange={setSelectedSection}
      />
      
      <main className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Featured Article */}
        {featuredArticles.map((item) => {
          const imageUrl = getImageUrl(item);
          return (
            <div key={item.guid['#text']} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {imageUrl && (
                  <div className="relative h-[400px] md:h-[500px]">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <div className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(item.pubDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.title}
                    </a>
                  </h1>
                  <div 
                    className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.creator || 'The New York Times'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regularArticles.map((item) => {
            const imageUrl = getImageUrl(item);
            return (
              <article 
                key={item.guid['#text']} 
                className={`flex flex-col ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
              >
                {imageUrl && (
                  <div className="relative h-48 mb-4">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(item.pubDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <h2 className="text-xl font-semibold mb-3">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.title}
                  </a>
                </h2>
                <div 
                  className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <div className={`text-sm mt-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.creator || 'The New York Times'}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default NYTRssSectionComponent; 