import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";
import { Todo } from "../interfaces/todo";

import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(private toastr: ToastrService) {}

  loadAll(): Todo[] {
    const tasks = localStorage["gatefyTasks"];
    return tasks ? JSON.parse(tasks) : [];
  }

  loadById(id): Todo {
    const tasks: Todo[] = this.loadAll();
    return tasks.find(task => task.id === id);
  }

  loadByFilter(filter) {
    const tasks: Todo[] = this.loadAll();
    if (filter === "active") {
      return tasks.filter(task => task.isDone !== true);
    } else if (filter === "done") {
      return tasks.filter(task => task.isDone === true);
    } else {
      return tasks;
    }
  }

  addTask(task: Todo): void {
    const tasks = this.loadAll();
    task.id = uuid();
    tasks.push(task);
    localStorage["gatefyTasks"] = JSON.stringify(tasks);
    this.toastr.success("Nova tarefa cadastrada!");
  }

  updateTask(task: Todo): void {
    const tasks: Todo[] = this.loadAll();
    tasks.forEach((obj, index, objs) => {
      if (task.id === obj.id) {
        objs[index] = task;
      }
    });
    localStorage["gatefyTasks"] = JSON.stringify(tasks);
    this.toastr.success("Sua tarefa foi atualizada!");
  }

  updateStatus(id): void {
    const tasks: Todo[] = this.loadAll();
    tasks.forEach((obj, index, objs) => {
      if (id === obj.id) {
        objs[index].isDone = !obj.isDone;
      }
    });
    localStorage["gatefyTasks"] = JSON.stringify(tasks);
    this.toastr.success("Status da tarefa alterado!");
  }

  delTask(task): void {
    let tasks = this.loadAll();

    if (task === "all") {
      //excluir todas as tarefas
      localStorage.removeItem("gatefyTasks");
    } else if (task === "done") {
      // excluir apenas tarefas finalizadas
      tasks = tasks.filter(localTask => localTask.isDone !== true);
      localStorage["gatefyTasks"] = JSON.stringify(tasks);
    } else {
      //excluir tarefa selecionada
      tasks = tasks.filter(localTask => localTask.id !== task.id);
      localStorage["gatefyTasks"] = JSON.stringify(tasks);
    }
    this.toastr.success("Tarefa(s) excluída(s) com sucesso!");
  }

  totalTasks() {
    const totalTasks = localStorage["gatefyTasks"];

    return totalTasks ? JSON.parse(totalTasks).length : [];
  }
}
