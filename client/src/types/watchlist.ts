export interface IWatchlist {
  id: number;
  ticker: string;
  name: string;
  lastPrice: number;
  change: number; // or changePercent
}

export interface IWatchlistResponse {
  watchlist: IWatchlist[];
}

export type IWatchlistNews = {
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
};

interface NewsPublisher {
  favicon_url: string;
  homepage_url: string;
  logo_url: string;
  name: string;
}

interface NewsInsight {
  sentiment: string;
  sentiment_reasoning: string;
  ticker: string;
}
