
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'api/task';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }
  getAllByDone(done: boolean): Observable<Task[]> {
    const params = new HttpParams()
      .set('done', done.toString());
    return this.http.get<Task[]>(this.url, { params });
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.url}/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${id}`, task);
  }

  delete(id: number): Observable<Task> {
    return this.http.delete(`${this.url}/${id}`).pipe(map(() => null));
  }



}
