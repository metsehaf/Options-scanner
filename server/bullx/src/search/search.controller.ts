import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SearchService } from './search.service';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('api')
export class SearchController {
  private apiKey: string | undefined;
  private epURL: string | undefined;
  private marketStackApiKey: string | undefined;
  private marketStackEpURL: string | undefined;
  private FMPApiKey: string | undefined;
  private FMP_API_URL_BASE: string | undefined;
  private FMP_API_V3: string | undefined;

  constructor(
    private readonly searchService: SearchService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('Polygon_API_KEY');
    this.epURL = this.configService.get<string>('Polygon_API_URL');
    this.marketStackApiKey = this.configService.get<string>(
      'MarketStack_API_KEY',
    );
    this.marketStackEpURL = this.configService.get<string>(
      'MarketStack_API_URL',
    );
    this.FMPApiKey = this.configService.get<string>('FMP_API_KEY');
    this.FMP_API_URL_BASE = this.configService.get<string>('FMP_API_URL_BASE');
    this.FMP_API_V3 = this.configService.get<string>('FMP_API_URL_v3');
  }

  @Get('search')
  async search(@Query('query') query: string) {
    if (!query) {
      throw new InternalServerErrorException('Query parameter is missing.');
    }
    const queryArray = query.split(','); // Convert query string to an array
    console.log('search query:', queryArray);
    try {
      return this.searchService.search(queryArray, this.apiKey, this.epURL);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch search results: ${error.message}`,
      );
    }
  }

  @Get('search-stock')
  async searchTicker(@Query('ticker') ticker: string) {
    console.log('search ticker:', ticker);
    if (!ticker) {
      throw new InternalServerErrorException('Ticker parameter is missing.');
    }
    console.log('search ticker:', ticker);
    try {
      return this.searchService.searchTicker(
        ticker,
        this.FMPApiKey,
        this.FMP_API_URL_BASE,
        this.FMP_API_V3,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch ticker search results: ${error.message}`,
      );
    }
  }
}
