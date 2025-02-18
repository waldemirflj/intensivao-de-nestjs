import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

import { UserSaveDto } from './dto/save.dto';
import { UserUpdateDto } from './dto/update.dto';
import { UserOutputDto } from './dto/output.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list() {
    const users = await this.repository.list();

    const usersDto = users.map(
      (user) => new UserOutputDto(user.id, user.name, user.email),
    );

    return usersDto;
  }

  async save(data: UserSaveDto) {
    const payload: UserEntity = {
      ...data,
      id: uuid(),
    };

    await this.repository.save(payload);
    return payload;
  }

  async getByEmail(email: string) {
    return this.repository.getByEmail(email);
  }

  async update(id: string, data: UserUpdateDto) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
