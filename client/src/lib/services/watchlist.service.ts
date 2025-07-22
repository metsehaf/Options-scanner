// lib/services/stockService.ts
import { apiService } from "./api.service"; // Import the generic service
import {
  IEarningsCalendar,
  IWatchlist,
  IWatchlistNews,
  IWatchlistResponse,
} from "@types/watchlist"; // Adjust the import path as necessary
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

  getWatchlist: async (
    limit?: number,
    cursorId?: number | null
  ): Promise<IWatchlistResponse> => {
    return apiService.get<IWatchlistResponse>(`/api/watchlist`, {
      params: {
        limit: limit,
        cursorId: cursorId,
      }, // Default pagination parameters,
    });
  },

  getEarningsCalendar: async (): Promise<IEarningsCalendar[]> => {
    return apiService.get<IEarningsCalendar[]>(
      `/api/watchlist/earnings-calendar`
    );
  },

  getRelatedStocks: async (): Promise<IWatchlist[]> => {
    // You can pass query parameters using the options object
    return apiService.get<IWatchlist[]>(`/api/watchlist/related`);
  },

  getNews: async (): Promise<IWatchlistNews[]> => {
    return apiService.get<any>(`/api/watchlist/news`);
  },

  removeFromWatchlist: async (
    id: number,
    cursorId: number | null = null
  ): Promise<IWatchlistResponse> => {
    // You can pass query parameters using the options object
    return apiService.delete<IWatchlistResponse>(`/api/watchlist`, {
      params: { id, limit: 10, cursorId: cursorId },
    });
  },
};
