import { useEffect, useState } from 'react';
import { Scholarship } from '../types/scholarship';
import Link from 'next/link';
import { scholarshipService } from '../services/scholarshipService';

interface LatestScholarshipsProps {
  isDarkMode?: boolean;
}

const LatestScholarships: React.FC<LatestScholarshipsProps> = ({ isDarkMode = false }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestScholarships = async () => {
      try {
        setLoading(true);
        const response = await scholarshipService.getAllScholarships({
          ordering: '-created_at',
          is_active: true
        });
        setScholarships(response.data.slice(0, 4)); // Get only the latest 4 scholarships
        setError(null);
      } catch (err) {
        setError('Failed to fetch latest scholarships');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestScholarships();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No latest scholarships available
      </div>
    );
  }

  return (
    <div className={`py-4 sm:py-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Latest Scholarships</h2>
          <Link 
            href="/scholarships" 
            className={`${isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'} text-xs font-medium flex items-center transition-colors`}
          >
            View All
            <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className={`p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors rounded-lg shadow-sm`}>
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-800' : 'text-gray-600'}`}>
                    {scholarship.source_website.charAt(0)}
                  </span>
                </div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} truncate max-w-[100px]`}>
                  {scholarship.source_website}
                </span>
              </div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} transition-colors text-sm mb-1 line-clamp-2`}>
                <Link href={`/scholarships/${scholarship.id}`}>
                  {scholarship.title}
                </Link>
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 mb-2`}>
                {scholarship.description.substring(0, 80)}...
              </p>
              <div className="flex justify-between items-center mb-2">
                <div className={`text-xs font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {scholarship.financial_benefits}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {scholarship.deadline}
                </div>
              </div>
              <Link 
                href={`/scholarships/${scholarship.id}`}
                className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium flex items-center transition-colors`}
              >
                View Details
                <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestScholarships; 