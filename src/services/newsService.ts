import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://newsapi.org/v2';

export interface NewsArticle {
  uuid: string;
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
  categories: string[];
  section?: string;
  subsection?: string;
  byline?: string;
  multimedia?: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }>;
  des_facet?: string[];
  org_facet?: string[];
  per_facet?: string[];
  geo_facet?: string[];
  kicker?: string;
  item_type?: string;
  updated_date?: string;
  created_date?: string;
}

export interface NewsResponse {
  results: NewsArticle[];
}

export const fetchTopHeadlines = async (): Promise<NewsResponse> => {
  if (!API_KEY) {
    throw new Error('News API configuration is missing');
  }

  try {
    const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=0Xn3xkJ3eaMFx4l0tofdsWFLseOz9ok7');
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}; 