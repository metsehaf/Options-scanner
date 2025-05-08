import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, map, Observable, of } from "rxjs";
import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";
import { IStockPercent, mostActiveStock, mostGainersStock, mostLosersStock } from "./scanner.model";
import { ScannerServiceModel } from "./scanner.model";


@Injectable()
export class ScannerService implements ScannerServiceModel {
    private readonly logger = new Logger(ScannerService.name); // 📢 this will tag logs with 'ScannerService'
    constructor(private readonly httpService: HttpService, private configService: ConfigService) { }
    getMostActive(apiKey: string | undefined, epURL: string | undefined): Observable<mostActiveStock> {
        if (!apiKey || !epURL) {
            throw new Error('Missing FMP_API_KEY or FMP_API_URL in config.');
        }
        this.logger.log(`${epURL}/stock/actives?${apiKey}`)
        return this.httpService.get(`${epURL}/stock/actives`, {
            params: { apikey: apiKey },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<mostActiveStock>) => {
                    this.logger.log(response.data);
                    return response.data;
                })
            )

    }

    getMostGainers(apiKey: string | undefined, epURL: string | undefined): Observable<mostGainersStock> {
        if (!apiKey || !epURL) {
            throw new Error('Missing FMP_API_KEY or FMP_API_URL in config.');
        }
        this.logger.log(`${epURL}/stock/gainers?${apiKey}`);
        return this.httpService.get(`${epURL}/stock/gainers`, {
            params: { apikey: apiKey },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<mostGainersStock>) => {
                    this.logger.log(response.data);
                    return response.data;
                })
            );
    }

    getMostLosers(apiKey: string | undefined, epURL: string | undefined): Observable<mostLosersStock> {
        if (!apiKey || !epURL) {
            throw new Error('Missing FMP_API_KEY or FMP_API_URL in config.');
        }
        this.logger.log(`${epURL}/stock/losers?${apiKey}`);
        return this.httpService.get(`${epURL}/stock/losers`, {
            params: { apikey: apiKey },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<mostLosersStock>) => {
                    this.logger.log(response.data);
                    return response.data;
                })
            );
    }

    getTopLosersByPercent(apiKey: string | undefined, epURL: string | undefined): Observable<IStockPercent[]> {
        if (!apiKey || !epURL) {
            throw new Error('Missing FMP_API_KEY or FMP_API_URL in config.');
        }
        this.logger.log(`${epURL}/stock/top-losers-percent?${apiKey}`);
        return this.httpService.get(`${epURL}/stock_market/losers`, {
            params: { apikey: apiKey },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<any>) => {
                    this.logger.log(response.data);
                    return response.data;
                })
            );
    }

    getTopGainersByPercent(apiKey: string | undefined, epURL: string | undefined): Observable<IStockPercent[]> {
        if (!apiKey || !epURL) {
            throw new Error('Missing FMP_API_KEY or FMP_API_URL in config.');
        }
        this.logger.log(`${epURL}/stock/top-gainers-percent?${apiKey}`);
        return this.httpService.get(`${epURL}/stock_market/gainers`, {
            params: { apikey: apiKey },
            responseType: 'json'
        })
            .pipe(
                catchError((error: any) => {
                    this.logger.error(error);
                    throw new Error(`Error fetching data: ${error.message}`);
                }),
                map((response: AxiosResponse<any>) => {
                    this.logger.log(response.data);
                    return response.data;
                })
            );
    }
}