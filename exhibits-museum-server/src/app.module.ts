import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { ExhibitsModule } from './exhibits/exhibits.module';
import { Exhibit } from './exhibits/exhibits.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Exhibit],
      synchronize: false
    }), 
    UsersModule, 
    AuthModule, 
    ExhibitsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
