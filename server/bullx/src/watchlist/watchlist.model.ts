export type EnrichedWatchlistItem = {
  id: number;
  ticker: string;
  name: string;
  lastPrice: number;
  change: number; // or changePercent
};

export interface NewsPublisher {
  favicon_url: string;
  homepage_url: string;
  logo_url: string;
  name: string;
}

export interface NewsInsight {
  sentiment: string;
  sentiment_reasoning: string;
  ticker: string;
}

export interface NewsResult {
  amp_url: string;
  article_url: string;
  author: string;
  description: string;
  id: string;
  image_url: string;
  insights: NewsInsight[];
  keywords: string[];
  published_utc: string;
  publisher: NewsPublisher;
  tickers: string[];
  title: string;
}

export interface ApiNewsResponse {
  count: number;
  request_id: string;
  results: NewsResult[];
  status: string;
}

export interface IWatchlistData {
  id: string;
  title: string;
  description: string;
  article_url: string;
  image_url: string;
  published_utc: string;
  author: string;
  tickers: string[];
  keywords: string[];
  insights: NewsInsight[];
  publisher: NewsPublisher;
}
