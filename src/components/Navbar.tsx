import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

const categories = {
  'News & Politics': ['politics', 'us', 'world', 'nyregion', 'upshot'],
  'Arts & Entertainment': ['arts', 'movies', 'theater', 'books', 't-magazine'],
  'Business & Technology': ['business', 'technology', 'automobiles', 'realestate'],
  'Lifestyle & Culture': ['fashion', 'food', 'travel', 'magazine', 'sundayreview'],
  'Sports & Health': ['sports', 'health', 'science'],
  'Regional & World': ['home', 'insider', 'obituaries', 'opinion']
};

interface NavbarProps {
  onSectionChange: (section: string) => void;
  currentSection: string;
}

export default function Navbar({ onSectionChange, currentSection }: NavbarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (category: string) => {
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/"
            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Global News
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {Object.entries(categories).map(([category, sections]) => (
              <div key={category} className="relative group">
                <button
                  onClick={() => handleDropdownToggle(category)}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    sections.includes(currentSection)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${
                      activeDropdown === category ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                    activeDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                >
                  <div className="py-1">
                    {sections.map((section) => (
                      <button
                        key={section}
                        onClick={() => {
                          onSectionChange(section);
                          setActiveDropdown(null);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          currentSection === section
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/news"
              className={`text-sm ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            >
              News
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {Object.entries(categories).map(([category, sections]) => (
              <div key={category}>
                <button
                  onClick={() => handleDropdownToggle(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    sections.includes(currentSection)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {category}
                </button>
                {activeDropdown === category && (
                  <div className="pl-4 space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section}
                        onClick={() => {
                          onSectionChange(section);
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                          currentSection === section
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 