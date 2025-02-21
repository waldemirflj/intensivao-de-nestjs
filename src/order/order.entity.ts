import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { OrderStatus } from './enum/order-status.enum';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './order.item.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total', nullable: false, type: 'float' })
  total: number;

  @Column({ name: 'status', nullable: false, enum: OrderStatus })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (order) => order.order, {
    eager: false,
    cascade: true,
    createForeignKeyConstraints: true,
  })
  items: OrderItemEntity[];
}
