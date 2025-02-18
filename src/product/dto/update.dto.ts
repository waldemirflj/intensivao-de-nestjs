import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ProductEntity } from '../product.entity';
import { ProductImageEntity } from '../product.image.entity';
import { ProductCharacteristicEntity } from '../product.characteristic.entity';

export class ProductUpdateDto extends ProductEntity {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  amount: number;

  @IsOptional()
  description: string;

  @IsOptional()
  category: string;

  @IsOptional()
  userId: string;
}
