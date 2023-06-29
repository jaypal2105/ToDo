import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Todo } from '../todo/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: Todo[] = [];
  private todoUpdated = new Subject<Todo[]>();

  getTodos() {
    // Simulate API call to retrieve todos
    setTimeout(() => {
      this.todos = [
        { id: '1', title: 'Todo 1', description: 'Description 1' },
        { id: '2', title: 'Todo 2', description: 'Description 2' },
        { id: '3', title: 'Todo 3', description: 'Description 3' }
      ];
      this.todoUpdated.next([...this.todos]);
    }, 1000);
  }

  getTodoUpdateListener() {
    return this.todoUpdated.asObservable();
  }

  getTodoById(id: string) {
    // Simulate API call to retrieve a todo by ID
    return new Observable<Todo>((observer) => {
      const todo = this.todos.find(t => t.id === id);
      observer.next(todo);
      observer.complete();
    });
  }

  addTodo(todo: Todo) {
    // Simulate API call to add a new todo
    todo.id = Math.random().toString();
    this.todos.push(todo);
    this.todoUpdated.next([...this.todos]);
  }

  updateTodo(todo: Todo) {
    // Simulate API call to update a todo
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index >= 0) {
      this.todos[index] = todo;
      this.todoUpdated.next([...this.todos]);
    }
  }

  deleteTodo(id: string) {
    // Simulate API call to delete a todo
    const index = this.todos.findIndex(t => t.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
      this.todoUpdated.next([...this.todos]);
    }
  }
}
