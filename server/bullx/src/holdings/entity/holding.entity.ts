import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolio_holdings')
export class PortfolioHolding {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.holdings, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @Column() ticker: string;
  @Column() companyName: string;

  @Column('int') quantity: number;
  @Column('decimal') avgCost: number;

  @Column('decimal', { nullable: true }) currentPrice: number;
  @Column('decimal', { nullable: true }) totalValue: number;
  @Column('decimal', { nullable: true }) gainLoss: number;

  @UpdateDateColumn() lastUpdated: Date;
}
