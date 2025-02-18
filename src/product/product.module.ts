import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRepository } from './product.repository';
import { UserController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { ProductImageEntity } from './product.image.entity';
import { ProductCharacteristicEntity } from './product.characteristic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductImageEntity,
      ProductCharacteristicEntity,
    ]),
  ],
  providers: [ProductRepository, ProductService],
  controllers: [UserController],
})
export class ProductModule {}
