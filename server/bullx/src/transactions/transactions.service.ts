import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioTransaction } from './entity/transactions.entity';
import { Repository } from 'typeorm';
import { PortfolioTransactionData } from './transactions.model';

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
    offset: number,
    limit: number = 10,
  ): Promise<PortfolioTransactionData> {
    const [transactions, total] = await this.txRepo
      .createQueryBuilder('transaction')
      .where('transaction.portfolioId = :portfolioId', { portfolioId })
      .orderBy('transaction.createdAt', 'DESC')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    this.logger.log('transaction data', { transactions, total });
    return { transactions, total };
  }
}
