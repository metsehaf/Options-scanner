// src/transactions/entities/transaction.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { TransactionType } from '../trasaction.model';

@Entity('portfolio_transactions')
export class PortfolioTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.transactions, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @Column({ type: 'varchar' })
  type: TransactionType;

  @Column({ nullable: true }) ticker?: string;

  @Column('int', { nullable: true }) quantity?: number;

  @Column('decimal', { nullable: true }) price?: number;

  @Column('decimal', { nullable: true }) amount?: number; // for deposits/withdrawals

  @Column('varchar', { nullable: true }) date?: string;

  @CreateDateColumn()
  createdAt: Date;
}
