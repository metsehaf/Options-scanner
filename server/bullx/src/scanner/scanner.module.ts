import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScannerController } from './scanner.controller';
import { HttpModule } from '@nestjs/axios';
import { ScannerService } from './scanner.service';
import { ScannerMapService } from './scanner.map.service';


@Module({
  imports: [HttpModule,ConfigModule],
  providers: [ScannerService, ScannerMapService],
  controllers: [ScannerController],
})
export class ScannerModule {}

