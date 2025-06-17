import Layout from '../components/Layout';
import { useTheme } from '../contexts/ThemeContext';

export default function About() {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            About Us
          </h1>

          <div className={`space-y-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Mission
              </h2>
              <p className="mb-4">
                At Global News, we are dedicated to providing comprehensive and accurate news coverage from around the world. Our mission is to keep our readers informed with the latest updates and information across various topics and regions.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                What We Do
              </h2>
              <p className="mb-4">
                We provide:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Up-to-date information on global events and news</li>
                <li>Educational news and updates</li>
                <li>Guidance on application processes</li>
                <li>Resources for international students</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Team
              </h2>
              <p className="mb-4">
                Our team consists of experienced journalists, editors, and researchers who are passionate about delivering accurate and timely news coverage.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                Have questions or need assistance? Reach out to us at{' '}
                <a href="mailto:contact@globalnews.com" className="text-blue-500 hover:text-blue-600">
                  contact@globalnews.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 