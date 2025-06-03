export interface IWatchlist {
  id: number;
  ticker: string; // Stock ticker symbol (e.g., 'AAPL', 'GOOGL')
  addedAt: Date; // Timestamp when the stock was added to the watchlist
  userId: string; // Foreign key to the User entity, representing the user who owns this watchlist item
}

export interface IWatchlistResponse {
  watchlist: IWatchlist[];
}
