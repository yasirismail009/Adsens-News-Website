import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function Terms() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Terms of Service
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Services
              </h2>
              <p className="mb-4">
                Our website uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>News API</strong>
                  <p className="mt-2">
                    We use the News API (https://newsapi.org) to provide news content. By using our service, you agree to comply with News API's terms of service. The News API is a third-party service that aggregates news articles from various sources. We do not control the content of the news articles, and we are not responsible for any inaccuracies or issues with the content provided by News API.
                  </p>
                </li>
                <li>
                  <strong>Google AdSense</strong>
                  <p className="mt-2">
                    We use Google AdSense to display advertisements. By using our service, you agree to comply with Google AdSense's terms of service. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Content Disclaimer
              </h2>
              <p className="mb-4">
                The news content provided through our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Is sourced from third-party providers</li>
                <li>May not be accurate or up-to-date</li>
                <li>Should not be considered as professional advice</li>
                <li>Is subject to the terms and conditions of the original sources</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                User Responsibilities
              </h2>
              <p className="mb-4">
                By using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not misuse or abuse the service</li>
                <li>Not attempt to circumvent any rate limits or restrictions</li>
                <li>Respect the intellectual property rights of content providers</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Service Limitations
              </h2>
              <p className="mb-4">
                Our service is subject to the following limitations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>News content availability depends on third-party providers</li>
                <li>Service may be interrupted for maintenance or updates</li>
                <li>We reserve the right to modify or discontinue the service</li>
                <li>We are not responsible for any loss of data or service interruption</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Information
              </h2>
              <p>
                For any questions regarding these terms, please contact us at [Your Contact Information].
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Last Updated
              </h2>
              <p>
                These Terms of Service were last updated on {new Date().toLocaleDateString()}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 