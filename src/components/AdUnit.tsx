import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  className?: string;
}

const AdUnit = ({ className = '' }: AdUnitProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && adRef.current && adRef.current.offsetWidth > 0) {
      try {
        // @ts-expect-error - adsbygoogle is injected by Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('Error loading AdSense:', err);
      }
    }
  }, [isClient]);

  return (
    <div ref={adRef} className={`w-full ${className}`}>
      {isClient && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-7534279843511977"
          data-ad-slot="4738483448"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
};

export default AdUnit; 