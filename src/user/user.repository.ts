import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async save(data: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  async getByEmail(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, data: Partial<UserEntity>): Promise<void> {
    await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
