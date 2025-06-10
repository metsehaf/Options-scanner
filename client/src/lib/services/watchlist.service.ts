// lib/services/stockService.ts
import { apiService } from "./api.service"; // Import the generic service
import { IWatchlist, IWatchlistNews } from "@types/watchlist"; // Adjust the import path as necessary
interface StockData {
  ticker: string;
  price: number;
  // ... other stock data
}

export const watchlistService = {
  // Client-side / Default Server-side
  addToWatchlist: async (symbol: string): Promise<any> => {
    const body = JSON.stringify({ ticker: symbol });
    // You can pass query parameters using the options object
    return apiService.post<any>(`/api/watchlist`, body, {});
  },

  getWatchlist: async (): Promise<IWatchlist[]> => {
    return apiService.get<IWatchlist[]>(`/api/watchlist`);
  },

  getRelatedStocks: async (): Promise<IWatchlist[]> => {
    // You can pass query parameters using the options object
    return apiService.get<IWatchlist[]>(`/api/watchlist/related`);
  },

  getNews: async (): Promise<IWatchlistNews[]> => {
    return apiService.get<any>(`/api/watchlist/news`);
  },

  removeFromWatchlist: async (id: number): Promise<IWatchlist[]> => {
    // You can pass query parameters using the options object
    return apiService.delete<IWatchlist[]>(`/api/watchlist`, {
      params: { id },
    });
  },
};
