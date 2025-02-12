import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SingleEmail } from 'src/utils/decorators/single-email.validator';

@Module({
  exports: [],
  providers: [UserRepository, SingleEmail, UserService],
  controllers: [UserController],
})
export class UserModule {}
