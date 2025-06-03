import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { catchError, map, Observable, of} from "rxjs";
import { ApiSearchResponse, ApiStockData, ApiTicker, IStockData, SearchResult, SearchServiceModel } from "./search.model";
import { SearchMapService } from "./search.map.service";

@Injectable()
export class SearchService implements SearchServiceModel {
    private readonly logger = new Logger(SearchService.name); // 📢 this will tag logs with 'ScannerService'
    constructor(private readonly httpService: HttpService, private SearchMapService: SearchMapService) { }

    search(query: string[], apiKey: string | undefined, epURL: string | undefined): Observable<SearchResult[]> {
        const url = `${epURL}/reference/tickers`;
        const [search, market] = query;
        if (!apiKey || !epURL) {
            throw new Error('Missing POLYGON_API_KEY or POLYGON_API_URL in config.');
        }
        this.logger.log(`$${url}?${apiKey}`)
        this.logger.log(this.httpService)
        return this.httpService.get<ApiSearchResponse>(`${url}`, {
            params: {
                search: search,
                market: market,
                active: true,
                limit: 10,
                apikey: apiKey
            },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<ApiSearchResponse>) => {
                    this.logger.log(response);
                    return this.SearchMapService.mapSearchInfo(response.data);
                })
            )
        }

    searchTicker(ticker: string, apiKey: string | undefined, epURL: string | undefined): Observable<IStockData> {
        const url = `${epURL}/stable/search-exchange-variants${ticker}`;
        if (!apiKey || !epURL) {
        }
         return of({
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price:  228.46,
            previousClose: 227.91,
            open: 227.91,
            percentChange:  0.24,
            dayRange:  '227.91 - 229.00',
            yearRange: '220.00 - 250.00',
            marketCap: '2.85T',
            volume: '50.23M',
            avgVolume: '50.23M',
            peRatio: 28.46,
            chart: []
        });
        // return this.httpService.get<ApiStockData>(`${url}`, {
        //     params: {
        //         symbol: ticker,
        //         access_key: apiKey
        //     },
        //     responseType: 'json'
        // })
        //     .pipe(
        //         catchError((error: any) => {
        //             this.logger.error(error);
        //             throw new Error(`Error fetching data: ${error.message}`);
        //         }),
        //         map((response: AxiosResponse<ApiStockData>) => {
        //             this.logger.log(response);
        //             this.logger.log('mapped response', this.SearchMapService.mapTickerInfo(response.data));
        //             return this.SearchMapService.mapTickerInfo(response.data);
        //         })
        //     )
        // }
    }
}