import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; username:string; password: string }) {
    return await this.authService.register(body.email, body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { identifier: string; password: string }) {
    const user = await this.authService.validateUser(body.identifier, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return await this.authService.login(user);
  }
}
