import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateHoldingDto,
  UpdateHoldingDto,
} from './dto/create-portfolio-stock.dto';
import { PortfolioHolding } from './entity/holding.entity';
import { PortfolioTransaction } from 'src/transactions/entity/transactions.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@Injectable()
export class PortfolioHoldingService {
  private readonly logger = new Logger(PortfolioHoldingService.name); // 📢 this will tag logs with 'ScannerService'
  constructor(
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
  ): Promise<{
    holdings: PortfolioHolding[];
    totalValue: number;
    totalGainLoss: number;
  }> {
    this.logger.log(
      `Fetching holdings for userId: ${userId}, portfolioId: ${portfolioId}`,
    );
    const holdings = await this.holdingRepo
      .createQueryBuilder('holding')
      .leftJoinAndSelect('holding.portfolio', 'portfolio')
      .leftJoinAndSelect('portfolio.user', 'user')
      .where('portfolio.id = :portfolioId', { portfolioId })
      .andWhere('user.auth0Id = :userId', { userId })
      .getMany();

    this.logger.log(
      `Found ${holdings.length} holdings for portfolioId: ${portfolioId}`,
    );
    const totalValue = holdings.reduce(
      (acc, h) => acc + Number(h.totalValue ?? 0),
      0,
    );
    const totalGainLoss = holdings.reduce(
      (acc, h) => acc + Number(h.gainLoss ?? 0),
      0,
    );

    return {
      holdings,
      totalValue,
      totalGainLoss,
    };
  }

  async getRecentTransactions(userId: string, portfolioId: string) {}

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
