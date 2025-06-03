import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { WatchlistItem } from 'src/watchlist/watchlist-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  auth0Id: string; // ← This holds `auth0|abc123`

  @OneToMany(() => WatchlistItem, (watchlistItem) => watchlistItem.user)
  watchlistItems: WatchlistItem[];
}
