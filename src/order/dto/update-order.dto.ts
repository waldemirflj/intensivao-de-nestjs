import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { OrderStatus } from '../enum/order-status.enum';
import { OrderEntity } from '../order.entity';

export class UpdateOrderDto extends OrderEntity {
  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
