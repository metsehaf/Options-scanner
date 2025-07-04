import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioTransaction } from './entity/transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);
  constructor(
    @InjectRepository(PortfolioTransaction)
    private txRepo: Repository<PortfolioTransaction>,
  ) {}
  // transaction.service.ts
  async getRecentTransactions(
    portfolioId: string,
    limit = 10,
  ): Promise<PortfolioTransaction[]> {
    this.logger.log('transaction data');
    return this.txRepo.find({
      where: { portfolio: { id: portfolioId } },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}
