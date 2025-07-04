import { Observable } from 'rxjs';

export abstract class SearchServiceModel {
  abstract search(
    query: string[],
    apiKey: string | undefined,
    epURL: string | undefined,
  ): Observable<SearchResult[]>;
  abstract searchTicker(
    ticker: string,
    FMPAPIKey: string | undefined,
    FMPURL: string | undefined,
    FMP_URL_V3: string | undefined,
  ): Observable<IStockData>;
}

export interface ChartPoint {
  time: string; // ISO or formatted time
  price: number;
}
export interface ApiSearchResponse {
  count: number;
  request_id: string;
  results: ApiResult[];
  status: string;
}

export interface ApiResult {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
}

export interface SearchResult {
  name: string;
  exchange: string;
  country: string;
  currency: string;
  ticker: string;
  type: string;
}

export type IStockData = {
  symbol: string;
  name: string;
  price: number;
  previousClose?: number;
  open?: number;
  percentChange: number;
  dayRange: string;
  yearRange: string;
  marketCap: string;
  volume: string;
  avgVolume: string;
  peRatio?: number;
  dividendYield: number; // This is a percentage, e.g., 1.5 for 1.5%
  // chart data should be an array of objects with time and price
  exchange: string;
  chart: ChartPoint[]; // Example chart data
};

export interface ApiTicker {
  name: string;
  symbol: string;
  cik: string;
  isin: string;
  cusip: string;
  ein_employer_id: string;
  lei: string;
  series_id: string;
  item_type: string;
  sector: string;
  industry: string;
  sic_code: string;
  sic_name: string;
  stock_exchange: {
    name: string;
    acronym: string;
    mic: string;
    country: string | null;
    country_code: string;
    city: string;
    website: string;
    operating_mic: string;
    oprt_sgmt: string;
    legal_entity_name: string;
    exchange_lei: string;
    market_category_code: string;
    exchange_status: string;
    date_creation: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    date_last_update: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    date_last_validation: {
      date: string;
      timezone_type: number;
      timezone: string;
    };
    date_expiry: string | null;
    comments: string;
  };
}

export interface FmpEodData {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

export interface FmpQuoteData {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
}
export interface ApiStockData {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: Array<{
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adj_high: number;
    adj_low: number;
    adj_close: number;
    adj_open: number;
    adj_volume: number;
    split_factor: number;
    dividend: number;
    name: string;
    exchange_code: string;
    asset_type: string;
    price_currency: string;
    symbol: string;
    exchange: string;
    date: string;
  }>;
}

export interface MarketCapData {
  symbol: string;
  date: string;
  marketCap: number;
}

export interface RatioTTM {
  symbol: string;
  grossProfitMarginTTM: number;
  ebitMarginTTM: number;
  ebitdaMarginTTM: number;
  operatingProfitMarginTTM: number;
  pretaxProfitMarginTTM: number;
  continuousOperationsProfitMarginTTM: number;
  netProfitMarginTTM: number;
  bottomLineProfitMarginTTM: number;
  receivablesTurnoverTTM: number;
  payablesTurnoverTTM: number;
  inventoryTurnoverTTM: number;
  fixedAssetTurnoverTTM: number;
  assetTurnoverTTM: number;
  currentRatioTTM: number;
  quickRatioTTM: number;
  solvencyRatioTTM: number;
  cashRatioTTM: number;
  priceToEarningsRatioTTM: number;
  priceToEarningsGrowthRatioTTM: number;
  forwardPriceToEarningsGrowthRatioTTM: number;
  priceToBookRatioTTM: number;
  priceToSalesRatioTTM: number;
  priceToFreeCashFlowRatioTTM: number;
  priceToOperatingCashFlowRatioTTM: number;
  debtToAssetsRatioTTM: number;
  debtToEquityRatioTTM: number;
  debtToCapitalRatioTTM: number;
  longTermDebtToCapitalRatioTTM: number;
  financialLeverageRatioTTM: number;
  workingCapitalTurnoverRatioTTM: number;
  operatingCashFlowRatioTTM: number;
  operatingCashFlowSalesRatioTTM: number;
  freeCashFlowOperatingCashFlowRatioTTM: number;
  debtServiceCoverageRatioTTM: number;
  interestCoverageRatioTTM: number;
  shortTermOperatingCashFlowCoverageRatioTTM: number;
  operatingCashFlowCoverageRatioTTM: number;
  capitalExpenditureCoverageRatioTTM: number;
  dividendPaidAndCapexCoverageRatioTTM: number;
  dividendPayoutRatioTTM: number;
  dividendYieldTTM: number;
  enterpriseValueTTM: number;
  revenuePerShareTTM: number;
  netIncomePerShareTTM: number;
  interestDebtPerShareTTM: number;
  cashPerShareTTM: number;
  bookValuePerShareTTM: number;
  tangibleBookValuePerShareTTM: number;
  shareholdersEquityPerShareTTM: number;
  operatingCashFlowPerShareTTM: number;
  capexPerShareTTM: number;
  freeCashFlowPerShareTTM: number;
  netIncomePerEBTTTM: number;
  ebtPerEbitTTM: number;
  priceToFairValueTTM: number;
  debtToMarketCapTTM: number;
  effectiveTaxRateTTM: number;
  enterpriseValueMultipleTTM: number;
  dividendPerShareTTM: number;
}
export interface StockPriceData {
  date: string;
  open: number;
  low: number;
  high: number;
  close: number;
  volume: number;
}

export interface DividendData {
  symbol: string;
  date: string;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
  adjDividend: number;
  dividend: number;
  yield: number;
  frequency: string;
}
