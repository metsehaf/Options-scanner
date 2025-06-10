// src/watchlist/watchlist-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Adjust the import path as necessary

@Entity('watchlist_items') // Table name: watchlist_items
@Unique(['user', 'ticker']) // A user can only add a specific ticker once
export class WatchlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string; // Just save the ticker symbol (e.g., 'AAPL', 'GOOGL')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @ManyToOne(() => User, (user) => user.watchlistItems, { onDelete: 'CASCADE' })
  user: User; // Foreign key to the User entity
}
