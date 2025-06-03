import { Injectable } from "@nestjs/common";
import { ApiSearchResponse, ApiStockData, ApiTicker, IStockData, SearchResult } from "./search.model";

@Injectable()
export class SearchMapService {
    constructor() {}
    /**
     * Maps the API search response to a list of SearchResult objects.
     * @param data - The API search response containing results.
     * @returns An array of SearchResult objects.
     */
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

    /**
     * Maps the API ticker data to a SearchResult object.
     * @param data - The API ticker data.
     * @returns A SearchResult object.
     */
    public mapTickerInfo(data: ApiStockData): IStockData{
        const item = data;
        return {
            symbol: data.symbol || 'AAPL',
            name: data.companyName || 'Apple Inc.',
            price: data.price || 228.46,
            open: 0,
            percentChange: data.changes ? data.changes : 0.24,
            dayRange: data.range ? `${data.range}` : '227.91 - 229.00',
            yearRange: '',
            marketCap: data.mktCap.toString() || '2.85T',
            volume: '50.23M',
            avgVolume: data.volAvg.toString() || '50.23M',
            peRatio: 0 || 28.46,
            chart: [] 
        };
    }
}