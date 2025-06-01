import Layout from '../components/Layout';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
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
  );
}
