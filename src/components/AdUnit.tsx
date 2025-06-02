import { useEffect } from 'react';

interface AdUnitProps {
  className?: string;
}

const AdUnit = ({ className = '' }: AdUnitProps) => {
  useEffect(() => {
    try {
      // @ts-expect-error - adsbygoogle is injected by Google AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7534279843511977"
        data-ad-slot="4738483448"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit; 