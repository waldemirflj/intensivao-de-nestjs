import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { UserSaveDto } from './dto/save.dto';
import { UserUpdateDto } from './dto/update.dto';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async list() {
    const users = await this.userService.list();
    return users;
  }

  @Post()
  @HttpCode(201)
  async save(@Body() body: UserSaveDto) {
    const usuario = await this.userService.save(body);
    return usuario;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
