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
    return this.prisma.todo.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  // update(id: number, updateTodoDto: UpdateTodoDto) {
  //   return `This action updates a #${id} todo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
