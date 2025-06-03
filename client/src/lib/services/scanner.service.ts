// lib/services/stockService.ts
import { apiService } from "./api.service"; // Import the generic service

interface StockData {
  ticker: string;
  price: number;
  // ... other stock data
}

export const scannerService = {
  // Client-side / Default Server-side
  getScanner: async (slug: string): Promise<any> => {
    // You can pass query parameters using the options object
    return apiService.get<any>(`/api/scanner/${slug}`);
  },
};
