export interface SearchResult {
    name: string;
    exchange: string;
    country: string;
    currency: string;
    ticker: string;
    type: string;
};

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
  chart: number[];
};