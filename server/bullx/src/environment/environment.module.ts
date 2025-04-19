import { Module } from '@nestjs/common';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './enviornment.service';


@Module({
  imports: [],
  providers: [EnvironmentService],
  controllers: [EnvironmentController],
})
export class EnvironmentModule {}
