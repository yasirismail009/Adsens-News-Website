import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTag?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTag
}) => {
  const siteTitle = 'Global Scholarships - Latest News and Updates';
  const fullTitle = `${title} | ${siteTitle}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalscholarships.com';
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@GlobalScholarships';

  // Generate structured data for news articles
  const structuredData = ogType === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: description,
    image: ogImage,
    datePublished: articlePublishedTime,
    dateModified: articleModifiedTime,
    author: {
      '@type': 'Person',
      name: articleAuthor
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': ogUrl
    }
  } : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article Specific Meta Tags */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
          {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
          {articleAuthor && <meta property="article:author" content={articleAuthor} />}
          {articleSection && <meta property="article:section" content={articleSection} />}
          {articleTag && articleTag.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Global Scholarships" />
      <meta name="news_keywords" content={keywords} />

      {/* Canonical URL */}
      {ogUrl && <link rel="canonical" href={ogUrl} />}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO; 