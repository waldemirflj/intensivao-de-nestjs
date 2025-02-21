import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateItemDto } from './create-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  user: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}
