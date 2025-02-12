import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

import { UserDtoInput } from './dto/input.dto';
import { UserDtoOutput } from './dto/output.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list() {
    const users = await this.repository.list();

    const usersDto = users.map(
      (user) => new UserDtoOutput(user.id, user.name, user.email),
    );

    return usersDto;
  }

  async create(data: UserDtoInput) {
    const payload: UserEntity = {
      ...data,
      id: uuid(),
    };

    await this.repository.create(payload);
    return payload;
  }

  async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

  async update(id: string, data: UserDtoInput) {
    const user = await this.repository.update(id, data);

    const userDto = [user].map(
      (user) => new UserDtoOutput(user.id, user.name, user.email),
    );

    return userDto;
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
