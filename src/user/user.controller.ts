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

import { UserDtoInput, UserDtoUpdate } from './dto/input.dto';
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
    return this.userService.list();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() body: UserDtoInput) {
    const usuario = await this.userService.create(body);
    return usuario;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() body: UserDtoUpdate) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
