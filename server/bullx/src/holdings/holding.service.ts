import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  CreateHoldingDto,
  UpdateHoldingDto,
} from './dto/create-portfolio-stock.dto';
import { PortfolioHolding } from './entity/holding.entity';
import { PortfolioTransaction } from 'src/transactions/entity/transactions.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { UtilitesService } from 'src/utils/utilities.service';
import { NextCursor, PortfolioHoldingsResult } from './holdings.model';

@Injectable()
export class PortfolioHoldingService {
  private readonly logger = new Logger(PortfolioHoldingService.name); // 📢 this will tag logs with 'ScannerService'
  constructor(
    private utilService: UtilitesService,
    @InjectRepository(PortfolioHolding)
    private holdingRepo: Repository<PortfolioHolding>,
    @InjectRepository(PortfolioTransaction)
    private transactionRepo: Repository<PortfolioTransaction>,
    @InjectRepository(Portfolio)
    private portfolioRepo: Repository<Portfolio>,
  ) {}

  async findByPortfolio(portfolioId: string): Promise<PortfolioHolding[]> {
    return this.holdingRepo.find({
      where: { portfolio: { id: portfolioId } },
      relations: ['portfolio'],
    });
  }

  async getPortfolioWithHoldings(
    userId: string,
    portfolioId: string,
    limit: number = 10,
    cursorId?: number,
  ): Promise<PortfolioHoldingsResult> {
    this.logger.log(
      `Fetching holdings for userId: ${userId}, portfolioId: ${portfolioId}, limit: ${limit}, cursorId: ${cursorId ?? 'N/A'}`,
    );

    const query = this.holdingRepo
      .createQueryBuilder('holding')
      .leftJoinAndSelect('holding.portfolio', 'portfolio')
      .leftJoinAndSelect('portfolio.user', 'user')
      .where('portfolio.id = :portfolioId', { portfolioId })
      .andWhere('user.auth0Id = :userId', { userId })
      .orderBy('holding.cursorId', 'DESC')
      .take(limit + 1);

    if (cursorId) {
      this.logger.log(`Applying cursor: cursorId=${cursorId}`);
      query.andWhere('holding.cursorId < :cursorId', { cursorId });
    }

    const [sql, params] = query.getQueryAndParameters();
    this.logger.log('Generated SQL Query:', sql);
    this.logger.log('Query Parameters:', JSON.stringify(params));

    const results = await query.getMany();
    this.logger.log(`Query results count: ${results.length}`);
    if (results.length === 0) {
      this.logger.warn('No records found. Check cursor values or data.');
    }

    const hasNext = results.length > limit;
    const data = results.slice(0, limit);

    // Aggregate calculations
    const totalValue = data.reduce(
      (acc, h) => acc + Number(h.totalValue ?? 0),
      0,
    );
    const totalGainLoss = data.reduce(
      (acc, h) => acc + Number(h.gainLoss ?? 0),
      0,
    );
    const totalDayLoss = data.reduce(
      (acc, h) => acc + Number(h.dayLoss ?? 0),
      0,
    );

    const gainLossPercent = this.utilService.calcPercent(
      totalGainLoss,
      totalValue,
    );
    const dayLossPercent = this.utilService.calcPercent(
      totalDayLoss,
      totalValue,
    );

    const lastItem = data[data.length - 1];
    let nextCursor: NextCursor | null = null;

    if (hasNext && lastItem) {
      nextCursor = {
        cursorId: lastItem.cursorId,
      } as any; // Adjust NextCursor type if needed
      this.logger.log(`Next cursor: cursorId=${nextCursor?.cursorId}`);
    } else {
      this.logger.log('No next cursor (no more results or no last item)');
    }

    return {
      data,
      nextCursor,
      totalValue: this.utilService.roundUpDecimal(totalValue, 2),
      totalGainLoss: this.utilService.roundUpDecimal(totalGainLoss, 2),
      totalDayLoss: this.utilService.roundUpDecimal(totalDayLoss, 2),
      gainLossPercent,
      dayLossPercent,
    };
  }
  async addHolding(portfolioId: string, dto: CreateHoldingDto) {
    this.logger.log('payload for adding holdings', dto);
    const portfolio = await this.portfolioRepo.findOneBy({ id: portfolioId });
    if (!portfolio) throw new NotFoundException('Portfolio not found');
    const holding = this.holdingRepo.create({
      ...dto,
      portfolio: { id: portfolioId },
    });
    const savedHolding = await this.holdingRepo.save(holding);

    // Record transaction
    await this.transactionRepo.save({
      portfolio,
      type: dto.type,
      ticker: dto.ticker,
      quantity: dto.quantity,
      price: dto.avgCost,
      date: dto.date,
    });

    return savedHolding;
  }

  async updateHolding(id: string, dto: UpdateHoldingDto) {
    await this.holdingRepo.update(id, dto);
    return this.holdingRepo.findOne({ where: { id } });
  }

  async removeHolding(id: string) {
    return this.holdingRepo.delete(id);
  }
}
