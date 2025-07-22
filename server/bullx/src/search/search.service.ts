import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import {
  ApiSearchResponse,
  ApiStockData,
  DividendData,
  FmpEodData,
  FmpQuoteData,
  IStockData,
  MarketCapData,
  RatioTTM,
  SearchResult,
  SearchServiceModel,
  StockPriceData,
} from './search.model';
import { SearchMapService } from './search.map.service';

@Injectable()
export class SearchService implements SearchServiceModel {
  private readonly logger = new Logger(SearchService.name); // 📢 this will tag logs with 'ScannerService'
  constructor(
    private readonly httpService: HttpService,
    private SearchMapService: SearchMapService,
  ) {}

  search(
    query: string[],
    apiKey: string | undefined,
    epURL: string | undefined,
  ): Observable<SearchResult[]> {
    const url = `${epURL}/reference/tickers`;
    const [search, market] = query;
    if (!apiKey || !epURL) {
      throw new Error('Missing POLYGON_API_KEY or POLYGON_API_URL in config.');
    }
    this.logger.log(`$${url}?${apiKey}`);
    this.logger.log(this.httpService);
    return this.httpService
      .get<ApiSearchResponse>(`${url}`, {
        params: {
          search: search,
          market: market,
          active: true,
          limit: 10,
          apikey: apiKey,
        },
        responseType: 'json',
      })
      .pipe(
        catchError((error: any) => {
          this.logger.error(error);
          throw new Error(`Error fetching data: ${error.message}`);
        }),
        map((response: AxiosResponse<ApiSearchResponse>) => {
          this.logger.log(response);
          return this.SearchMapService.mapSearchInfo(response.data);
        }),
      );
  }

  searchTicker(
    ticker: string,
    FMPAPIKey: string | undefined,
    FMPURL: string | undefined,
    FMP_URL_V3: string | undefined,
  ): Observable<IStockData> {
    const url = `${FMPURL}/stable/quote`;
    return this.httpService
      .get<FmpQuoteData[]>(`${url}`, {
        params: {
          symbol: ticker,
          apikey: FMPAPIKey,
          // date_from: new Date().toLocaleDateString('en-CA'), // Current date in YYYY-MM-DD format
          // date_to: new Date().toLocaleDateString('en-CA'), // Current date
        },
        responseType: 'json',
      })
      .pipe(
        catchError((error: any) => {
          this.logger.error(error);
          throw new Error(`Error fetching data: ${error.message}`);
        }),
        switchMap((response: AxiosResponse<FmpQuoteData[]>) => {
          const marketData$ = of(response.data);
          const dividendYield$ = this.fetchDividendYield(
            ticker,
            FMPURL,
            FMPAPIKey,
          );
          const peRatio$ = this.fetchPeRatio(ticker, FMPURL, FMPAPIKey);
          const chartData$ = this.fetchChartData(ticker, FMP_URL_V3, FMPAPIKey);
          return combineLatest([
            marketData$,
            peRatio$,
            chartData$,
            dividendYield$,
          ]).pipe(
            map(([marketData, peRatio, chartData, dividendYield]) => {
              // Combine and map the data as needed for IStockData
              this.logger.log('Market Data:', marketData);
              this.logger.log('Market Cap:', peRatio);
              this.logger.log('Chart Data:', chartData);
              const mapped = this.SearchMapService.mapTickerInfo(
                marketData,
                peRatio,
                chartData,
                dividendYield[0]?.yield ?? 0,
              );
              this.logger.log(mapped);
              return mapped;
            }),
          );
        }),
      );
  }

  fetchDividendYield(
    ticker: string,
    epUrl: string | undefined,
    accessKey: string | undefined,
  ): Observable<DividendData[]> {
    const url = `${epUrl}/stable/dividends`;
    return this.httpService
      .get<DividendData[]>(`${url}`, {
        params: {
          symbol: ticker,
          apikey: accessKey,
        },
        responseType: 'json',
      })
      .pipe(
        catchError((error: any) => {
          this.logger.error(error);
          throw new Error(`Error fetching data: ${error.message}`);
        }),
        map((response: AxiosResponse<DividendData[]>) => {
          this.logger.log(response);
          return response.data;
        }),
      );
  }

  fetchChartData(
    ticker: string,
    epUrl: string | undefined,
    accessKey: string | undefined,
  ): Observable<StockPriceData[]> {
    const url = `${epUrl}/historical-chart/1hour/${ticker}`;
    return this.httpService
      .get<StockPriceData[]>(`${url}`, {
        params: {
          apikey: accessKey,
          from: new Date().toLocaleDateString('en-CA'), // Current date in YYYY-MM-DD format
          to: new Date().toLocaleDateString('en-CA'), // Current date
        },
        responseType: 'json',
      })
      .pipe(
        catchError((error: any) => {
          this.logger.error(error);
          throw new Error(`Error fetching data: ${error.message}`);
        }),
        map((response: AxiosResponse<StockPriceData[]>) => {
          this.logger.log(response);
          return response.data;
        }),
      );
  }

  fetchPeRatio(
    ticker: string,
    epUrl: string | undefined,
    accessKey: string | undefined,
  ): Observable<RatioTTM[]> {
    const url = `${epUrl}/stable/ratios-ttm`;
    return this.httpService
      .get<RatioTTM[]>(`${url}`, {
        params: {
          symbol: ticker,
          apikey: accessKey,
        },
        responseType: 'json',
      })
      .pipe(
        catchError((error: any) => {
          this.logger.error(error);
          throw new Error(`Error fetching data: ${error.message}`);
        }),
        map((response: AxiosResponse<RatioTTM[]>) => {
          this.logger.log(response);
          return response.data;
        }),
      );
  }
}
