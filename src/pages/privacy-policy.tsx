import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function PrivacyPolicy() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Privacy Policy
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                New York Times API
              </h2>
              <p className="mb-4">
                Our website uses the New York Times API to provide you with news content. When you access news articles through our platform, we may share certain information with The New York Times Company to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Retrieve and display news articles and related content</li>
                <li>Track article views and engagement metrics</li>
                <li>Ensure compliance with The New York Times&apos; terms of service</li>
                <li>Improve the quality and relevance of news content</li>
              </ul>
              <p className="mb-4">
                The New York Times may collect certain information about your interaction with their content, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Article view counts and reading time</li>
                <li>Device and browser information</li>
                <li>IP address and general location data</li>
                <li>Referral information</li>
              </ul>
              <p>
                For more information about how The New York Times handles your data, please refer to their{' '}
                <a 
                  href="https://www.nytimes.com/privacy/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Google AdSense
              </h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google&apos;s Ads Settings page.
              </p>
              <p>
                Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting Ads Settings.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Security
              </h2>
              <p>
                We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@globalnews.com" className="text-blue-500 hover:text-blue-600">
                  privacy@globalnews.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 