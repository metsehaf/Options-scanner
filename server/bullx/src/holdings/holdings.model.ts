import { PortfolioHolding } from './entity/holding.entity';

export interface Iholdings {
  holdings: PortfolioHolding[];
  totalValue: number;
  totalGainLoss: number;
  totalDayLoss: number;
  gainLossPercent: number;
  dayLossPercent: number;
}
