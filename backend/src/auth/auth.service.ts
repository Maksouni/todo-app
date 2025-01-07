import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, username: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
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

  async validateUser(identifier: string, password: string): Promise<any> {
    // Определяем, является ли идентификатор email
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    // Ищем пользователя по email или username
    const user = await this.prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { username: identifier },
    });

    // Если пользователь не найден или пароль неверный
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: { id: number; email: string }) {
    const payload = { email: user.email, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
