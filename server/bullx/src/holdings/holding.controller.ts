import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PortfolioHoldingService } from './holding.service';
import {
  CreateHoldingDto,
  UpdateHoldingDto,
} from './dto/create-portfolio-stock.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/holdings')
@UseGuards(JwtAuthGuard)
export class HoldingController {
  private readonly logger = new Logger(HoldingController.name); // 📢 this will tag logs with 'holding service'
  constructor(private readonly stockService: PortfolioHoldingService) {}

  @Get()
  async getStocks(@Param('portfolioId') portfolioId: string) {
    return this.stockService.findByPortfolio(portfolioId);
  }

  @Get(':portfolioId')
  async getHoldings(
    @Param('portfolioId') portfolioId: string,
    @Query('limit') limit: number,
    @Query('cursorId') cursorId: number,
    @Req() req: any,
  ) {
    const auth0Id = req.user.userId;
    this.logger.log(
      `Fetching holdings for userId: ${auth0Id}, portfolioId: ${portfolioId}, limit: ${limit}, cursorId: ${cursorId}`,
    );
    return this.stockService.getPortfolioWithHoldings(
      auth0Id,
      portfolioId,
      limit,
      cursorId,
    );
  }

  @Post()
  async addStock(
    @Query('portfolioId') portfolioId: string,
    @Body() dto: CreateHoldingDto,
  ) {
    return this.stockService.addHolding(portfolioId, dto);
  }

  @Patch(':id')
  async updateStock(@Param('id') id: string, @Body() dto: UpdateHoldingDto) {
    return this.stockService.updateHolding(id, dto);
  }

  @Delete(':id')
  async deleteStock(@Param('id') id: string) {
    return this.stockService.removeHolding(id);
  }
}
