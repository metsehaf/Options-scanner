import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionController } from './transactions.controller';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioTransaction } from './entity/transactions.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioTransaction, Portfolio]), // Register both entities
    AuthModule, // Ensure AuthModule is imported so JwtStrategy is available
  ],
  controllers: [TransactionController],
  providers: [TransactionsService],
})
export class PortfolioTransactionModule {}
