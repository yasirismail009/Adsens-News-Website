import Link from 'next/link';

const CTA: React.FC = () => {
  return (
    <div className="bg-blue-700 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated with Latest News
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Join thousands of readers who stay informed with our comprehensive news coverage.
          Sign up for free to get personalized news updates.
        </p>
        <Link
          href="/news"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Browse News
        </Link>
      </div>
    </div>
  );
};

export default CTA; 