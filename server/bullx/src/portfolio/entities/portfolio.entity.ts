import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PortfolioHolding } from 'src/holdings/entity/holding.entity';
import { PortfolioSnapshot } from 'src/snapshot/entity/snapshot-entity';
import { PortfolioTransaction } from 'src/transactions/entity/transactions.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.portfolios, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => PortfolioHolding, (holding) => holding.portfolio)
  holdings: PortfolioHolding[];

  // src/portfolio/entities/portfolio.entity.ts
  @OneToMany(() => PortfolioSnapshot, (snap) => snap.portfolio)
  snapshots: PortfolioSnapshot[];

  @OneToMany(() => PortfolioTransaction, (tx) => tx.portfolio)
  transactions: PortfolioTransaction[];

  @CreateDateColumn()
  createdAt: Date;
}
