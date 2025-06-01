import Link from 'next/link';

export interface ScholarshipCardProps {
  id: string;
  title: string;
  source_website: string;
  financial_benefits: string;
  deadline: string;
  category: string;
  isDarkMode?: boolean;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  id,
  title,
  source_website,
  financial_benefits,
  deadline,
  category,
  isDarkMode = false,
}) => {
  return (
    <div className={`group p-4 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} transition-colors rounded-lg shadow-sm`}>
      <div className="flex flex-col justify-between">
        <div>
          <Link 
            href={`/scholarships/${id}`}
            className="block mb-1"
          >
            <h3 className={`text-sm sm:text-base font-semibold line-clamp-2 ${isDarkMode ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>
              {title}
            </h3>
          </Link>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 sm:mb-2`}>{source_website}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{financial_benefits}</div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Deadline: <span className="font-semibold">{deadline}</span>
          </div>
        </div>
      </div>
      <div className={`mt-2 text-xs font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        {category}
      </div>
    </div>
  );
};

export default ScholarshipCard; 