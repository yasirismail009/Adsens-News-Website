import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useTheme } from '../contexts/ThemeContext';

const PublisherPolicies = () => {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <SEO 
        title="Publisher Policies - Global News"
        description="Learn about our publisher policies and guidelines for content monetization with Google ad code."
        keywords={["publisher policies", "ad policies", "content guidelines", "monetization rules"]}
      />
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen py-8 transition-colors duration-200`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Publisher Policies & Content Standards
          </h1>

          <div className={`space-y-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Our Commitment to Quality Content
              </h2>
              <p className="mb-4">
                Global Scholarships is committed to maintaining the highest standards of content quality and user experience. 
                We adhere to Google&apos;s Publisher Policies to ensure a safe, trustworthy environment for our readers and advertisers.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Content Standards
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    ✅ What We Allow
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Educational news and scholarship information</li>
                    <li>Legitimate academic and career guidance</li>
                    <li>Factual reporting on educational opportunities</li>
                    <li>Professional development resources</li>
                    <li>International education news and updates</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    ❌ What We Prohibit
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Illegal content or activities</li>
                    <li>Misleading or deceptive information</li>
                    <li>Hate speech or discriminatory content</li>
                    <li>Violent or harmful content</li>
                    <li>Spam or low-quality content</li>
                    <li>Copyright infringement</li>
                    <li>Adult or inappropriate content</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Advertising Standards
              </h2>
              <div className="space-y-4">
                <p>
                  We maintain strict advertising standards to ensure a positive user experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All ads are clearly labeled as advertisements</li>
                  <li>We do not allow ads that interfere with content consumption</li>
                  <li>Ad placement follows Google&apos;s Better Ads Standards</li>
                  <li>We maintain a reasonable balance between content and advertisements</li>
                  <li>Ads are contextually relevant and appropriate for our audience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Privacy & Data Protection
              </h2>
              <div className="space-y-4">
                <p>
                  We are committed to protecting user privacy and complying with data protection regulations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clear privacy policy with detailed information about data collection</li>
                  <li>Cookie consent mechanism for EU users</li>
                  <li>No collection of personal information from children under 13</li>
                  <li>Secure handling of user data</li>
                  <li>Transparent disclosure of third-party data sharing</li>
                  <li>User rights to access, correct, and delete personal information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Content Moderation
              </h2>
              <div className="space-y-4">
                <p>
                  Our content moderation process ensures quality and compliance:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular review of all published content</li>
                  <li>Fact-checking of educational and scholarship information</li>
                  <li>Monitoring for policy violations</li>
                  <li>Prompt removal of non-compliant content</li>
                  <li>User reporting system for policy violations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                User Experience Standards
              </h2>
              <div className="space-y-4">
                <p>
                  We maintain high standards for user experience:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fast loading times and responsive design</li>
                  <li>Clear navigation and user interface</li>
                  <li>Mobile-friendly experience</li>
                  <li>Accessible design for users with disabilities</li>
                  <li>No misleading clickbait or deceptive practices</li>
                  <li>Clear distinction between editorial content and advertisements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Reporting Violations
              </h2>
              <div className="space-y-4">
                <p>
                  If you encounter content that violates our policies, please report it:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email us at: <a href="mailto:compliance@globalscholarships.com" className="text-blue-500 hover:text-blue-600">compliance@globalscholarships.com</a></li>
                  <li>Include specific details about the violation</li>
                  <li>Provide URLs or screenshots when possible</li>
                  <li>We will investigate and take appropriate action within 24-48 hours</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Compliance Monitoring
              </h2>
              <div className="space-y-4">
                <p>
                  We continuously monitor our compliance with these policies:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular policy reviews and updates</li>
                  <li>Automated and manual content screening</li>
                  <li>User feedback analysis</li>
                  <li>Industry best practices implementation</li>
                  <li>Regular training for content moderators</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Information
              </h2>
              <div className="space-y-4">
                <p>
                  For questions about our publisher policies or to report violations:
                </p>
                <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}>
                  <p><strong>Compliance Team:</strong> <a href="mailto:compliance@globalscholarships.com" className="text-blue-500 hover:text-blue-600">compliance@globalscholarships.com</a></p>
                  <p><strong>Privacy Officer:</strong> <a href="mailto:privacy@globalscholarships.com" className="text-blue-500 hover:text-blue-600">privacy@globalscholarships.com</a></p>
                  <p><strong>General Support:</strong> <a href="mailto:support@globalscholarships.com" className="text-blue-500 hover:text-blue-600">support@globalscholarships.com</a></p>
                </div>
              </div>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Policy Updates
              </h2>
              <p>
                This policy is reviewed and updated regularly to ensure compliance with current standards and regulations. 
                The last update was made on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublisherPolicies; 