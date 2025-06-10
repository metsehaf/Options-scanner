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

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.stocks, {
    onDelete: 'CASCADE',
  })
  portfolio: Portfolio;

  @Column()
  ticker: string;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  addedAt: Date;
}
