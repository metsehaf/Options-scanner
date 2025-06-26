import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PortfolioSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for unique identification of each snapshot

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.snapshots, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio; // Foreign key to the Portfolio entity

  @Column('decimal')
  totalValue: number;

  @Column('decimal')
  gainLoss: number;

  @CreateDateColumn()
  createdAt: Date;
}
