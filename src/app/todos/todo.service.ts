import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API = `${environment.API}/todos`;

constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Todo[]>(this.API);
  }

  save(todo) {
    if (todo.id !== null) {
      return this.edit(todo);
    } else {
      return this.create(todo);
    }
  }

  create(todo) {
    return this.http.post(this.API, todo).pipe(take(1));
  }

  edit(todo) {
    return this.http.put(`${this.API}/${todo.id}`, todo).pipe(take(1));
  }

  delete(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
