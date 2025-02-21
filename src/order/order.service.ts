import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrderRepository } from './order.repository';
import { UserRepository } from 'src/user/user.repository';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enum/order-status.enum';
import { OrderItemEntity } from './order.item.entity';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(data: CreateOrderDto): Promise<OrderEntity> {
    const user = await this.userRepository.getById(data.user);

    const productsIds = data.items.map((item) => item.product);
    const products = await this.productRepository.findByIds(productsIds);

    const items = data.items.map((item) => {
      const productsRelation = products.find(
        (product) => product.id === item.product,
      );

      if (productsRelation === undefined) {
        throw new NotFoundException(`Product not found`);
      }

      if (item.quantity > productsRelation.amount) {
        throw new BadRequestException('Insufficient product amount');
      }

      const orderItem = new OrderItemEntity();

      orderItem.price = productsRelation.price;
      orderItem.product = productsRelation;
      orderItem.quantity = item.quantity;
      orderItem.product.amount -= item.quantity;

      return orderItem;
    });

    const total = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = new OrderEntity();

    order.user = user;
    order.total = total;
    order.items = items;
    order.status = OrderStatus.IN_PROCESSING;

    return this.orderRepository.create(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.findAll();
  }

  async findOne(id: string): Promise<OrderEntity | null> {
    return this.orderRepository.findOne(id);
  }

  async update(id: string, data: UpdateOrderDto): Promise<void> {
    await this.orderRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
