import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const entities = join(__dirname, '../../**/*.entity.{js,ts}');

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_POSTGRES_HOST'),
      port: this.configService.get<number>('DB_POSTGRES_PORT'),
      username: this.configService.get<string>('DB_POSTGRES_USER'),
      password: this.configService.get<string>('DB_POSTGRES_PASSWORD'),
      database: this.configService.get<string>('DB_POSTGRES_DB'),
      entities: [entities],
      synchronize: false,
      logging: true,
    };
  }
}
