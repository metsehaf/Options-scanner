export interface SearchResult {
  name: string;
  exchange: string;
  country: string;
  currency: string;
  ticker: string;
  type: string;
}

export interface ChartPoint {
  time: string; // ISO or formatted time
  price: number;
}

export type IStockData = {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  open: number;
  percentChange: number;
  dayRange: string;
  yearRange: string;
  marketCap: string;
  volume: string;
  avgVolume: string;
  peRatio: number;
  dividendYield: number;
  exchange: string;
  chart: ChartPoint[]; // Example chart data
};

// Types
export interface SearchResultAsset {
  ticker: string;
  name: string;
  //   currentPrice: number; // <-- This property is required here...
}
