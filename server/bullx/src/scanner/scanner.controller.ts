
import { Controller, Get, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/scanner')
export class ScannerController {
    private apiKey: string | undefined;
    private epURL: string | undefined;

    constructor(private readonly scannerService: ScannerService, private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('FMP_API_KEY');
        this.epURL = this.configService.get<string>('FMP_API_URL');
    }

    @Get('most-active')
    async getMostActive() {
        try {
            return await this.scannerService.getMostActive(this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch most active: ${error.message}`);
        }
    }

    @Get('most-gainers')
    async getMostGainers() {
        try {
            return await this.scannerService.getMostGainers(this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch most gainers: ${error.message}`);
        }
    }
    @Get('most-losers')
    async getMostLosers() {
        try {
            return await this.scannerService.getMostLosers(this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch most losers: ${error.message}`);
        }
    }
    @Get('top-gainers-by-percent')
    async getTopGainersByPercent() {
        try {
            return await this.scannerService.getTopGainersByPercent(this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch top gainers by percent: ${error.message}`);
        }
    }
    @Get('top-losers-by-percent')
    async getTopLosersByPercent() {
        try {
            return await this.scannerService.getTopLosersByPercent(this.apiKey, this.epURL);
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch top losers by percent: ${error.message}`);
        }
    }


    @Get('Pre-market-gainers')
    async getPreMarketGainers(){}

    @Get('Pre-market-Losers')
    async getPreMarketLosers(){}

    @Get('after-hour-gainers')
    async getAfterHourGainers(){}

    @Get('after-hour-losers')
    async getAfterHourLosers(){}

    @Get('active-penny-stocks')
    async getActivePennyStocks(){}

    @Get('unusual-volume-stocks')
    async getUnusualVolumeStocks(){}

    @Get('fifty-two-week-high')
    async getFiftyTwoWeekHigh(){}

    @Get('fifty-two-week-low')
    async getFiftyTwoWeekLow(){}
}
