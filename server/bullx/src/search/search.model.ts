import { Observable } from "rxjs";

export abstract class SearchServiceModel {
    abstract search(query: string, apiKey: string | undefined, epURL: string | undefined): Observable<SearchResult[]> ;
}

export interface ApiSearchResponse {
    count: number;
    next_url: string;
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