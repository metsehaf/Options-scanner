import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from '../user/user.service';

@Controller('api/portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(@Body() dto: CreatePortfolioDto, @Request() req: any) {
    const user = await this.userService.findByAuth0Id(req.user.sub);
    if (!user) {
      throw new Error('User not found');
    }
    return this.portfolioService.create(user, dto);
  }

  @Get()
  async getUserPortfolios(@Request() req: { user: { userId: string } }) {
    const auth0Id = req.user.userId;
    return this.portfolioService.findAllByUser(auth0Id);
  }
}
