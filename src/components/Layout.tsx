import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsentBanner from './CookieConsent';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default Layout; 