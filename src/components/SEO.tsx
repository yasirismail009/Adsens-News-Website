import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  section?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO = ({
  title = 'Global News - Latest Updates and Information',
  description = 'Stay updated with the latest news, information, and resources from around the world.',
  image = 'https://globalnews.com/og-image.jpg',
  article = false,
  publishedTime,
  modifiedTime,
  authors = ['Global News Team'],
  tags = ['news', 'updates', 'information'],
  section,
  keywords = ['news', 'updates', 'information', 'global'],
  noindex = false,
  nofollow = false,
}: SEOProps) => {
  const router = useRouter();
  const canonicalUrl = `https://globalnews.com${router.asPath}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots Meta */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`} 
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Global News" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@globalnews" />
      <meta name="twitter:creator" content="@globalnews" />

      {/* Article Specific Meta Tags */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          {section && <meta property="article:section" content={section} />}
          {authors.map((author) => (
            <meta key={author} property="article:author" content={author} />
          ))}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* News Specific Meta Tags */}
      {article && (
        <>
          <meta name="news_keywords" content={keywords.join(', ')} />
          <meta name="date" content={publishedTime} />
          <meta name="author" content={authors.join(', ')} />
        </>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': article ? 'NewsArticle' : 'WebPage',
            headline: title,
            description: description,
            image: image,
            url: canonicalUrl,
            publisher: {
              '@type': 'Organization',
              name: 'Global News',
              logo: {
                '@type': 'ImageObject',
                url: 'https://globalnews.com/logo.png'
              }
            },
            ...(article && {
              datePublished: publishedTime,
              dateModified: modifiedTime,
              author: authors.map((author) => ({
                '@type': 'Person',
                name: author,
              })),
              keywords: keywords.join(', '),
              articleSection: section,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl
              }
            }),
          }),
        }}
      />
    </Head>
  );
};

export default SEO; 