import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  Req,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { JwtService } from '@nestjs/jwt';
import { TodoOwnershipGuard } from 'src/guards/todo-ownership.guard';

@Controller('todos')
@UseGuards(RoleGuard)
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private jwtService: JwtService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() todoData: Prisma.TodoCreateInput) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const decoded = this.jwtService.decode(token) as { userId: number };
    const userId = decoded.userId;

    try{
      return await this.todosService.create({ ...todoData, userId });
    }
    catch (err){
      throw new InternalServerErrorException()
    }
  }

  @Get()
  @Role('admin')
  async findAll() {
    return await this.todosService.findAll();
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get('user/:id')
  async getTodosByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.todosService.findTodosByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todosService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, TodoOwnershipGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoData: Prisma.TodoUpdateInput,
  ) {
    return this.todosService.update(id, todoData);
  }

  @UseGuards(JwtAuthGuard, TodoOwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
