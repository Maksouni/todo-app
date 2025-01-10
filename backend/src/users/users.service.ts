import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { RoleGuard } from 'src/guards/role.guard';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, username: string, password: string, roleId: number) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            roleId: roleId
          },
        });
        return user;
      } catch (error) {
        if (error.code === 'P2002') {
          // Определяем поле, вызвавшее ошибку
          const target = error.meta?.target || 'email or username';
          throw new ConflictException(`${target} already exists`);
        }
  
        // Если ошибка неизвестна, выбрасываем общее исключение
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }

  
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
