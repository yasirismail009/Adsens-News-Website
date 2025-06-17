import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export interface NYTRssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: {
    '#text': string;
    '@_isPermaLink': string;
  };
  'atom:link': {
    '@_href': string;
  };
  creator: string;
  category: Array<{
    '#text': string;
    '@_domain': string;
  }>;
  'media:content'?: Array<{
    '@_url': string;
    '@_medium': string;
    '@_height': string;
    '@_width': string;
  }>;
  'media:credit'?: string;
  'media:description'?: string;
}

export interface NYTRssChannel {
  title: string;
  link: string;
  'atom:link': {
    '@_href': string;
  };
  description: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  'image': {
    title: string;
    url: string;
    link: string;
  };
  item: NYTRssItem[];
}

export interface NYTRssResponse {
  rss: {
    '@_xmlns:dc': string;
    '@_xmlns:media': string;
    channel: NYTRssChannel;
  };
}

export const fetchNYTRssFeed = async (section: NYTRssSection): Promise<NYTRssResponse> => {
  try {
    const response = await axios.get(`https://api.nytimes.com/services/xml/rss/nyt/${section}.xml`, {
      responseType: 'text'
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseAttributeValue: true,
      parseTagValue: true,
      trimValues: true,
      isArray: (name, jpath, isLeafNode, isAttribute) => {
        return name === 'item' || name === 'category' || name === 'media:content';
      }
    });

    const result = parser.parse(response.data);
    return result;
  } catch (error) {
    console.error(`Error fetching NYT RSS feed for section ${section}:`, error);
    throw error;
  }
};

// Available sections for the NYT RSS feed
export const NYT_RSS_SECTIONS = [
  'HomePage',
  'World',
  'US',
  'Politics',
  'NYRegion',
  'Business',
  'Opinion',
  'Science',
  'Health',
  'Sports',
  'Arts',
  'Books',
  'Movies',
  'Theater',
  'SundayReview',
  'Fashion',
  'Magazine',
  'Food',
  'Travel',
  'RealEstate',
  'Automobiles',
  'Obituaries',
  'Insider'
] as const;

export type NYTRssSection = typeof NYT_RSS_SECTIONS[number]; 