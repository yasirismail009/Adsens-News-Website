import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 shadow-sm'} transition-colors duration-200`}>
      {/* Top navigation bar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LET'SREAD</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium text-sm`}>
            HOME
          </Link>
          <Link href="/news" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium text-sm`}>
            NEWS
          </Link>
          {/* <Link href="/about" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium text-sm`}>
            ABOUT
          </Link>*/}
          <Link href="/contact" className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium text-sm`}>
            CONTACT
          </Link> 
        </nav>
        
        {/* Dark mode toggle and subscribe */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            onClick={toggleDarkMode}
            className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-800'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <Link 
            href="/subscribe" 
            className={`hidden sm:block ${isDarkMode ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-1 px-3 rounded-md text-xs font-medium transition-colors`}
          >
            Subscribe
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} focus:outline-none p-1`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-200 z-50 absolute w-full shadow-lg`}>
          <div className="flex flex-col px-4 py-4">
            <Link 
              href="/" 
              className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/scholarships" 
              className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Scholarships
            </Link>
            <Link 
              href="/about" 
              className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${isDarkMode ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} font-medium py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/subscribe" 
              className={`${isDarkMode ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-md text-sm font-medium transition-colors mt-4 text-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 