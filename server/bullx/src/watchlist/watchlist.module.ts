// src/watchlist/watchlist.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { WatchlistItem } from './watchlist-item.entity';
import { User } from '../user/entities/user.entity'; // Import User entity
import { AuthModule } from '../auth/auth.module'; // Import your AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchlistItem, User]), // Register both entities
    AuthModule, // Ensure AuthModule is imported so JwtStrategy is available
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}
