import { PortfolioTransaction } from './entity/transactions.entity';

export interface PortfolioTransactionData {
  transactions: PortfolioTransaction[];
  total: number;
}
