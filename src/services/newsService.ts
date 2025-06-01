import axios from 'axios';

const API_KEY = '313971675a154a8f997840d98c7ebdf7';
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export const fetchNews = async (query: string = 'tesla', from: string = '2025-05-01'): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from,
        sortBy: 'publishedAt',
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const fetchTopHeadlines = async (country: string = 'us'): Promise<NewsResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
}; 