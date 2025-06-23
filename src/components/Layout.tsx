import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import CategoryNavbar from './CategoryNavbar';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
  showCategoryNav?: boolean;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showCategoryNav = false, 
  selectedCategory = 'world',
  onCategoryChange 
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      {showCategoryNav && onCategoryChange && (
        <CategoryNavbar
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout; 