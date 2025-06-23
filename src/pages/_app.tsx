import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useEffect } from 'react';
import { AdSenseWindow } from '../types';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize AdSense safely
    if (typeof window !== 'undefined') {
      const windowWithAds = window as AdSenseWindow;
      // Ensure adsbygoogle array exists
      windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || [];
      
      // Add error handling for AdSense
      const adsbygoogle = windowWithAds.adsbygoogle;
      const originalPush = adsbygoogle.push;
      adsbygoogle.push = function(...args: Array<Record<string, unknown>>) {
        try {
          return originalPush.apply(this, args);
        } catch (error) {
          console.warn('AdSense push error (likely duplicate ad):', error);
          return adsbygoogle.length;
        }
      };
    }
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
