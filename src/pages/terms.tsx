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
                    We use the News API (https://newsapi.org) to provide news content. By using our service, you agree to comply with News API&apos;s terms of service. The News API is a third-party service that aggregates news articles from various sources. We do not control the content of the news articles, and we are not responsible for any inaccuracies or issues with the content provided by News API.
                  </p>
                </li>
                <li>
                  <strong>Google AdSense</strong>
                  <p className="mt-2">
                    We use Google AdSense to display advertisements. By using our service, you agree to comply with Google AdSense&apos;s terms of service. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                User Responsibilities
              </h2>
              <p className="mb-4">
                By using our website, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Not use our services for any illegal purposes</li>
                <li>Not attempt to interfere with our services</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Intellectual Property
              </h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of Global News or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express permission.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Limitation of Liability
              </h2>
              <p>
                Global News shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee the accuracy, completeness, or usefulness of any information on the website.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@globalnews.com" className="text-blue-500 hover:text-blue-600">
                  legal@globalnews.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 