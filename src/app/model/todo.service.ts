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

  getTodos(): Observable<any> {
    return this.http.get(this.url)
  }

  getTodo(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id)
  }

  addTodo(todo: Todo) {
    return this.http.post(this.url, todo);
  }

  editTodo(id: number, todo: Todo) {
    return this.http.put(this.url + '/' + id, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  
}
