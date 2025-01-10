import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('users')
@UseGuards(RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: { email: string; username:string; password: string; roleId: number }) {
    return await this.usersService.create(body.email, body.username, body.password, body.roleId);
  }

  @Get()
  @Role("admin")
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }


  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: updateUserDto.UpdateUserDto) {
  //   return await this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(+id);
  }
}
