export interface IWatchlist {
  id: number;
  ticker: string;
  name: string;
  lastPrice: number;
  change: number; // or changePercent
}

interface cursor {
  cursorId: number;
}

export interface IWatchlistResponse {
  results: IWatchlist[];
  nextCursor: cursor | null;
}

export type IEarningsCalendar = {
  symbol: string;
  date: string;
  epsActual: number;
  epsEstimated: number;
  revenueActual: number;
  revenueEstimated: number;
  lastUpdated: string;
};

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
