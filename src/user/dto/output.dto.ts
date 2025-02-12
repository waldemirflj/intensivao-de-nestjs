import { UserEntity } from '../user.entity';

export class UserDtoOutput extends UserEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
  ) {
    super();
  }
}
