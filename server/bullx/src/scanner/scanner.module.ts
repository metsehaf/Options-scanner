import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScannerController } from './scanner.controller';
import { HttpModule } from '@nestjs/axios';
import { ScannerService } from './scanner.service';


@Module({
  imports: [HttpModule,ConfigModule],
  providers: [ScannerService],
  controllers: [ScannerController],
})
export class ScannerModule {}

