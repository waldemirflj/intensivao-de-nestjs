import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from 'src/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class SingleEmail implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const email = await this.userService.getByEmail(value);
    return !email;
  }
}

export const SingleEmailValidator = (options: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [],
      validator: SingleEmail,
    });
  };
};
