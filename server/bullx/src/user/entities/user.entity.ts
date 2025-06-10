import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { WatchlistItem } from '../../watchlist/entities/watchlist-item.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  auth0Id: string; // ← This holds `auth0|abc123`

  @OneToMany(() => WatchlistItem, (watchlistItem) => watchlistItem.user)
  watchlistItems: WatchlistItem[];

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user)
  portfolios: Portfolio[];
}
