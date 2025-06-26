import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Entity()
export class PortfolioStock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.holdings, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @Column()
  ticker: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  avgCost: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
