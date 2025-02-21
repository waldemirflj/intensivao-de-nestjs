import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(data: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(data);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['user'],
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
        },
      },
    });
  }

  async findOne(id: string): Promise<OrderEntity | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        user: {
          id: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(id: string, data: Partial<OrderEntity>): Promise<void> {
    await this.orderRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
