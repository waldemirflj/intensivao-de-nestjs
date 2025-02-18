import { ProductEntity } from '../product.entity';

export class ProductOutputDto extends ProductEntity {
  constructor(
    readonly id: string,
    readonly name: string,
  ) {
    super();
  }
}
