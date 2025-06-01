import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Scholarship } from '../../types/scholarship';
import { scholarshipService } from '../../services/scholarshipService';
import { useTheme } from '../../contexts/ThemeContext';
import Link from 'next/link';

export default function ScholarshipDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isDarkMode } = useTheme();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await scholarshipService.getScholarshipById(id as string);
        setScholarship(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch scholarship details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading scholarship details...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !scholarship) {
    return (
      <Layout>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center">
              <p className={`text-red-500 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>{error || 'Scholarship not found'}</p>
              <button
                onClick={() => router.push('/scholarships')}
                className={`mt-4 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-xs py-1.5 px-4 rounded-sm transition-colors`}
              >
                Back to Scholarships
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-5 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-4">
            <Link 
              href="/scholarships" 
              className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium flex items-center transition-colors`}
            >
              <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Scholarships
            </Link>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 transition-colors duration-200`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              {scholarship.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Financial Benefits</h3>
                <p className={`text-base ${isDarkMode ? 'text-green-400' : 'text-green-600'} font-medium`}>
                  {scholarship.financial_benefits}
                </p>
              </div>

              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Deadline</h3>
                <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium`}>
                  {scholarship.deadline}
                </p>
              </div>

              <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Degree Level</h3>
                <p className={`text-base ${isDarkMode ? 'text-white' : 'text-gray-800'} font-medium`}>
                  {scholarship.degree_level}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Description</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {scholarship.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Eligibility</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {scholarship.eligibility}
              </p>
            </div>

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Application Process</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {scholarship.application_process}
              </p>
            </div>

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Required Documents</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {scholarship.required_documents}
              </p>
            </div>

            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Additional Information</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                {scholarship.additional_info}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={scholarship.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium text-sm py-2 px-4 rounded-sm transition-colors`}
              >
                Apply Now
              </a>
              <Link
                href={`/scholarships?source_website=${scholarship.source_website}`}
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800 font-medium text-sm py-2 px-4 rounded-sm transition-colors`}
              >
                More from {scholarship.source_website}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 