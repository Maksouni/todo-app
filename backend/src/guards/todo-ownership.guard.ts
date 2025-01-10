import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    const decodedToken = this.jwtService.decode(token) as any;
    const userIdFromToken = decodedToken.userId;
    const requestedTodoId = parseInt(
      context.switchToHttp().getRequest().params.id,
      10,
    );

    if (isNaN(requestedTodoId)) {
      throw new ForbiddenException('Invalid user ID');
    }

    // Check if the user has an admin role
    const user = await this.prisma.user.findUnique({
      where: { id: userIdFromToken },
      include: { role: true },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const todo = await this.prisma.todo.findFirst({
      where: { id: requestedTodoId },
    });
    if (!todo) {
      throw new ForbiddenException('Todo not found');
    }

    if (user.role.name === 'admin' || user.id === todo.userId) {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
