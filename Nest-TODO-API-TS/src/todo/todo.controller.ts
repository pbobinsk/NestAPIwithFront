import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Logger } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: Todo): void {
    this.logger.log('Handling create() request...');
    return this.todoService.create(todo);
  }

  @Get('create')
  createGet(@Query() params: any): void {
    this.logger.log('Handling create() blueprint request...');
    const todo = {
      id: params.id,
      label: params.label,
      complete: params.complete,
    };
    return this.todoService.create(todo);
  }

  @Get('mock')
  createMock(): void {
    this.logger.log('Handling createMock() blueprint request...');
    const todos = [
      {
        id: 1,
        label: 'Task numer 1',
        complete: false,
      },
      {
        id: 2,
        label: 'Task numer 2',
        complete: true,
      },
      {
        id: 3,  
        label: 'Task numer 3',
        complete: false,
      },
    ];
    this.logger.log(todos);
    return this.todoService.createAll(todos);
  }

  @Get()
  findAll(): Todo[] {
    this.logger.log('Handling findAll() request...');
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    this.logger.log('Handling findOne() request with id=' + id + '...');
    return this.todoService.findOne(id);
  }
    

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() todo: Todo): void {
    this.logger.log('Handling update() request with id=' + id + '...');
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.logger.log('Handling remove() request with id=' + id + '...');
    return this.todoService.remove(id);
  }
}
