import { IsNotEmpty, IsString } from 'class-validator';

import { ProductEntity } from '../product.entity';
import { ProductCharacteristicEntity } from '../product.characteristic.entity';

export class ProductCharacteristicDto extends ProductCharacteristicEntity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}
