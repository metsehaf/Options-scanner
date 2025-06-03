import { Observable } from "rxjs";

export abstract class SearchServiceModel {
    abstract search(query: string[], apiKey: string | undefined, epURL: string | undefined): Observable<SearchResult[]> ;
    abstract searchTicker(ticker: string, apiKey: string | undefined, epURL: string | undefined): Observable<IStockData>;
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
};

export type IStockData = {
    symbol: string | 'AAPL';
    name: string | 'Apple Inc.';
    price: number | 228.46;
    previousClose?: number | 227.91;
    open?: number | 228.46;
    percentChange: number | 0.24;
    dayRange: string | '227.91 - 229.00';
    yearRange: string | '124.17 - 229.00';
    marketCap: string | '2.85T';
    volume: string | '50.23M';
    avgVolume: string | '50.23M';
    peRatio?: number | 28.46;
    chart?: number[] | [228.46, 227.91, 229.00, 228.50, 228.75]; // Example chart data
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

export interface ApiStockData {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range: string;
    changes: number;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    cusip: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dcfDiff: number;
    dcf: number;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isEtf: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
}
