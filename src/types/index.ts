export interface Multimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

export interface Article {
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

export interface TopStoriesResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: Article[];
}

// Google AdSense Types
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export interface AdSenseConfig {
  'data-ad-client': string;
  'data-ad-slot': string;
  'data-ad-format': string;
  'data-full-width-responsive': string;
}

export interface AdSenseWindow extends Window {
  adsbygoogle: Array<Record<string, unknown>>;
}

export interface CookieConsent {
  type: 'all' | 'necessary' | 'advertising' | 'declined';
  date: string;
}

export interface PrivacySettings {
  analytics: boolean;
  advertising: boolean;
  necessary: boolean;
} 