import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/portfolio/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionSrv: TransactionsService) {}
  // transaction.controller.ts
  @Get(':portfolioId')
  getRecent(
    @Param('portfolioId') portfolioId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.transactionSrv.getRecentTransactions(
      portfolioId,
      offset,
      limit,
    );
  }
}
