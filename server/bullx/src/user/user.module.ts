import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule], // Export UsersService and TypeOrmModule
})
export class UsersModule {}
