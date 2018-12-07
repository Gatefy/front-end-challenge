import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from './model/task.model';



export class InMemoryDatabase implements InMemoryDbService {


  createDb() {

    const task: Task[] = [
      { id: 1, name: 'TASK 1', description: 'DESCRIPCTION', done: false },
      { id: 2, name: 'TASK 2', description: 'DESCRIPCTION', done: true },
      { id: 3, name: 'TASK 3', description: 'DESCRIPCTION', done: false },
      { id: 4, name: 'TASK 4', description: 'DESCRIPCTION', done: true },
      { id: 5, name: 'TASK 5', description: 'DESCRIPCTION', done: true },
      { id: 6, name: 'TASK 6', description: 'DESCRIPCTION', done: false },

    ];

    return { task };
  }


}
