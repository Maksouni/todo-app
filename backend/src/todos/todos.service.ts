import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService){}
  
  create(data: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data
    });
  }

  findAll() {
    return `This action returns all todos`;
  }

  async findTodosByUserId(userId: number) {
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
