import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsUUID()
  product: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
