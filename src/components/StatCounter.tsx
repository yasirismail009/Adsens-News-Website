const StatCounter: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose ScholarshipForEveryone</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We have helped thousands of students find and secure scholarships to fund their education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-700">Scholarships Listed</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
            <div className="text-gray-700">Scholarship Funding</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
            <div className="text-gray-700">Registered Users</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-700">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCounter; 