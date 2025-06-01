import { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  isDarkMode?: boolean;
}

export interface FilterOptions {
  degree_level: string;
  country: string;
  financial_benefits: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange, isDarkMode = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    degree_level: '',
    country: '',
    financial_benefits: '',
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-sm overflow-hidden transition-colors duration-200`}>
      <form onSubmit={handleSearchSubmit} className={`px-3 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search scholarships..."
            className={`flex-grow px-3 py-1.5 text-sm ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } border rounded-l-sm focus:outline-none focus:ring-1`}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1.5 rounded-r-sm transition-colors`}
            aria-label="Search"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <div className="flex justify-end mt-2">
          <button 
            type="button" 
            onClick={toggleFilters}
            className={`text-xs font-medium ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-800'
            } flex items-center transition-colors`}
          >
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            <svg className={`h-3 w-3 ml-1 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </form>

      {isFiltersOpen && (
        <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} grid grid-cols-1 md:grid-cols-3 gap-3 transition-colors duration-200`}>
          <div>
            <label htmlFor="degree_level" className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Degree Level
            </label>
            <select
              id="degree_level"
              name="degree_level"
              className={`w-full px-2 py-1.5 text-xs border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              value={filters.degree_level}
              onChange={handleFilterChange}
            >
              <option value="">All Degree Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="phd">PhD</option>
              <option value="masters">Masters</option>
              <option value="bachelors">Bachelors</option>
            </select>
          </div>

          <div>
            <label htmlFor="country" className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Country
            </label>
            <select
              id="country"
              name="country"
              className={`w-full px-2 py-1.5 text-xs border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="">All Countries</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="germany">Germany</option>
            </select>
          </div>

          <div>
            <label htmlFor="financial_benefits" className={`block text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Financial Benefits
            </label>
            <select
              id="financial_benefits"
              name="financial_benefits"
              className={`w-full px-2 py-1.5 text-xs border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-700'
              } rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
              value={filters.financial_benefits}
              onChange={handleFilterChange}
            >
              <option value="">Any Amount</option>
              <option value="under5000">Under $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-25000">$10,000 - $25,000</option>
              <option value="over25000">Over $25,000</option>
              <option value="fullTuition">Full Tuition</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter; 