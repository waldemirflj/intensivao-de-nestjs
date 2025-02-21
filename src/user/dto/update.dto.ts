import { PartialType } from '@nestjs/mapped-types';

import { UserSaveDto } from './save.dto';

export class UserUpdateDto extends PartialType(UserSaveDto) {}
