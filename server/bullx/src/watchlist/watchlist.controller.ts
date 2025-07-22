// src/watchlist/watchlist.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('api/watchlist')
@UseGuards(JwtAuthGuard) // Protect this controller with JWT authentication
export class WatchlistController {
  private apiKey: string | undefined;
  private epURL: string | undefined;
  private FMP_URL_BASE: string | undefined;
  private polygonApiKey: string | undefined;
  private polygon_URL_BASE: string | undefined;
  private AlphaVantage_API_URL: string | undefined;
  private AlphaVantage_API_KEY: string | undefined;
  constructor(
    private readonly watchlistService: WatchlistService,
    private readonly configService: ConfigService,
  ) {
    this.FMP_URL_BASE = this.configService.get<string>('FMP_API_URL_BASE');
    this.epURL = this.configService.get<string>('FMP_API_URL_v3');
    this.apiKey = this.configService.get<string>('FMP_API_KEY');
    this.polygonApiKey = this.configService.get<string>('Polygon_API_KEY');
    this.polygon_URL_BASE = this.configService.get<string>('Polygon_API_URL');
    this.AlphaVantage_API_URL = this.configService.get<string>(
      'AlphaVantage_API_URL',
    );
    this.AlphaVantage_API_KEY = this.configService.get<string>(
      'AlphaVantage_API_KEY',
    );
  }

  @Post()
  async addStockToWatchlist(
    @Request() req: any,
    @Body() body: { ticker: string },
  ) {
    // `req.user` is populated by Passport's JwtStrategy
    const userId = req.user.userId;
    const ticker = body.ticker;
    return this.watchlistService.addStock(userId, ticker);
  }

  @Get()
  async getWatchlist(
    @Request() req: { user: { userId: string } },
    @Query('limit') limit: number,
    @Query('cursorId') cursorId: number,
  ) {
    const auth0Id = req.user.userId;
    return this.watchlistService.getWatchlist(
      auth0Id,
      this.apiKey,
      this.epURL,
      limit,
      cursorId,
    );
  }

  @Delete()
  async removeStockFromWatchlist(
    @Request() req: any,
    @Query('id') id: number,
    @Query('limit') limit: number,
    @Query('cursorId') cursorId: number,
  ) {
    const auth0Id = req.user.userId;
    return this.watchlistService.removeStock(
      auth0Id,
      id,
      this.apiKey,
      this.epURL,
      limit,
      cursorId,
    );
  }

  @Get('related')
  async getRelatedStocks(@Request() req: { user: { userId: string } }) {
    const auth0Id = req.user.userId;
    return this.watchlistService.getRelatedStocks(
      auth0Id,
      this.polygonApiKey,
      this.epURL,
      this.apiKey,
    );
  }

  @Get('news')
  async getNews(@Request() req: { user: { userId: string } }) {
    const auth0Id = req.user.userId;
    return this.watchlistService.getNews(
      auth0Id,
      this.polygonApiKey,
      this.polygon_URL_BASE,
    );
  }

  @Get('earnings-calendar')
  async getEarnings() {
    return this.watchlistService.getEarningsCalendar(
      this.FMP_URL_BASE,
      this.apiKey,
    );
  }
}
