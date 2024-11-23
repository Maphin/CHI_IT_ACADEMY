import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'davidpostgres123!',
    database: 'usersdb',
    synchronize: true,
    logging: true,
    entities: ["src/entities/**/*"],
    migrations: ["src/migrations/**/*"],
})