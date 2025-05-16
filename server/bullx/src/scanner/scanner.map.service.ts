import { Injectable } from "@nestjs/common";
import { mostActiveStock, mostGainersStock, mostLosersStock } from "./scanner.model";
import { AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";
import { screenerDescriptions } from "../constants/scanner";

@Injectable()
export class ScannerMapService {
    constructor(private configService: ConfigService,) { }
    mapScannerInfo(stockData: mostActiveStock | mostGainersStock | mostLosersStock, identifier: keyof typeof screenerDescriptions): any {
        return {
            ...stockData,
            title: screenerDescriptions[identifier].title,
            description: screenerDescriptions[identifier].description,
        }
    }
}
