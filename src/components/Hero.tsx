import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface NewsArticle {
  uuid: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
  categories: string[];
  section?: string;
  subsection?: string;
  byline?: string;
  multimedia?: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }>;
  des_facet?: string[];
  org_facet?: string[];
  per_facet?: string[];
  geo_facet?: string[];
  kicker?: string;
  item_type?: string;
  updated_date?: string;
  created_date?: string;
}

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const router = useRouter();
  const [mainArticle, setMainArticle] = useState<NewsArticle | null>(null);
  const [secondaryArticles, setSecondaryArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=0Xn3xkJ3eaMFx4l0tofdsWFLseOz9ok7');
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          // Transform the data to match our interface
          const transformedArticles = data.results.map((article: any) => ({
            uuid: article.uri || article.url,
            title: article.title,
            description: article.abstract,
            url: article.url,
            published_at: article.published_date,
            source: article.byline || 'The New York Times',
            categories: article.des_facet || [],
            section: article.section,
            subsection: article.subsection,
            byline: article.byline,
            multimedia: article.multimedia,
            des_facet: article.des_facet,
            org_facet: article.org_facet,
            per_facet: article.per_facet,
            geo_facet: article.geo_facet,
            kicker: article.kicker,
            item_type: article.item_type,
            updated_date: article.updated_date,
            created_date: article.created_date
          }));

          setMainArticle(transformedArticles[0]);
          setSecondaryArticles(transformedArticles.slice(1, 4));
          localStorage.setItem('newsArticles', JSON.stringify(transformedArticles));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleArticleClick = (article: NewsArticle) => {
    // Create a unique ID from the article URL
    router.push({
      pathname: `/news/${encodeURIComponent(article.url)}`,
      query: { article: encodeURIComponent(JSON.stringify(article)) }
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 w-full rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {mainArticle && (
        <div 
          className="flex-1 cursor-pointer"
          onClick={() => handleArticleClick(mainArticle)}
        >
          <div className={`relative h-[400px] rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            {mainArticle.multimedia && mainArticle.multimedia.length > 0 && (
              <div className="relative w-full h-full">
                <Image
                  src={mainArticle.multimedia[0].url}
                  alt={mainArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {mainArticle.multimedia[0].caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-black bg-opacity-50">
                    {mainArticle.multimedia[0].caption}
                    {mainArticle.multimedia[0].copyright && (
                      <span className="ml-2">© {mainArticle.multimedia[0].copyright}</span>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              {mainArticle.kicker && (
                <span className="text-sm font-semibold text-yellow-400 mb-2 block">
                  {mainArticle.kicker}
                </span>
              )}
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {mainArticle.title}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                {mainArticle.description}
              </p>
              <div className="flex items-center mt-2 text-xs text-gray-300">
                <span>{mainArticle.source}</span>
                <span className="mx-2">•</span>
                <span>{new Date(mainArticle.published_at).toLocaleDateString()}</span>
                {mainArticle.geo_facet && mainArticle.geo_facet.length > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{mainArticle.geo_facet.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 grid grid-cols-1 gap-4">
        {secondaryArticles.map((article, index) => (
          <div 
            key={index}
            className={`cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
            onClick={() => handleArticleClick(article)}
          >
            <div className="flex h-32">
              {article.multimedia && article.multimedia.length > 0 && (
                <div className="w-1/3 relative">
                  <Image
                    src={article.multimedia[0].url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                {article.kicker && (
                  <span className="text-xs font-semibold text-yellow-400 mb-1 block">
                    {article.kicker}
                  </span>
                )}
                <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {article.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.source}</span>
                  <span className="mx-1">•</span>
                  <span>{new Date(article.published_at).toLocaleDateString()}</span>
                  {article.geo_facet && article.geo_facet.length > 0 && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{article.geo_facet[0]}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero; 