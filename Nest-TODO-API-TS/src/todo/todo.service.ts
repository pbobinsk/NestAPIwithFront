import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private storage: Todo[] = [];

  create(todo: Todo): void {
    const currentMaxId = Math.max(...this.storage.map((t: Todo) => t.id));
    todo.id = currentMaxId + 1;
    this.storage.push(todo);
  }
  createAll(todos: Todo[]): void {
    this.storage = todos;
  }

  findAll(): Todo[] {
    return this.storage;
  }
}
