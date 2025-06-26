import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/user/user.module';
import { PortfolioSnapshot } from './entity/snapshot-entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { PortfolioSnapshotController } from './snapshot-controller';
import { PortfolioSnapshotService } from './snapshot-service';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    TypeOrmModule.forFeature([PortfolioSnapshot, Portfolio]), // Register both entities
    AuthModule, // Ensure AuthModule is imported so JwtStrategy is available
  ],
  controllers: [PortfolioSnapshotController],
  providers: [PortfolioSnapshotService],
  exports: [PortfolioSnapshotService],
})
export class PortfolioSnapshotModule {
  // This module handles the portfolio management functionality
  // It includes controllers and services for managing user portfolios
  // and integrates with the User entity for user-specific data.
}
