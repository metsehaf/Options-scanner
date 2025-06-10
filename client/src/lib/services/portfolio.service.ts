// lib/services/stockService.ts
import { Portfolio } from "@types/portfolio";
import { apiService } from "./api.service"; // Import the generic service

export const portfoloioService = {
  // Client-side / Default Server-side
  addToPortfolio: async (portfolio: string): Promise<any> => {
    const body = JSON.stringify({ name: portfolio });
    // You can pass query parameters using the options object
    return apiService.post<any>(`/api/portfolio`, body, {});
  },

  getPortfolio: async (): Promise<Portfolio[]> => {
    return apiService.get<any>(`/api/portfolio`, {});
  },
};
