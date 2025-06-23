import { useEffect, useRef, useState } from 'react';
import { AdSenseWindow } from '../types';

interface AdUnitProps {
  className?: string;
  adSlot?: string;
  adFormat?: string;
  uniqueId?: string;
}

const AdUnit = ({ 
  className = '', 
  adSlot = '4738483448',
  adFormat = 'auto',
  uniqueId
}: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adId] = useState(() => uniqueId || `ad-${Math.random().toString(36).substr(2, 9)}`);

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
        // Check if adsbygoogle is available and the element doesn't already have ads
        const windowWithAds = window as AdSenseWindow;
        if (typeof window !== 'undefined' && windowWithAds.adsbygoogle) {
          const insElement = adRef.current.querySelector('ins.adsbygoogle');
          if (insElement && !insElement.hasAttribute('data-ad-status')) {
            (windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || []).push({});
            setAdLoaded(true);
          }
        }
      } catch (err) {
        console.error('Error loading AdSense:', err);
        setAdLoaded(true); // Prevent infinite retries
      }
    }
  }, [isClient, hasConsent, adLoaded]);

  // Cleanup function
  useEffect(() => {
    const currentAdRef = adRef.current;
    
    return () => {
      // Cleanup when component unmounts
      if (currentAdRef) {
        const insElement = currentAdRef.querySelector('ins.adsbygoogle');
        if (insElement) {
          insElement.removeAttribute('data-ad-status');
        }
      }
    };
  }, []);

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
    <div ref={adRef} className={`w-full ${className}`} data-ad-id={adId}>
      {isClient && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7534279843511977"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
          key={adId}
        />
      )}
    </div>
  );
};

export default AdUnit; 