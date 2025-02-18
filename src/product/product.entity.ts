import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { ProductImageEntity } from './product.image.entity';
import { ProductCharacteristicEntity } from './product.characteristic.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false, type: 'float' })
  price: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'category', nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ProductImageEntity, (image) => image.product, {
    eager: true,
    cascade: true,
    createForeignKeyConstraints: true,
  })
  images: ProductImageEntity[];

  @OneToMany(
    () => ProductCharacteristicEntity,
    (characteristic) => characteristic.product,
    {
      eager: true,
      cascade: true,
      createForeignKeyConstraints: true,
    },
  )
  characteristics: ProductCharacteristicEntity[];
}
