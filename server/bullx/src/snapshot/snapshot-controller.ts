// src/snapshots/portfolio-snapshot.controller.ts
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PortfolioSnapshotService } from './snapshot-service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/snapshots')
@UseGuards(JwtAuthGuard)
export class PortfolioSnapshotController {
  constructor(private readonly snapshotService: PortfolioSnapshotService) {}

  @Get(':portfolioId')
  async getChartData(@Param('portfolioId') portfolioId: string) {
    const snapshots = await this.snapshotService.getSnapshots(portfolioId);

    return {
      xAxis: snapshots.map((snap) => snap.createdAt),
      series: snapshots.map((snap) => Number(snap.totalValue)),
    };
  }
}
