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

import { ProductImageDto } from './product.image.dto';
import { ProductCharacteristicDto } from './product.characteristic.dto';

export class ProductSaveDto extends ProductEntity {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDto)
  images: ProductImageEntity[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductCharacteristicDto)
  characteristics: ProductCharacteristicEntity[];
}
