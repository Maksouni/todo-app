import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoUncheckedCreateInput & { userId: number }) {
    return await this.prisma.todo.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany();
  }

  async findTodosByUserId(userId: number) {
    return await this.prisma.todo.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    return await this.prisma.todo.findFirst({
      where: { id }
    });
  }

  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return `This action updates a #${id} todo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
