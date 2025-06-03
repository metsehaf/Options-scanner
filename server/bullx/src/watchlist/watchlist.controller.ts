// src/watchlist/watchlist.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/watchlist')
@UseGuards(JwtAuthGuard) // Protect this controller with JWT authentication
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

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
    return this.watchlistService.getWatchlist(auth0Id);
  }

  @Delete(':ticker')
  async removeStockFromWatchlist(
    @Request() req: any,
    @Param('ticker') ticker: string,
  ) {
    const auth0Id = req.user.userId;
    return this.watchlistService.removeStock(auth0Id, ticker);
  }
}
