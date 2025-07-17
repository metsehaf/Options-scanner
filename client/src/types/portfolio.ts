import { Itransactions, TransactionType } from "./hodlings";
import { SearchResultAsset } from "./search";

export type Portfolio = {
  id: string;
  name: string;
  createdAt: "2025-06-10T00:30:16.694Z";
  holdings: any[];
};

export interface PortfolioSearchBarProps {
  isOpen?: boolean;
  market?: "stocks" | "crypto" | "fx" | "otc" | "indices";
  onSelectAsset: (asset: SearchResultAsset) => void;
  initialQuery?: string;
}

export interface InvestmentFormData {
  portfolioId: string;
  transactionType: TransactionType;
  searchQuery: string;
  symbol: string;
  name: string;
  quantity: number | "";
  price: number | "";
  date: string;
  fees: number | "";
  bondName?: string;
  assetCategory?: string;
}

export interface FormErrors {
  portfolioId?: string;
  transactionType?: string;
  searchQuery?: string;
  symbol?: string;
  name?: string;
  quantity?: string; // Change to string for error message
  price?: string; // Change to string for error message
  date?: string;
  fees?: string;
  bondName?: string;
  assetCategory?: string;
}

interface cursor {
  cursorId: number;
}

export interface PortfolioWithHoldings {
  data: PortfolioHolding[];
  nextCursor: cursor | null;
  totalValue: number;
  totalGainLoss: number;
  totalDayLoss: number;
  gainLossPercent: number;
  dayLossPercent: number;
}

interface PortfolioHolding {
  id: string;
  ticker: string;
  companyName: string;
  quantity: number;
  avgCost: number;
  currentPrice?: number;
  totalValue?: number;
  gainLoss?: number;
  lastUpdated: Date;
  createdAt: Date;
}

export interface PortfolioChartData {
  xAxis: string[]; // ISO date strings
  series: number[];
}

export interface Cursor {
  cursorId: number;
}

export type PortfolioService = {
  addToPortfolio: (portfolio: string) => Promise<any>;
  getPortfolio: () => Promise<Portfolio[]>;
  getPortfolioWithHoldings: (
    portfolioId: string | undefined,
    limit?: number,
    cursorId?: number
  ) => Promise<PortfolioWithHoldings>;
  addHolding: (
    portfolioId: string,
    symbol: string,
    quant: number,
    cost: number,
    companyName: string,
    transactionType: string,
    transactionDate: string
  ) => Promise<any>;
  removeFromHoldings: (stockId: string | undefined) => Promise<any>;
  getChartData: (portfolioId: string) => Promise<PortfolioChartData>;
  getTransactions: (
    portfolioId: string,
    limit?: number,
    offset?: number
  ) => Promise<any>;
};

export interface PortfolioTransactionData {
  transactions: Itransactions[];
  total: number;
}

export interface PortfolioHighlightsProps {
  dayGain: number | undefined;
  dayGainPercentage: number | undefined;
  totalGain: number | undefined;
  totalGainPercentage: number | undefined;
  assetBreakdown: {
    label: string;
    percentage: number;
    value: number;
    color: string;
  }[];
  companySizeBreakdown: { label: string; percentage: number }[];
  dividendBreakdown: { label: string; percentage: number }[];
  peRatioBreakdown: { label: string; percentage: number }[];
}
