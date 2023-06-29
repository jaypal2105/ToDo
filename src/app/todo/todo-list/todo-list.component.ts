import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { Todo } from 'src/app/to-do-module/to-do-module.module';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  private todoUpdated = new Subject<Todo[]>();

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getTodoUpdateListener()
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  onAddTodo() {
    this.router.navigate(['/todo/add']);
  }

  onEditTodo(id: string) {
    this.router.navigate(['/todo/edit', id]);
  }

  onDeleteTodo(id: string) {
    this.todoService.deleteTodo(id);
  }
}




