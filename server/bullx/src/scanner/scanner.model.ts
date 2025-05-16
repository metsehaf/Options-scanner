
// abstract class to be implemented by scanner service, containing the methods to fetch data from the API
import { Observable } from "rxjs";

export abstract class ScannerServiceModel {
    abstract getMostActive(apiKey: string | undefined, epURL: string | undefined): Observable<mostActiveStock>;
    abstract getMostGainers(apiKey: string | undefined, epURL: string | undefined): Observable<mostGainersStock >;
    abstract getMostLosers(apiKey: string | undefined, epURL: string | undefined): Observable<mostLosersStock>;
    abstract getTopLosersByPercent(apiKey: string | undefined, epURL: string | undefined, sector: string): Observable<IStockPercent[]>;
    abstract getTopGainersByPercent(apiKey: string | undefined, epURL: string | undefined, sector: string): Observable<IStockPercent[]>;
}

export interface IStockData {
    symbol: string;
    companyName: string;
    marketCap: number;
    sector: string;
    industry: string;
    beta: number;
    price: number | null;
    lastAnnualDividend: number;
    volume: number;
    exchange: string;
    exchangeShortName: string;
    country: string | null;
    isEtf: boolean;
    isFund: boolean;
    isActivelyTrading: boolean;
}

export interface mostActiveStock {
    title: string;
    description: string;
    "mostActiveStock": IStock[];
}

export interface mostGainersStock {
    title: string;
    description: string;
    "mostGainersStock": IStock[];
}

export interface mostLosersStock {
    title: string;
    description: string;
    "mostLosersStock": IStock[];
}

export interface IStock {
    ticker: string;
    changes: number;
    price: string;
    changesPercentage: string;
    companyName: string;
};

export interface IStockPercent {
    symbol: string;
    change: number;
    price: string;
    changesPercentage: string;
    name: string;
}


