import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function Cookies() {
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
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They&apos;re widely used to make websites work more efficiently and provide a better user experience.
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
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand how visitors use our website</li>
                <li>Advertising cookies to deliver relevant advertisements</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Cookies
              </h2>
              <p className="mb-4">
                We use the following third-party services that may set cookies:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <strong>Google Analytics</strong>
                  <p className="mt-2">
                    We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect information about your visit, including the pages you view and the time you spend on our site.
                  </p>
                </li>
                <li>
                  <strong>Google AdSense</strong>
                  <p className="mt-2">
                    We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website and other sites.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Managing Cookies
              </h2>
              <p className="mb-4">
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our website.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at{' '}
                <a href="mailto:yasirismailbusiness@gmail.com" className="text-blue-500 hover:text-blue-600">
                yasirismailbusiness@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 