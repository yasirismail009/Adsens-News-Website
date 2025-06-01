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
                Google AdSense
              </h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites. You can opt out of personalized advertising by visiting Google's Ads Settings page.
              </p>
              <p>
                Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the internet. You may opt out of personalized advertising by visiting Ads Settings.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party APIs
              </h2>
              <p className="mb-4">
                Our website uses the News API (https://newsapi.org) to provide news content. The News API is a third-party service that aggregates news articles from various sources. By using our website, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>News content is provided by News API and its sources</li>
                <li>We do not control the content of the news articles</li>
                <li>News API may collect and process data according to their privacy policy</li>
                <li>You should review News API's terms of service and privacy policy</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Collection and Usage
              </h2>
              <p className="mb-4">
                We collect and process the following types of data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Search queries you enter on our website</li>
                <li>Information about your device and browser</li>
                <li>Usage data to improve our services</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Rights
              </h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of personalized advertising</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at [Your Contact Information].
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Last Updated
              </h2>
              <p>
                This Privacy Policy was last updated on {new Date().toLocaleDateString()}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 