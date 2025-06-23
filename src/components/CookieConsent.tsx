import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CookieConsent = () => {
  const { isDarkMode } = useTheme();
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
    
    // Trigger Google AdSense
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">We use cookies to enhance your experience</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
              We use cookies and similar technologies to provide personalized content, analyze site traffic, and display relevant advertisements. 
              By clicking "Accept All", you consent to our use of cookies for these purposes.
            </p>
            
            {showDetails && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3 p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}>
                <h4 className="font-semibold mb-2">Cookie Types:</h4>
                <ul className="space-y-1">
                  <li><strong>Necessary cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our site</li>
                  <li><strong>Advertising cookies:</strong> Used by Google AdSense to display relevant ads</li>
                  <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="mt-2">
                  You can manage your cookie preferences at any time through your browser settings or by visiting{' '}
                  <a 
                    href="https://www.google.com/settings/ads" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Google's Ads Settings
                  </a>
                  .
                </p>
              </div>
            )}
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}
            >
              {showDetails ? 'Hide details' : 'Learn more about cookies'}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={decline}
              className={`px-4 py-2 text-sm font-medium rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors`}
            >
              Decline
            </button>
            <button
              onClick={acceptNecessary}
              className={`px-4 py-2 text-sm font-medium rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition-colors`}
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 