import { Injectable } from '@nestjs/common';
import {
  ApiSearchResponse,
  ApiStockData,
  ApiTicker,
  ChartPoint,
  FmpEodData,
  FmpQuoteData,
  IStockData,
  MarketCapData,
  RatioTTM,
  SearchResult,
  StockPriceData,
} from './search.model';
import { UtilitesService } from 'src/utils/utilities.service';

@Injectable()
export class SearchMapService {
  constructor(private utilServ: UtilitesService) {}
  /**
   * Maps the API search response to a list of SearchResult objects.
   * @param data - The API search response containing results.
   * @returns An array of SearchResult objects.
   */
  public mapSearchInfo(data: ApiSearchResponse): SearchResult[] {
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
  public mapTickerInfo(
    data: FmpQuoteData[],
    peRatio: RatioTTM[],
    chartData: StockPriceData[],
    dividendYield: number,
  ): IStockData {
    const item = data;
    // Market Cap = Price Per Share × Shares Outstanding
    // None of the provided data fields include "shares outstanding", so market cap cannot be calculated directly.
    return {
      symbol: data[0].symbol,
      name: data[0].name,
      price: data[0].price,
      open: data[0].open,
      previousClose: data[0].previousClose,
      percentChange: data[0].changePercentage,
      dayRange: `$${data[0].dayLow} - $${data[0].dayHigh}`,
      yearRange: `$${data[0].yearLow}  -  $${data[0].yearHigh}`,
      marketCap: data[0].marketCap.toString(), // Not available from this data
      volume: data[0].volume.toString(),
      avgVolume: data[0].volume.toString(),
      peRatio: this.utilServ.roundUpDecimal(
        peRatio[0].priceToEarningsRatioTTM,
        2,
      ), // Not available from this data
      dividendYield: this.utilServ.roundUpDecimal(dividendYield, 2),
      exchange: data[0].exchange,
      chart: this.mapChartData(chartData),
    };
  }

  mapChartData(data: StockPriceData[]): ChartPoint[] {
    return data
      .map((snap) => ({
        time: snap.date,
        price: Number(snap.close),
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()); // optional, ensures it's ordered
  }
  // mapChartData(data: StockPriceData[]): {
  //   xAxis: any[];
  //   series: number[];
  // } {
  //   if (!data.length) return { xAxis: [], series: [] };

  //   const eastern = new Date().toLocaleDateString('en-CA', {
  //     timeZone: 'America/Toronto',
  //   });

  //   const marketOpen = new Date(`${eastern}T09:30:00-04:00`);
  //   const marketClose = new Date(`${eastern}T16:00:00-04:00`);
  //   // Sort data by date ascending
  //   const sorted = [...data].sort(
  //     (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  //   );

  //   const xAxis = sorted.map((snap) => new Date(snap.date));
  //   const series = sorted.map((snap) => Number(snap.close));

  //   // Fill in flat line to end of day
  //   const lastPoint = xAxis[xAxis.length - 1];
  //   if (lastPoint < marketClose) {
  //     xAxis.push(marketClose);
  //     series.push(series[series.length - 1]); // flatline
  //   }

  //   // Optionally fill in starting point if before marketOpen
  //   const firstPoint = xAxis[0];
  //   if (firstPoint > marketOpen) {
  //     xAxis.unshift(marketOpen);
  //     series.unshift(series[0]); // flatline
  //   }

  //   return { xAxis, series };
  // }
}
