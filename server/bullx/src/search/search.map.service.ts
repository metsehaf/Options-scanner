import { Injectable } from "@nestjs/common";
import { ApiSearchResponse, SearchResult } from "./search.model";

@Injectable()
export class SearchMapService {
    constructor() {}
    public mapSearchInfo(data: ApiSearchResponse): SearchResult[]{
        return data.results.map((item) => ({
            ticker: item.ticker,
            name: item.name,
            exchange: item.primary_exchange,
            country: item.locale,
            currency: item.currency_name,
            type: item.type,
        }));
    }
}