import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchlistItem } from './watchlist-item.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchlistItem)
    private watchlistItemRepository: Repository<WatchlistItem>,
    @InjectRepository(User) // Inject User repository as well
    private userRepository: Repository<User>,
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

  async getWatchlist(auth0Id: string): Promise<WatchlistItem[]> {
    return this.watchlistItemRepository.find({
      where: { user: { auth0Id } }, // Find by user ID
      order: { addedAt: 'DESC' }, // You might add ordering here, e.g., orderBy: { addedAt: 'DESC' }
    });
  }

  async removeStock(auth0Id: string, ticker: string): Promise<void> {
    const result = await this.watchlistItemRepository.delete({
      user: { auth0Id },
      ticker: ticker.toUpperCase(),
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Stock not found in watchlist or already removed',
      );
    }
  }
}
