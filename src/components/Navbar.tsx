import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/"
            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Global Scholarships
          </Link>

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
    </nav>
  );
} 