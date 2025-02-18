import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductImageEntity } from 'src/product/product.image.entity';
import { ProductCharacteristicEntity } from 'src/product/product.characteristic.entity';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_POSTGRES_HOST'),
      port: this.configService.get<number>('DB_POSTGRES_PORT'),
      username: this.configService.get<string>('DB_POSTGRES_USER'),
      password: this.configService.get<string>('DB_POSTGRES_PASSWORD'),
      database: this.configService.get<string>('DB_POSTGRES_DB'),
      entities: [
        UserEntity,
        ProductEntity,
        ProductImageEntity,
        ProductCharacteristicEntity,
      ],
      synchronize: true,
      logging: true,
    };
  }
}
