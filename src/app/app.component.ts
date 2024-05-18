import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Todo } from './model/todo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './model/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todos: Array<Todo> = [];
  todo!: Todo;
  todoService: TodoService = inject(TodoService);
  todoSub!: Subscription;
  editMode: boolean = false;

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoSub = this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  getTodo(id: number) {
    this.todoService.getTodo(id).subscribe((data) => {
      this.todo = data;
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(() => this.getTodos());
  }

  todoForm: FormGroup = new FormGroup({
    todoInput: new FormControl(''),
    todoCheck: new FormControl(false)
  });

  completeTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.editTodo(todo.id, todo).subscribe(() => this.getTodos());
  }

  updateTodo(todo: Todo) {
    this.editMode = true;
    this.todoForm.patchValue({
      todoInput: todo.title,
      todoCheck: todo.completed
    });
    this.todo = todo;
  }
  
  onSubmit() {
    if (this.editMode) {
      this.todo.title = this.todoForm.controls['todoInput'].value;
      this.todo.completed = this.todoForm.controls['todoCheck'].value;
      this.todoService.editTodo(this.todo.id, this.todo).subscribe(() => this.getTodos());
      this.getTodos();
      this.editMode = false;
    } else {
      const id = this.todos.length + 1;
      const input = this.todoForm.controls['todoInput'].value;
      const checked = this.todoForm.controls['todoCheck'].value;
      const todo: Todo = new Todo(id, input, checked);
      this.addTodo(todo);
    }
    this.todoForm.reset();
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.getTodos());
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.todoSub.unsubscribe();
  }
}
