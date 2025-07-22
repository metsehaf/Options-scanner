import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchlistItem } from './entities/watchlist-item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  ApiNewsResponse,
  EnrichedWatchlistItem,
  IEarningsCalendar,
  IWatchlistData,
  watchlistRelated,
} from './watchlist.model';
import { HttpService } from '@nestjs/axios';
import { NextCursor } from 'src/holdings/holdings.model';
import { of } from 'rxjs';

@Injectable()
export class WatchlistService {
  private readonly logger = new Logger(WatchlistService.name); // 📢 this will tag logs with 'ScannerService'
  constructor(
    @InjectRepository(WatchlistItem)
    private watchlistItemRepository: Repository<WatchlistItem>,
    @InjectRepository(User) // Inject User repository as well
    private userRepository: Repository<User>,
    private readonly http: HttpService, // Nest wrapper for Axios
  ) {}

  async addStock(auth0Id: string, ticker: string): Promise<WatchlistItem> {
    let user = await this.userRepository.findOne({ where: { auth0Id } });

    if (!user) {
      user = this.userRepository.create({ auth0Id });
      await this.userRepository.save(user);
    }

    const existingItem = await this.watchlistItemRepository.findOne({
      where: {
        user: { id: user.id },
        ticker: ticker.toUpperCase(),
      },
      relations: ['user'],
    });

    if (existingItem) {
      throw new Error('Stock already in watchlist');
    }

    const watchlistItem = this.watchlistItemRepository.create({
      ticker: ticker.toUpperCase(),
      user,
    });

    return this.watchlistItemRepository.save(watchlistItem);
  }

  async getWatchlist(
    auth0Id: string,
    apiKey: string | undefined,
    epURL: string | undefined,
    limit: number = 10,
    cursorId?: number,
  ): Promise<EnrichedWatchlistItem> {
    const url = `${epURL}/quote/`;
    const query = await this.watchlistItemRepository
      .createQueryBuilder('watchlistItem')
      .leftJoinAndSelect('watchlistItem.user', 'user')
      .where('user.auth0Id = :auth0Id', { auth0Id })
      .orderBy('watchlistItem.cursorId', 'DESC')
      .take(limit + 1);

    if (cursorId) {
      query.andWhere('watchlistItem.cursorId < :cursorId', { cursorId });
    }
    const items = await query.getMany();
    const hasNext = items.length > limit;
    const data = items.slice(0, limit);

    const tickers = data.map((item) => item.ticker);
    const id = data.map((item) => item.id);
    console.log('tickers list', tickers);
    const results = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          const response = await this.http.axiosRef.get(`${url}${ticker}`, {
            params: { apikey: apiKey },
          });
          const data = response.data[0]; // it's an array
          return {
            id: id[tickers.indexOf(ticker)],
            ticker,
            name: data.name,
            lastPrice: data.price,
            change: data.change,
          };
        } catch (err) {
          console.error(`Error fetching data for ${ticker}`, err);
          return {
            id: id[tickers.indexOf(ticker)],
            ticker,
            name: 'N/A',
            lastPrice: null,
            change: null,
          };
        }
      }),
    );
    this.logger.log('watchlist results', results);
    const lastItem = data[data.length - 1];
    let nextCursor: NextCursor | null = null;

    if (hasNext && lastItem) {
      nextCursor = {
        cursorId: lastItem.cursorId,
      } as any; // Adjust NextCursor type if needed
      this.logger.log(`Next cursor: cursorId=${nextCursor?.cursorId}`);
    } else {
      this.logger.log('No next cursor (no more results or no last item)');
    }

    return { nextCursor, results };
  }

  async removeStock(
    auth0Id: string,
    watchlistItemId: number,
    apiKey: string | undefined,
    epURL: string | undefined,
    limit: number,
    cursorId: number,
  ): Promise<EnrichedWatchlistItem> {
    // First, find the item to ensure it belongs to the user
    // This performs a SELECT query first
    const itemToDelete = await this.watchlistItemRepository.findOne({
      where: {
        id: watchlistItemId,
        user: { auth0Id: auth0Id }, // Correctly access the nested relation property
      },
      relations: ['user'], // Ensure the user relation is loaded for the where condition
    });

    if (!itemToDelete) {
      throw new NotFoundException(
        'Watchlist item not found or user unauthorized to remove it.',
      );
    }

    // If found and authorized, then delete it
    const result = await this.watchlistItemRepository.delete(watchlistItemId);

    if (result.affected === 0) {
      // This case should theoretically not be hit if itemToDelete was found
      throw new NotFoundException(
        'Watchlist item not found or already removed.',
      );
    }

    // Return the updated watchlist
    return this.getWatchlist(auth0Id, apiKey, epURL, limit, cursorId);
  }

  async getEarningsCalendar(
    epURL: string | undefined,
    apiKey: string | undefined,
  ): Promise<IEarningsCalendar[]> {
    const url = `${epURL}/stable/earnings-calendar`;
    const getEarningsQueryDateRange = () => {
      const today = new Date();
      const from = today.toISOString().split('T')[0];

      const in30Days = new Date();
      in30Days.setDate(today.getDate() + 30);
      const to = in30Days.toISOString().split('T')[0];

      return { from, to };
    };

    // Example usage:
    const { from, to } = getEarningsQueryDateRange();
    try {
      const response = await this.http.axiosRef.get<IEarningsCalendar[]>(url, {
        params: {
          from: from,
          to: to,
          apikey: apiKey,
        },
      });
      return this.uniqEarningsCalendar(response.data);
    } catch (err) {
      console.error('Error fetching earnings calendar:', err);
      // throw new Error('Failed to fetch earnings calendar');
      return []; // Return an empty array on error
    }
  }

  uniqEarningsCalendar(
    earningsArray: IEarningsCalendar[],
  ): IEarningsCalendar[] {
    const seen = new Map(); // Using Map is generally better for keys that might not be simple strings
    return earningsArray.filter((item) => {
      // Create a unique key for each item, e.g., "SYMBOL_DATE"
      const key = `${item.symbol}_${item.date}`;
      if (seen.has(key)) {
        return false; // Already seen this combination
      } else {
        seen.set(key, true); // Mark this combination as seen
        return true; // Keep this item
      }
    });
  }

  async getRelatedStocks(
    auth0Id: string,
    apiKey: string | undefined,
    FMPURL: string | undefined,
    FMP_API_KEY: string | undefined,
  ): Promise<watchlistRelated[]> {
    // Get all watchlist items for the user
    const items = await this.watchlistItemRepository.find({
      where: { user: { auth0Id } },
      order: { addedAt: 'DESC' },
    });

    if (!items.length) {
      return [];
    }

    // Pick a random ticker from the user's watchlist
    const randomIndex = Math.floor(Math.random() * items.length);
    const randomTicker = items[randomIndex].ticker;

    // Call Polygon related companies API
    const polygonUrl = `https://api.polygon.io/v1/related-companies/${randomTicker}`;
    try {
      const response = await this.http.axiosRef.get(polygonUrl, {
        params: { apiKey },
      });
      console.log('Related companies response:', response.data);
      const relatedTickers: string[] = (response.data.results || []).map(
        (item: any) => item.ticker,
      );

      // For each related ticker, fetch quote data from your quote API
      const url = `${FMPURL}/quote/`;
      const results = await Promise.all(
        relatedTickers.map(async (ticker) => {
          try {
            const quoteResp = await this.http.axiosRef.get(`${url}${ticker}`, {
              params: { apikey: FMP_API_KEY },
            });
            const data = quoteResp.data[0];
            return {
              id: data?.id ?? -1, // Use a default id if not available
              ticker,
              name: data?.name ?? 'N/A',
              lastPrice: data?.price ?? null,
              change: data?.change ?? null,
            };
          } catch {
            return {
              id: -1,
              ticker,
              name: 'N/A',
              lastPrice: null,
              change: null,
            };
          }
        }),
      );
      return results;
    } catch (err) {
      console.error('Error fetching related stocks:', err);
      return [];
    }
  }

  async getNews(
    auth0Id: string,
    apiKey: string | undefined,
    epURL: string | undefined,
  ): Promise<IWatchlistData[]> {
    const url = `https://api.polygon.io/v2/reference/news`;
    const items = await this.watchlistItemRepository.find({
      where: { user: { auth0Id } },
      order: { addedAt: 'DESC' },
    });

    const tickers = items.map((item) => item.ticker);
    const results = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          const response = await this.http.axiosRef.get<ApiNewsResponse>(
            `${url}`,
            {
              params: {
                ticker: ticker,
                limit: 2, // Limit to 5 news articles per ticker
                order: 'desc',
                sort: 'published_utc',
                apikey: apiKey,
              },
            },
          );
          this.logger.log(
            `Fetched news for ${ticker}:`,
            response.data.results,
            'line 221',
          );
          const transformedNews: IWatchlistData[] = response.data.results.map(
            (item: any) => {
              const mappedItem: IWatchlistData = {
                id: item.id,
                title: item.title,
                description: item.description,
                article_url: item.article_url,
                image_url: item.image_url,
                published_utc: item.published_utc,
                author: item.author,
                tickers: item.tickers,
                keywords: item.keywords,
                insights: item.insights,
                publisher: item.publisher,
              };

              return mappedItem;
            },
          );
          this.logger.log(
            `Fetched news for ${ticker}:`,
            transformedNews,
            'line 237',
          );
          return transformedNews;
        } catch (err) {
          console.error(`Error fetching news for ${ticker}`, err);
          return [];
        }
      }),
    );

    return results.flat();
  }
}
