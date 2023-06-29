import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from '../todo/todo-list/todo-list.component';
import { TodoFormComponent } from '../todo/todo-form/todo-form.component';
import { FormsModule } from '@angular/forms';
import { Todo } from '../todo/todo.model';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: TodoFormComponent },
  { path: 'edit/:id', component: TodoFormComponent }
];

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ToDoModule { }
export { Todo };
