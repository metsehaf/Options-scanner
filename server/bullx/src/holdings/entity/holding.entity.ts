import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('portfolio_holdings')
export class PortfolioHolding {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'int', unique: true, generated: 'increment' })
  cursorId: number;
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
  @Column('decimal', { nullable: true }) dayLoss: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() lastUpdated: Date;
}
