import 'dotenv/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

const entities = join(__dirname, '../../**/*.entity.{js,ts}');
const migrations = join(__dirname, '../../database/migrations/*.{js,ts}');

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST,
  port: Number(process.env.DB_POSTGRES_PORT),
  username: process.env.DB_POSTGRES_USER,
  password: process.env.DB_POSTGRES_PASSWORD,
  database: process.env.DB_POSTGRES_DB,
  entities: [entities],
  migrations: [migrations],
  synchronize: false,
  logging: true,
};
