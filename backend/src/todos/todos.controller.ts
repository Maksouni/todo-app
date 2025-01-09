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
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Prisma } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('todos')
@UseGuards(RoleGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() todoData: Prisma.TodoCreateInput) {
    return this.todosService.create(todoData);
  }

  @Get()
  @Role('admin')
  findAll() {
    return this.todosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getTodosByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.todosService.findTodosByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todosService.update(+id, updateTodoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
function SetMetadata(arg0: string, role: string) {
  throw new Error('Function not implemented.');
}

