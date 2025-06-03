import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { auth0Id } });
  }

  async createIfNotExists(auth0Id: string): Promise<User> {
    let user = await this.findByAuth0Id(auth0Id);
    if (!user) {
      user = this.usersRepository.create({ auth0Id });
      await this.usersRepository.save(user);
    }
    return user;
  }
}
