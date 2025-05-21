import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchController } from './search.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './search.service';
import { SearchMapService } from './search.map.service';


@Module({
  imports: [HttpModule,ConfigModule],
  providers: [SearchService, SearchMapService],
  controllers: [SearchController],
})
export class SearchModule {}