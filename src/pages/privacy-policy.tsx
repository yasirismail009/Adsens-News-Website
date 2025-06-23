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
                Introduction
              </h2>
              <p className="mb-4">
                This Privacy Policy describes how Global Scholarships (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, and shares information about you when you visit our website. This policy applies to all platforms, surfaces, and properties where we operate, including web, mobile applications, and other digital services.
              </p>
              <p className="mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
                <li>Create an account (if applicable)</li>
              </ul>
              <p className="mb-4">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and general location data</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referral information</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Google AdSense and Advertising
              </h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Serve ads based on your prior visits to our website and other sites</li>
                <li>Provide personalized advertising experiences</li>
                <li>Analyze ad performance and user engagement</li>
                <li>Prevent fraud and ensure ad quality</li>
              </ul>
              <p className="mb-4">
                <strong>Third-party cookies:</strong> Third parties, including Google, may place and read cookies on your browser, or use web beacons or IP addresses to collect information as a result of ad serving on our website.
              </p>
              <p className="mb-4">
                <strong>Opt-out options:</strong> You can opt out of personalized advertising by visiting{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  Google&apos;s Ads Settings
                </a>
                {' '}or the{' '}
                <a 
                  href="https://optout.networkadvertising.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  Network Advertising Initiative
                </a>
                .
              </p>
              <p className="mb-4">
                For more information about how Google uses data when you use our partners&apos; sites or apps, visit{' '}
                <a 
                  href="https://policies.google.com/technologies/partner-sites" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600"
                >
                  How Google uses data when you use our partners&apos; sites or apps
                </a>
                .
              </p>
            </section>

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
                How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Display relevant advertisements</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends and usage</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Information Sharing
              </h2>
              <p className="mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service providers:</strong> Companies that help us operate our website and provide services</li>
                <li><strong>Advertising partners:</strong> Including Google AdSense and other advertising networks</li>
                <li><strong>Content providers:</strong> Such as The New York Times for API services</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Cookies and Tracking Technologies
              </h2>
              <p className="mb-4">
                We use cookies, web beacons, and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Ensure website functionality and security</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Your Rights and Choices
              </h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Children&apos;s Privacy
              </h2>
              <p>
                Our website is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:{' '}
                <a href="mailto:privacy@globalscholarships.com" className="text-blue-500 hover:text-blue-600">
                  privacy@globalscholarships.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 