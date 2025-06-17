import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PublisherPolicies = () => {
  return (
    <Layout>
      <SEO 
        title="Publisher Policies - Global News"
        description="Learn about our publisher policies and guidelines for content monetization with Google ad code."
        keywords={["publisher policies", "ad policies", "content guidelines", "monetization rules"]}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Publisher Policies</h1>
        
        <div className="prose max-w-none">
          <p className="mb-6">
            When you monetize your content with Google ad code you are required to adhere to the following policies. 
            Failure to comply with these policies may result in Google blocking ads from appearing against your content, 
            or suspending or terminating your account.
          </p>

          <p className="mb-6">
            These policies apply in addition to any other policies governing your use of Google publisher products.
          </p>

          <p className="mb-8">
            Google helps to enable a free and open internet by helping publishers monetize their content and advertisers 
            reach prospective customers with useful, relevant products and services. Maintaining trust in the ads ecosystem 
            requires setting limits on what we will monetize.
          </p>

          <h2 className="text-2xl font-bold mb-4">Policy Categories</h2>
          <ul className="list-disc pl-6 mb-8">
            <li>Content policies</li>
            <li>Behavioral policies</li>
            <li>Privacy-related policies</li>
            <li>Requirements and other standards</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Content Policies</h2>
          
          <h3 className="text-xl font-bold mb-3">Illegal Content</h3>
          <p className="mb-6">
            We do not allow content that is illegal, promotes illegal activity, or infringes on the legal rights of others.
          </p>

          <h3 className="text-xl font-bold mb-3">Intellectual Property Abuse</h3>
          <p className="mb-6">
            We do not allow content that infringes copyright or sells/promotes counterfeit products.
          </p>

          <h3 className="text-xl font-bold mb-3">Dangerous or Derogatory Content</h3>
          <p className="mb-6">
            We do not allow content that incites hatred, promotes discrimination, harasses, intimidates, or threatens others.
          </p>

          <h2 className="text-2xl font-bold mb-4">Behavioral Policies</h2>
          
          <h3 className="text-xl font-bold mb-3">Dishonest Declarations</h3>
          <p className="mb-6">
            Information provided by publishers must be materially accurate and complete, without misleading omissions.
          </p>

          <h3 className="text-xl font-bold mb-3">Ads Interfering</h3>
          <p className="mb-6">
            We do not allow Google-served ads that interfere with content or user interactions.
          </p>

          <h2 className="text-2xl font-bold mb-4">Privacy-Related Policies</h2>
          
          <h3 className="text-xl font-bold mb-3">Personalized Advertising</h3>
          <p className="mb-6">
            You must not use Google's platform products to select or target personalized ads based on sensitive information.
          </p>

          <h3 className="text-xl font-bold mb-3">Privacy Disclosures</h3>
          <p className="mb-6">
            Publishers must have and abide by a privacy policy that clearly discloses data collection and usage.
          </p>

          <h2 className="text-2xl font-bold mb-4">Requirements and Other Standards</h2>
          
          <h3 className="text-xl font-bold mb-3">Spam Policies</h3>
          <p className="mb-6">
            You must not place Google-served ads on screens that violate the Spam policies for Google web search.
          </p>

          <h3 className="text-xl font-bold mb-3">Malware or Unwanted Software</h3>
          <p className="mb-6">
            You must not place Google-served ads on screens that contain malicious software or violate Google's Unwanted Software policy.
          </p>

          <h3 className="text-xl font-bold mb-3">Better Ads Standards</h3>
          <p className="mb-6">
            You must not place Google-served ads on screens that do not conform to the Better Ads Standards.
          </p>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              For more detailed information about these policies, please visit the 
              <a 
                href="https://support.google.com/adspolicy/answer/6008942" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 ml-1"
              >
                Google Publisher Policies Help Center
              </a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublisherPolicies; 