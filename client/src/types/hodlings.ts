export interface CreateHolding {
  ticker: string;
  avgCost: number;
  quantity: number;
  companyName: string;
  type: TransactionType;
  date: string;
}

export interface Itransactions {
  amount: number;
  createdAt: string;
  date: string;
  id: string;
  price: string;
  quantity: number;
  ticker: string;
  type: string;
}

export type TransactionType = "BUY" | "SELL" | "DEPOSIT" | "WITHDRAW";
