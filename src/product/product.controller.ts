import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductSaveDto } from './dto/save.dto';
import { ProductUpdateDto } from './dto/update.dto';
import { ProductService } from './product.service';

@Controller({
  path: 'product',
  version: '1',
})
export class UserController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(200)
  async list() {
    const products = await this.productService.list();
    return products;
  }

  @Post()
  @HttpCode(201)
  async save(@Body() body: ProductSaveDto) {
    const product = await this.productService.save(body);
    return product;
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() body: ProductUpdateDto) {
    await this.productService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    await this.productService.delete(id);
  }
}
