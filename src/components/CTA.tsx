import Link from 'next/link';

const CTA: React.FC = () => {
  return (
    <div className="bg-blue-700 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Find Your Perfect Scholarship?
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
          Join thousands of students who have already discovered and secured scholarships through our platform. 
          Sign up for free to get personalized scholarship recommendations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/register" 
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold text-center transition-colors"
          >
            Sign Up for Free
          </Link>
          <Link 
            href="/scholarships" 
            className="bg-transparent hover:bg-blue-800 border-2 border-white text-white px-8 py-3 rounded-md font-semibold text-center transition-colors"
          >
            Browse Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA; 