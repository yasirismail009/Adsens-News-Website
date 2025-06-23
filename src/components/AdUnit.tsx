import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  className?: string;
  adSlot?: string;
  adFormat?: string;
}

const AdUnit = ({ 
  className = '', 
  adSlot = '4738483448',
  adFormat = 'auto'
}: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for cookie consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'all' || consent === 'advertising') {
      setHasConsent(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && hasConsent && adRef.current && adRef.current.offsetWidth > 0 && !adLoaded) {
      try {
        // Check if adsbygoogle is available
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (err) {
        console.error('Error loading AdSense:', err);
      }
    }
  }, [isClient, hasConsent, adLoaded]);

  // Don't render ad if no consent
  if (!hasConsent) {
    return (
      <div className={`w-full ${className} flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600`}>
        <div className="text-center p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Advertisement
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Accept cookies to view
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={`w-full ${className}`}>
      {isClient && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7534279843511977"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdUnit; 