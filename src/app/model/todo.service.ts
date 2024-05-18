import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }
  url = "http://localhost:3000/api/todos"
  http: HttpClient = inject(HttpClient);

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
  }

  getTodo(todo: Todo): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + todo.id)
  }

  addTodo(todo: Todo) {
    return this.http.post(this.url, todo);
  }

  editTodo(todo: Todo) {
    return this.http.put(this.url + '/' + todo.id, todo);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(this.url + '/' + todo.id);
  }
  
}
