import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Define the section type
type SectionName = 
  | 'HomePage' | 'Latest News' | 'Most Read' | 'MostEmailed' | 'MostShared' | 'MostViewed'
  | 'World' | 'Politics' | 'US' | 'Africa' | 'Americas' | 'AsiaPacific' | 'Europe' | 'MiddleEast'
  | 'Business' | 'Tech' | 'Economy' | 'EnergyEnvironment' | 'DealBook' | 'MediaandAdvertising'
  | 'SmallBusiness' | 'YourMoney' | 'PersonalTech'
  | 'Science' | 'Health' | 'Climate' | 'Space' | 'Well'
  | 'Arts' | 'ArtandDesign' | 'Books' | 'Dance' | 'Movies' | 'Music' | 'Television' | 'Theater'
  | 'Style' | 'Food' | 'Travel' | 'Magazine' | 'TMagazine' | 'FashionandStyle' | 'DiningandWine' | 'Weddings'
  | 'Sports' | 'Baseball' | 'ProBasketball' | 'ProFootball' | 'CollegeBasketball' | 'CollegeFootball'
  | 'Golf' | 'Hockey' | 'Soccer' | 'Tennis'
  | 'Opinion' | 'Education' | 'Jobs' | 'NYRegion' | 'RealEstate' | 'SundayBookReview'
  | 'Sunday-Review' | 'Upshot' | 'Obituaries' | 'Lens';

// Define categories and their sections
const SECTION_CATEGORIES: Record<string, SectionName[]> = {
  'News': [
    'HomePage',
    'Latest News',
    'Most Read',
    'MostEmailed',
    'MostShared',
    'MostViewed',
  ],
  'World & Politics': [
    'World',
    'Politics',
    'US',
    'Africa',
    'Americas',
    'AsiaPacific',
    'Europe',
    'MiddleEast',
  ],
  'Business & Tech': [
    'Business',
    'Tech',
    'Economy',
    'EnergyEnvironment',
    'DealBook',
    'MediaandAdvertising',
    'SmallBusiness',
    'YourMoney',
    'PersonalTech',
  ],
  'Science & Health': [
    'Science',
    'Health',
    'Climate',
    'Space',
    'Well',
  ],
  'Arts & Culture': [
    'Arts',
    'ArtandDesign',
    'Books',
    'Dance',
    'Movies',
    'Music',
    'Television',
    'Theater',
  ],
  'Lifestyle': [
    'Style',
    'Food',
    'Travel',
    'Magazine',
    'TMagazine',
    'FashionandStyle',
    'DiningandWine',
    'Weddings',
  ],
  'Sports': [
    'Sports',
    'Baseball',
    'ProBasketball',
    'ProFootball',
    'CollegeBasketball',
    'CollegeFootball',
    'Golf',
    'Hockey',
    'Soccer',
    'Tennis',
  ],
  'Other': [
    'Opinion',
    'Education',
    'Jobs',
    'NYRegion',
    'RealEstate',
    'SundayBookReview',
    'Sunday-Review',
    'Upshot',
    'Obituaries',
    'Lens',
  ],
};

// Export the section type
export type NYTRssSection = SectionName;

// Extract all unique sections into a flat array
const ALL_SECTIONS = Object.values(SECTION_CATEGORIES).flat();

interface NYTRssSelectorProps {
  selectedSection: NYTRssSection;
  onSectionChange: (section: NYTRssSection) => void;
}

const NYTRssSelector: React.FC<NYTRssSelectorProps> = ({ selectedSection, onSectionChange }) => {
  const { isDarkMode } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className={`w-full border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} relative`}>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between py-2 px-4">
          {/* Current Section Display */}
          <div className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedSection.replace(/([A-Z])/g, ' $1').trim()}
          </div>

          {/* Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isDarkMode 
                ? 'text-gray-300 hover:bg-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Select Section •••
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              {/* Overlay to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              
              <div 
                className={`absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-50 
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                  border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
                  max-h-[calc(100vh-120px)] overflow-hidden flex flex-col`}
              >
                {/* Search box (optional) */}
                <div className={`p-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <input
                    type="text"
                    placeholder="Search sections..."
                    className={`w-full px-3 py-1.5 text-sm rounded-md outline-none transition-colors
                      ${isDarkMode 
                        ? 'bg-gray-700 text-gray-100 placeholder-gray-400 focus:bg-gray-600' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-gray-200'}`}
                  />
                </div>

                {/* Scrollable content */}
                <div 
                  className={`overflow-y-auto flex-1 py-2
                    scrollbar-thin scrollbar-thumb-rounded-full
                    ${isDarkMode 
                      ? 'scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500' 
                      : 'scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'}`}
                >
                  {Object.entries(SECTION_CATEGORIES).map(([category, sections]) => (
                    <div key={category} className="py-2">
                      <div className={`sticky top-0 px-4 py-1 text-xs font-semibold uppercase tracking-wider
                        ${isDarkMode 
                          ? 'bg-gray-800 text-gray-400' 
                          : 'bg-white text-gray-500'}`}
                      >
                        {category}
                      </div>
                      {sections.map((section) => (
                        <button
                          key={section}
                          onClick={() => {
                            onSectionChange(section);
                            setIsDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            selectedSection === section
                              ? isDarkMode
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-100 text-gray-900'
                              : isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {section.replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NYTRssSelector; 