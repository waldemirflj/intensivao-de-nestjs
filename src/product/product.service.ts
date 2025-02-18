import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductSaveDto } from './dto/save.dto';
import { ProductUpdateDto } from './dto/update.dto';
import { ProductOutputDto } from './dto/output.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async list(): Promise<ProductEntity[]> {
    const products = await this.repository.list();

    const productDto = products.map(
      (user) => new ProductOutputDto(user.id, user.name),
    );

    return productDto;
  }

  async save(data: ProductSaveDto): Promise<ProductEntity> {
    const payload: ProductEntity = {
      ...data,
      id: uuid(),
    };

    await this.repository.save(payload);
    return payload;
  }

  async update(id: string, data: ProductUpdateDto): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
