
// abstract class to be implemented by scanner service, containing the methods to fetch data from the API

import exp from "constants";
import { Observable } from "rxjs";

export abstract class ScannerServiceModel {
    abstract getMostActive(apiKey: string | undefined, epURL: string | undefined): Observable<mostActiveStock>;
    abstract getMostGainers(apiKey: string | undefined, epURL: string | undefined): Observable<mostGainersStock >;
    abstract getMostLosers(apiKey: string | undefined, epURL: string | undefined): Observable<mostLosersStock>;
    abstract getTopLosersByPercent(apiKey: string | undefined, epURL: string | undefined, sector: string): Observable<IStockPercent[]>;
    abstract getTopGainersByPercent(apiKey: string | undefined, epURL: string | undefined, sector: string): Observable<IStockPercent[]>;
}

export interface mostActiveStock {
    "mostActiveStock": IStock[];
}

export interface mostGainersStock {
    "mostGainersStock": IStock[];
}

export interface mostLosersStock {
    "mostLosersStock": IStock[];
}

interface IStock {
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


