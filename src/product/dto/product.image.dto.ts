import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { ProductEntity } from '../product.entity';
import { ProductImageEntity } from '../product.image.entity';

export class ProductImageDto extends ProductImageEntity {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  product: ProductEntity;
}
