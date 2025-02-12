import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async list() {
    return this.users;
  }

  async create(data: UserEntity) {
    return this.users.push(data);
  }

  async getByEmail(email: string): Promise<boolean> {
    return this.users.find((user) => user.email === email) ? true : false;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, data: Partial<UserEntity>) {
    const user = await this.getById(id);

    Object.entries(data).forEach(([key, value]) => {
      user[key] = value;
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);

    this.users = this.users.filter((user) => user.id !== id);
  }
}
