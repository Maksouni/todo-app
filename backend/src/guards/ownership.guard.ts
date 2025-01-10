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
export class OwnershipGuard implements CanActivate {
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
    const requestedUserId = parseInt(
      context.switchToHttp().getRequest().params.userId,
      10,
    );

    if (isNaN(requestedUserId)) {
      throw new ForbiddenException('Invalid user ID');
    }
    // Check if the user is trying to access their own data by userId
    if (userIdFromToken === requestedUserId) {
      return true;
    }

    // Check if the user has an admin role
    const user = await this.prisma.user.findUnique({
      where: { id: userIdFromToken },
      include: { role: true },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    if (user.role.name === 'admin') {
      return true;
    }

    throw new ForbiddenException('Access denied');
  }
}
