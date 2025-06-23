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
                Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using Global Scholarships (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Description of Service
              </h2>
              <p className="mb-4">
                Global Scholarships provides educational news, scholarship information, and career guidance content. Our services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>News aggregation and reporting on educational topics</li>
                <li>Scholarship and financial aid information</li>
                <li>Career and academic guidance resources</li>
                <li>Educational content and analysis</li>
                <li>Newsletter and communication services</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                User Conduct
              </h2>
              <p className="mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the service for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Submit false or misleading information</li>
                <li>Use automated systems to access our services</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Intellectual Property Rights
              </h2>
              <p className="mb-4">
                The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Global Scholarships or its content suppliers and is protected by copyright laws.
              </p>
              <p className="mb-4">
                You may not reproduce, distribute, modify, or create derivative works from this content without our express written consent.
              </p>
              <p>
                We respect the intellectual property rights of others and expect our users to do the same. If you believe your work has been copied in a way that constitutes copyright infringement, please contact us.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Third-Party Content and Services
              </h2>
              <p className="mb-4">
                Our website may contain links to third-party websites and services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>The New York Times API for news content</li>
                <li>Google AdSense for advertising services</li>
                <li>Other educational and news sources</li>
              </ul>
              <p>
                We are not responsible for the content, privacy policies, or practices of any third-party websites or services. Your use of third-party services is at your own risk.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Advertising and Monetization
              </h2>
              <p className="mb-4">
                We use Google AdSense to display advertisements on our website. By using our services, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Advertisements may be displayed on our website</li>
                <li>Google may use cookies and similar technologies for ad personalization</li>
                <li>You can opt out of personalized advertising through Google&apos;s Ads Settings</li>
                <li>We maintain editorial independence from our advertisers</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Privacy and Data Protection
              </h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p>
                By using our services, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Disclaimers and Limitations of Liability
              </h2>
              <p className="mb-4">
                <strong>Disclaimer of Warranties:</strong> Our services are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied.
              </p>
              <p className="mb-4">
                <strong>Limitation of Liability:</strong> In no event shall Global Scholarships be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our services.
              </p>
              <p>
                <strong>Accuracy of Information:</strong> While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or timeliness of any content on our website.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Global Scholarships, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of our services or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Termination
              </h2>
              <p className="mb-4">
                We may terminate or suspend your access to our services immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p>
                Upon termination, your right to use our services will cease immediately, and we may delete any user data associated with your account.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Governing Law and Jurisdiction
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Global Scholarships operates, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these Terms or your use of our services shall be resolved in the courts of competent jurisdiction in our operating jurisdiction.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
              </p>
              <p>
                Your continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Severability
              </h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Contact Information
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:{' '}
                <a href="mailto:legal@globalscholarships.com" className="text-blue-500 hover:text-blue-600">
                  legal@globalscholarships.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 