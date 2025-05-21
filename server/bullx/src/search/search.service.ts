import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { catchError, map, Observable} from "rxjs";
import { ApiSearchResponse, SearchResult, SearchServiceModel } from "./search.model";
import { SearchMapService } from "./search.map.service";

@Injectable()
export class SearchService implements SearchServiceModel {
    private readonly logger = new Logger(SearchService.name); // 📢 this will tag logs with 'ScannerService'
    constructor(private readonly httpService: HttpService, private SearchMapService: SearchMapService) { }

    search(query: string, apiKey: string | undefined, epURL: string | undefined): Observable<SearchResult[]> {
        const url = `${epURL}/reference/tickers`;
        if (!apiKey || !epURL) {
            throw new Error('Missing POLYGON_API_KEY or POLYGON_API_URL in config.');
        }
        this.logger.log(`$${url}?${apiKey}`)
        this.logger.log(this.httpService)
        return this.httpService.get(`${url}`, {
            params: {
                search: query,
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
    }