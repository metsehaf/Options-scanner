import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

export type PortfolioSnapshotInput = {
  portfolio: Portfolio;
  totalValue: number;
  gainLoss: number;
};
