import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'davidpostgres123!',
    database: 'usersdb',
    synchronize: false,
    entities: [User],
    migrations: ["src/migrations/**/*"],
})