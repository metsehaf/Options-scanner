// lib/services/stockService.ts
import { apiService } from "./api.service"; // Import the generic service
import { NextApiRequest } from "next";
import { IStockData, SearchResult } from "@types/search";
import { Session } from "@auth0/nextjs-auth0";

interface StockData {
  ticker: string;
  price: number;
  // ... other stock data
}

export const searchService = {
  // Client-side / Default Server-side
  searchStock: async (
    query: string,
    market: string
  ): Promise<SearchResult[]> => {
    // You can pass query parameters using the options object
    return apiService.get<SearchResult[]>("/api/search", {
      params: { query: query, market: market },
    });
  },

  tickerSearch: async (slug: string): Promise<IStockData> => {
    return apiService.get<IStockData>("/api/search-stock/", {
      params: { ticker: slug },
    });
  },

  // Server-side specific
  searchStockSSR: async (
    ticker: string,
    session: Session | null,
    req?: NextApiRequest
  ): Promise<StockData> => {
    return apiService.getSSR<StockData>("/search-stock", session, req, {
      params: { ticker },
    });
  },
};
