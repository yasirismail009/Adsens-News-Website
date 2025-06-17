import { NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-red-600 dark:text-red-400">
            {statusCode || 'Error'}
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sorry, something went wrong. Please try again later.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 