import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { PortfolioHolding } from 'src/holdings/entity/holding.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { PortfolioSnapshotService } from 'src/snapshot/snapshot-service';
import { PortfolioSnapshotInput } from 'src/snapshot/snapshot.model';

@Injectable()
export class PriceSyncService {
  constructor(
    private http: HttpService,
    private readonly configService: ConfigService,
    private snapshotSrv: PortfolioSnapshotService,
    @InjectRepository(PortfolioHolding)
    private holdingRepo: Repository<PortfolioHolding>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updatePrices() {
    const holdings = await this.holdingRepo.find({
      relations: ['portfolio'],
    });

    const tickers = [...new Set(holdings.map((h) => h.ticker))];
    const priceMap = await this.fetchPricesFromFMP(tickers);

    // Update each holding with latest price
    for (const holding of holdings) {
      const currentPrice = priceMap[holding.ticker];
      holding.currentPrice = currentPrice;
      holding.totalValue = Number((currentPrice * holding.quantity).toFixed(2));
      holding.gainLoss = Number(
        ((currentPrice - holding.avgCost) * holding.quantity).toFixed(2),
      );
    }

    await this.holdingRepo.save(holdings);

    // Group by portfolio and create snapshot per portfolio
    const portfolioMap = new Map<string, PortfolioSnapshotInput>();

    for (const holding of holdings) {
      const pid = holding.portfolio.id;
      const entry = portfolioMap.get(pid) ?? {
        portfolio: holding.portfolio,
        totalValue: 0,
        gainLoss: 0,
      };

      entry.totalValue += Number((holding.totalValue ?? 0).toFixed(2));
      entry.gainLoss += Number((holding.gainLoss ?? 0).toFixed(2));

      portfolioMap.set(pid, entry);
    }

    for (const entry of portfolioMap.values()) {
      await this.snapshotSrv.saveSnapshot(
        entry.portfolio,
        Number(entry.totalValue.toFixed(2)),
        Number(entry.gainLoss.toFixed(2)),
      );
    }
  }

  private async fetchPricesFromFMP(
    tickers: string[],
  ): Promise<Record<string, number>> {
    // Example: call Polygon or FMP API
    const epURL = this.configService.get<string>('FMP_API_URL_v3');
    const apiKey = this.configService.get<string>('FMP_API_KEY');
    const url = `${epURL}/quote/`;
    const priceEntries = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          const response = await this.http.axiosRef.get(`${url}${ticker}`, {
            params: { apikey: apiKey },
          });
          const data = response.data[0]; // it's an array
          return [ticker, data.price as number];
        } catch (err) {
          console.error(`Error fetching data for ${ticker}`, err);
          return [ticker, null];
        }
      }),
    );
    return Object.fromEntries(priceEntries);
  }
}
