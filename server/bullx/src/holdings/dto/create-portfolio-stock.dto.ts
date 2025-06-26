import { TransactionType } from 'src/transactions/trasaction.model';

export class CreateHoldingDto {
  ticker: string;
  avgCost: number;
  quantity: number;
  companyName: string;
  type: TransactionType;
  date: string;
}

export class UpdateHoldingDto {
  avgCost?: number;
  quantity?: number;
}
