import { Module } from '@nestjs/common';
import { PriceSyncService } from './price-sync.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioHolding } from 'src/holdings/entity/holding.entity';
import { HttpModule } from '@nestjs/axios';
import { PortfolioSnapshotModule } from 'src/snapshot/snapshot.module';
import { UtilitesService } from 'src/utils/utilities.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([PortfolioHolding]),
    PortfolioSnapshotModule,
  ],
  providers: [PriceSyncService, UtilitesService],
})
export class PriceSyncModule {
  // This module handles the portfolio management functionality
  // It includes controllers and services for managing user portfolios
  // and integrates with the User entity for user-specific data.
}
