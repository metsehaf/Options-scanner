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
  private polygonApiKey: string | undefined;
  private polygon_URL_BASE: string | undefined;
  constructor(
    private readonly watchlistService: WatchlistService,
    private readonly configService: ConfigService,
  ) {
    this.epURL = this.configService.get<string>('FMP_API_URL_v3');
    this.apiKey = this.configService.get<string>('FMP_API_KEY');
    this.polygonApiKey = this.configService.get<string>('Polygon_API_KEY');
    this.polygon_URL_BASE = this.configService.get<string>('Polygon_API_URL');
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
  async getWatchlist(@Request() req: { user: { userId: string } }) {
    const auth0Id = req.user.userId;
    return this.watchlistService.getWatchlist(auth0Id, this.apiKey, this.epURL);
  }

  @Delete()
  async removeStockFromWatchlist(@Request() req: any, @Query('id') id: number) {
    const auth0Id = req.user.userId;
    return this.watchlistService.removeStock(
      auth0Id,
      id,
      this.apiKey,
      this.epURL,
    );
  }

  @Get('related')
  async getRelatedStocks(@Request() req: { user: { userId: string } }) {
    const auth0Id = req.user.userId;
    return this.watchlistService.getRelatedStocks(
      auth0Id,
      this.polygonApiKey,
      this.polygon_URL_BASE,
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
}
