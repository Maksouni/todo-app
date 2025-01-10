import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const todo = await this.prisma.todo.findFirst({
      where: { id },
    });
    return todo;
  }

  async update(id: number, data: Prisma.TodoUpdateInput) {
    return await this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }
}
