import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';
import { PortfolioHoldingService } from './holding.service';
import { HoldingController } from './holding.controller';
import { PortfolioHolding } from './entity/holding.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { PortfolioTransactionModule } from 'src/transactions/transactions.module';
import { PortfolioTransaction } from 'src/transactions/entity/transactions.entity';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    TypeOrmModule.forFeature([
      PortfolioHolding,
      Portfolio,
      PortfolioTransaction,
    ]), // <-- Add PortfolioTransaction // Register both entities
    AuthModule, // Ensure AuthModule is imported so JwtStrategy is available
  ],
  controllers: [HoldingController],
  providers: [PortfolioHoldingService],
})
export class HoldingsModule {
  // This module handles the portfolio management functionality
  // It includes controllers and services for managing user portfolios
  // and integrates with the User entity for user-specific data.
}
