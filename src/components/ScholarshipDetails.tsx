import React from 'react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipDetailsProps {
  scholarship: Scholarship;
  isDarkMode: boolean;
}

const ScholarshipDetails: React.FC<ScholarshipDetailsProps> = ({ scholarship, isDarkMode }) => {
  return (
    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {scholarship.title}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Overview
          </h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {scholarship.description}
          </p>
        </div>
        
        <div>
          <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Key Details
          </h2>
          <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>
              <strong>Amount:</strong> {scholarship.financial_benefits}
            </li>
            <li>
              <strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}
            </li>
            <li>
              <strong>Eligibility:</strong> {scholarship.eligibility.join(', ')}
            </li>
            <li>
              <strong>Type:</strong> {scholarship.degree_level}
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Requirements
        </h2>
        <ul className={`list-disc pl-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {scholarship.required_documents.map((requirement: string, index: number) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Application Process
        </h2>
        <ol className={`list-decimal pl-6 space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {scholarship.application_process.map((step: string, index: number) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Additional Information
        </h2>
        <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
          <p>
            For more information about this scholarship, please visit the official website or contact the scholarship provider directly. Make sure to review all requirements and deadlines carefully before applying.
          </p>
          <p className="mt-4">
            Note: The information provided here is for general guidance only. Please verify all details with the official scholarship provider before applying.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails; 