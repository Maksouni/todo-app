import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Passw0rd',
      database: 'todo-app-db',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthModule],
})
export class AppModule {}
