import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-6 transition-colors duration-200`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
            © {new Date().getFullYear()} Global Scholarships. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link 
              href="/privacy-policy"
              className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookies"
              className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 