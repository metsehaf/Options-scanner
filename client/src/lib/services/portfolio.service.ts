// lib/services/stockService.ts
import {
  Portfolio,
  PortfolioChartData,
  PortfolioService,
  PortfolioWithHoldings,
} from "@types/portfolio";
import { CreateHolding } from "@types/hodlings"; // Import the type for creating a holding
import { apiService } from "./api.service"; // Import the generic service

export const portfoloioService: PortfolioService = {
  // Client-side / Default Server-side
  addToPortfolio: async (portfolio: string): Promise<any> => {
    const body = JSON.stringify({ name: portfolio });
    // You can pass query parameters using the options object
    return apiService.post<any>(`/api/portfolio`, body, {});
  },

  getPortfolio: async (): Promise<Portfolio[]> => {
    return apiService.get<any>(`/api/portfolio`, {});
  },

  getPortfolioWithHoldings: async (
    portfolioId: string | undefined
  ): Promise<PortfolioWithHoldings> => {
    return apiService.get<PortfolioWithHoldings>(
      `/api/holdings/${portfolioId}`
    );
  },

  addHolding: async (
    portfolioId: string,
    symbol: string,
    quant: number,
    cost: number,
    companyName: string,
    transactionType: string,
    transactionDate: string
  ): Promise<any> => {
    const body = JSON.stringify({
      ticker: symbol.toUpperCase(),
      avgCost: cost,
      quantity: quant,
      companyName: companyName,
      type: transactionType,
      date: transactionDate,
    });
    console.log("Adding holding with body:", body);
    return apiService.post<CreateHolding>(
      `/api/holdings`,
      body,
      { params: { portfolioId } } // Portfolio ID as a URL param
    ); // Portfolio ID as a URL param
  },

  removeFromHoldings: async (stockId: string | undefined): Promise<any> => {
    if (!stockId) {
      throw new Error("Stock ID are required");
    }
    return apiService.delete<any>(`/api/holdings/${stockId}`, {});
  },

  getChartData: async (portfolioId: string): Promise<PortfolioChartData> => {
    return apiService.get<PortfolioChartData>(
      `/api/snapshots/${portfolioId}`,
      {}
    );
  },

  getTransactions: async (portfolioId: string): Promise<any> => {
    return apiService.get<any>(
      `/api/portfolio/transactions/${portfolioId}`,
      {}
    );
  },
};
