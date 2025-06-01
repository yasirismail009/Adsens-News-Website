import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function CookieConsentBanner() {
  const { isDarkMode } = useTheme();

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="global-scholarships-cookie-consent"
      style={{
        background: isDarkMode ? '#1F2937' : '#F3F4F6',
        color: isDarkMode ? '#E5E7EB' : '#374151',
      }}
      buttonStyle={{
        background: '#2563EB',
        color: 'white',
        fontSize: '13px',
        padding: '8px 16px',
        borderRadius: '4px',
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience. By continuing to browse this site, you agree to our use of cookies.{' '}
      <Link 
        href="/cookies"
        className={`underline ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
      >
        Learn more
      </Link>
    </CookieConsent>
  );
} 