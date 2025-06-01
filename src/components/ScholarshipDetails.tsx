import Link from 'next/link';
import { Scholarship } from '../types/scholarship';

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
  isDarkMode?: boolean;
}

const ScholarshipDetails: React.FC<ScholarshipDetailsProps> = ({ scholarship, isDarkMode = false }) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <article className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg overflow-hidden transition-colors duration-200`}>
      {/* Source website information */}
      <div className="px-5 py-4 flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{scholarship.source_website.charAt(0)}</span>
        </div>
        <div>
          <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} text-sm`}>{scholarship.source_website}</h3>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center`}>
            <span>Updated {formatDate(scholarship.updated_at)}</span>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-5">
        {/* Scholarship title */}
        <h1 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{scholarship.title}</h1>
        
        {/* Categories/tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-block px-2 py-1 text-xs ${isDarkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-800'} rounded-md`}>
            {scholarship.degree_level}
          </span>
          <span className={`inline-block px-2 py-1 text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-md`}>
            {scholarship.host_country}
          </span>
          <span className={`inline-block px-2 py-1 text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} rounded-md`}>
            {scholarship.number_of_scholarships} Available
          </span>
        </div>
      </div>
      
      {/* Key scholarship information */}
      <div className={`px-4 sm:px-5 py-3 sm:py-4 flex flex-col md:flex-row md:justify-between md:items-center ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-y transition-colors duration-200`}>
        <div className="mb-3 md:mb-0 flex items-center">
          <div className="mr-6">
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-1`}>Amount</p>
            <p className={`text-base font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{scholarship.amount}</p>
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} mb-1`}>Application Deadline</p>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{scholarship.deadline}</p>
          </div>
        </div>
        <div>
          <a
            href={scholarship.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block text-center px-4 py-2 rounded-md text-sm font-medium ${
              isDarkMode
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } transition-colors duration-200`}
          >
            Apply Now
          </a>
        </div>
      </div>
      
      {/* Scholarship description and requirements */}
      <div className="p-5">
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-5 leading-relaxed`}>{scholarship.description}</p>
        
        <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 sm:mb-4 mt-5 sm:mt-6`}>Eligibility Requirements</h2>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1 mb-6 text-xs sm:text-sm`}>
          {scholarship.eligibility.map((item, index) => (
            <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</li>
          ))}
        </ul>
        
        <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 sm:mb-4`}>Required Documents</h2>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1 mb-6 text-xs sm:text-sm`}>
          {scholarship.required_documents.map((item, index) => (
            <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</li>
          ))}
        </ul>
        
        <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3 sm:mb-4`}>Application Process</h2>
        <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1 mb-6 text-xs sm:text-sm`}>
          {scholarship.application_process.map((step, index) => (
            <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{step}</li>
          ))}
        </ul>
        
        <div className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} mb-6`}>
          <h3 className={`text-sm sm:text-base font-bold ${isDarkMode ? 'text-white' : 'text-blue-800'} mb-2`}>How to Apply</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 text-xs sm:text-sm`}>
            Visit the official scholarship website by clicking the "Apply Now" button above. Make sure you have all required documents ready before starting your application.
          </p>
          <a
            href={scholarship.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center text-xs sm:text-sm font-medium ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
            } transition-colors duration-200`}
          >
            Visit Official Website
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Footer information */}
      <div className={`px-5 py-3 border-t ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'} text-xs`}>
        Last updated on {formatDate(scholarship.updated_at)}
      </div>
    </article>
  );
};

export default ScholarshipDetails; 