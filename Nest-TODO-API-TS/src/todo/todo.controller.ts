import { Body, Controller, Get, Post, Query, Logger } from '@nestjs/common';
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
        label: 'Task numer 1',
        complete: false,
      },
      {
        label: 'Task numer 2',
        complete: true,
      },
      {
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
}
