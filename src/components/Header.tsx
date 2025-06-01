import Link from 'next/link';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
           Let&apos;s Read
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/news" className={`hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              News
            </Link>
            <Link href="/about" className={`hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              About
            </Link>
            <Link href="/contact" className={`hover:text-blue-500 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
              Contact
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 