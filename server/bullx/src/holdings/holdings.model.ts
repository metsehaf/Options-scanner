import { PortfolioHolding } from './entity/holding.entity';

export interface Iholdings {
  holdings: PortfolioHolding[];
  totalValue: number;
  totalGainLoss: number;
  totalDayLoss: number;
  gainLossPercent: number;
  dayLossPercent: number;
}

// Define interfaces for clarity
export interface NextCursor {
  cursorId: number;
}

export interface PortfolioHoldingsResult {
  data: PortfolioHolding[];
  nextCursor: NextCursor | null; // CHANGE: Use new interface
  totalValue: number;
  totalGainLoss: number;
  totalDayLoss: number;
  gainLossPercent: number;
  dayLossPercent: number;
}
