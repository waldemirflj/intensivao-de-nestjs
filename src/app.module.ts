import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PostgresConfig } from './config/database/postgres.config';
import { OrderModule } from './order/order.module';
import { FilterGlobalException } from './exception/filter-global.exception';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig],
    }),
    OrderModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterGlobalException,
    },
  ],
  controllers: [],
})
export class AppModule {}
