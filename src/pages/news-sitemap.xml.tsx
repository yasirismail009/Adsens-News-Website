import { GetServerSideProps } from 'next';

const EXTERNAL_DATA_URL = 'https://globalnews.com';

function generateNewsSiteMap(articles: Array<{
  url: string;
  title: string;
  publicationDate: string;
  keywords: string[];
}>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
     ${articles
       .map((article) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${article.url}`}</loc>
           <news:news>
               <news:publication>
                   <news:name>Global News</news:name>
                   <news:language>en</news:language>
               </news:publication>
               <news:publication_date>${article.publicationDate}</news:publication_date>
               <news:title>${article.title}</news:title>
               <news:keywords>${article.keywords.join(', ')}</news:keywords>
           </news:news>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function NewsSiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // In a real application, you would fetch this from your database
  const articles = [
    {
      url: '/news/latest-updates-2024',
      title: 'Latest News Updates for 2024',
      publicationDate: '2024-03-20T12:00:00Z',
      keywords: ['news', '2024', 'updates', 'information'],
    },
    {
      url: '/news/study-abroad-guide',
      title: 'Complete Guide to Studying Abroad',
      publicationDate: '2024-03-19T15:30:00Z',
      keywords: ['study abroad', 'international education', 'guide'],
    },
  ];

  const sitemap = generateNewsSiteMap(articles);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default NewsSiteMap; 