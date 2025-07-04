// src/snapshots/portfolio-snapshot.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { groupBy } from 'lodash';
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

  async getDownsampledSnapshots(portfolioId: string, limitPerDay = 3) {
    const snapshots = await this.snapshotRepo.find({
      where: { portfolio: { id: portfolioId } },
      order: { createdAt: 'ASC' },
    });

    // Group by date (YYYY-MM-DD)
    const grouped = groupBy(
      snapshots,
      (snap: any) => snap.createdAt.toISOString().split('T')[0],
    );

    // Limit to N snapshots per day
    const reduced = Object.values(grouped).flatMap(
      (daily: any) => daily.slice(-limitPerDay), // Last N snapshots of the day
    );

    return reduced;
  }
}
