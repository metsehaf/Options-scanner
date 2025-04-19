import { Injectable } from '@nestjs/common';

@Injectable()
export class StockService {
  getStocks(): string {
    return 'Hello World!';
  }
}