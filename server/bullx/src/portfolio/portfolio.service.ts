import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from './entities/portfolio.entity';
import { Repository } from 'typeorm';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(user: User, dto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create({
      name: dto.name,
      user,
    });
    return this.portfolioRepository.save(portfolio);
  }

  async findAllByUser(auth0Id: string): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { user: { auth0Id } },
      relations: ['holdings'],
      order: { createdAt: 'DESC' },
    });
  }
}
