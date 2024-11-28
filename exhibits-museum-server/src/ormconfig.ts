import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { Exhibit } from './exhibits/exhibits.entity';
import { Comment } from './comments/comments.entity';

export default new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'davidpostgres123!',
    database: 'museum_db',
    synchronize: false,
    entities: [User, Exhibit, Comment],
    migrations: ["src/migrations/**/*"],
})