import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TodoService } from 'src/app/service/todo.service';
import { Todo } from 'src/app/to-do-module/to-do-module.module';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo!: Todo;
  private unsubscribe = new Subject<void>();

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe))
      .subscribe((paramMap: ParamMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.todoService.getTodoById(id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((todo: Todo) => {
              this.todo = todo;
            });
        } else {
          this.todo = { id: '', title: '', description: '' };
        }
      });
  }
  onSaveTodo() {
    if (this.todo.id) {
      this.todoService.updateTodo(this.todo);
    } else {
      this.todoService.addTodo(this.todo);
    }
    this.router.navigate(['/todo']);
  }

  onCancel() {
    this.router.navigate(['/todo']);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}