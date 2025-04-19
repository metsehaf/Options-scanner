import { Controller, Get } from '@nestjs/common';
import { StockService } from '../stocks.service';

@Controller('get-stocks')
export class GetStocksController {
    constructor(private readonly stockService: StockService) {}

    @Get()
    getStocks() {
        return this.stockService.getStocks();
    }
}
