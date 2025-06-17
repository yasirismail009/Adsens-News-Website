import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export interface NewsArticle {
  uuid: string;
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: {
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }[];
  short_url: string;
  source: string;
}

export interface NewsResponse {
  results: NewsArticle[];
  total: number;
}

export const fetchTopHeadlines = async (category: string = 'world'): Promise<NewsResponse> => {
  if (!API_KEY) {
    throw new Error('News API configuration is missing');
  }

  try {
    const response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=gnJGYE8hIG4DAdd5uMVHAdjdkqrbRPBQ`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}; 