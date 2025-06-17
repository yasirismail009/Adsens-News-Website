import React, { useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CategoryNavbarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'arts',
  'automobiles',
  'books/review',
  'business',
  'fashion',
  'food',
  'health',
  'home',
  'insider',
  'magazine',
  'movies',
  'nyregion',
  'obituaries',
  'opinion',
  'politics',
  'realestate',
  'science',
  'sports',
  'sundayreview',
  'technology',
  'theater',
  't-magazine',
  'travel',
  'upshot',
  'us',
  'world'
];

const CategoryNavbar: React.FC<CategoryNavbarProps> = ({ selectedCategory, onCategoryChange }) => {
  const { isDarkMode } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`sticky top-16 z-40 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center">
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 z-10 h-full px-2 ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`}
          >
            <span className="sr-only">Scroll left</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide py-4 px-6 space-x-6 scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('/', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 z-10 h-full px-2 ${isDarkMode ? 'bg-gradient-to-l from-gray-900 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`}
          >
            <span className="sr-only">Scroll right</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar; 