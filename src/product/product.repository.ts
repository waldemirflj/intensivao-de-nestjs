import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';

import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async list(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async save(data: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(data);
  }

  async getById(id: string): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, data: Partial<ProductEntity>): Promise<void> {
    await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findByIds(ids: string[]): Promise<ProductEntity[]> {
    return this.productRepository.findBy({
      id: In(ids),
    });
  }
}
