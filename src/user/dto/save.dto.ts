import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

import { UserEntity } from '../user.entity';
import { SingleEmailValidator } from 'src/utils/decorators/single-email.validator';

export class UserSaveDto extends UserEntity {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @SingleEmailValidator({ message: 'Email already registered' })
  email: string;

  @MinLength(6)
  password: string;
}
