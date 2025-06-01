import { useEffect, useState } from 'react';
import { Scholarship } from '../types/scholarship';
import ScholarshipCard from './ScholarshipCard';
import Link from 'next/link';
import { scholarshipService } from '../services/scholarshipService';

interface FeaturedScholarshipsProps {
  isDarkMode?: boolean;
}

const FeaturedScholarships: React.FC<FeaturedScholarshipsProps> = ({ isDarkMode = false }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedScholarships = async () => {
      try {
        setLoading(true);
        const response = await scholarshipService.getAllScholarships({
          ordering: '-created_at',
          is_active: true
        });
        setScholarships(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured scholarships');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedScholarships();
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
        No featured scholarships available
      </div>
    );
  }

  // Get the first scholarship for the main feature
  const mainScholarship = scholarships[0];
  // Use the rest for the secondary list
  const secondaryScholarships = scholarships.slice(1, 4); // Get up to 3 more scholarships

  return (
    <div className={`py-4 sm:py-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Featured Scholarships</h2>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Main featured scholarship */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <h3 className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
              {mainScholarship.title}
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              {mainScholarship.source_website}
            </p>
            <div className="flex justify-between items-center mb-2">
              <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {mainScholarship.financial_benefits}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Deadline: <span className="font-semibold">{mainScholarship.deadline}</span>
              </div>
            </div>
            <Link 
              href={`/scholarships/${mainScholarship.id}`}
              className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium flex items-center transition-colors`}
            >
              View Details
              <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Secondary scholarships */}
          <div className="space-y-3">
            {secondaryScholarships.map((scholarship) => (
              <div key={scholarship.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg shadow`}>
                <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
                  {scholarship.title}
                </h4>
                <div className="flex justify-between items-center">
                  <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {scholarship.source_website}
                  </div>
                  <Link 
                    href={`/scholarships/${scholarship.id}`}
                    className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium flex items-center transition-colors`}
                  >
                    View
                    <svg className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedScholarships; 