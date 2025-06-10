import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { User } from 'src/user/entities/user.entity';
import { Portfolio } from './entities/portfolio.entity';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    TypeOrmModule.forFeature([Portfolio, User]), // Register both entities
    AuthModule, // Ensure AuthModule is imported so JwtStrategy is available
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {
  // This module handles the portfolio management functionality
  // It includes controllers and services for managing user portfolios
  // and integrates with the User entity for user-specific data.
}
