// src/snapshots/portfolio-snapshot.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioSnapshot } from './entity/snapshot-entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@Injectable()
export class PortfolioSnapshotService {
  constructor(
    @InjectRepository(PortfolioSnapshot)
    private snapshotRepo: Repository<PortfolioSnapshot>,
  ) {}

  async saveSnapshot(
    portfolio: Portfolio,
    totalValue: number,
    gainLoss: number,
  ) {
    const snapshot = this.snapshotRepo.create({
      portfolio,
      totalValue,
      gainLoss,
    });
    return this.snapshotRepo.save(snapshot);
  }

  async getSnapshots(portfolioId: string) {
    return this.snapshotRepo.find({
      where: { portfolio: { id: portfolioId } },
      order: { createdAt: 'ASC' },
    });
  }
}
