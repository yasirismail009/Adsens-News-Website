import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function CookiesPolicy() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Cookie Policy
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                What Are Cookies
              </h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                How We Use Cookies
              </h2>
              <p className="mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies: Required for the website to function properly</li>
                <li>Preference cookies: Remember your settings and preferences</li>
                <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                <li>Advertising cookies: Used by Google AdSense to serve relevant advertisements</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Cookies
              </h2>
              <p className="mb-4">
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google AdSense: For displaying advertisements</li>
                <li>Google Analytics: For analyzing website usage</li>
                <li>News API: For providing news content</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Managing Cookies
              </h2>
              <p className="mb-4">
                You can control and manage cookies in your browser settings. However, please note that disabling certain cookies may affect the functionality of our website.
              </p>
              <p className="mb-4">
                To opt out of Google's use of cookies for advertising purposes, visit Google's Ads Settings page.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at [Your Contact Information].
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Last Updated
              </h2>
              <p>
                This Cookie Policy was last updated on {new Date().toLocaleDateString()}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 