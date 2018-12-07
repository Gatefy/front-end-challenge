import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/components/common/menuitem';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/breadcrumb.service';
import { NavegadorService } from 'src/app/core/components/navegador/navegador.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Task[];
  tasksSelectd: Task[] = [];

  selectAll = false;

  status = undefined;

  private breadcrumb = [{ label: 'Pages' }, { label: 'Tarefas', routerLink: ['/pages/tasks'] }];
  private navegador: MenuItem = { label: 'Tarefas', routerLink: ['/pages/tasks/new'], icon: 'pi pi-plus-circle' };

  constructor(
    private service: TaskService,
    private growl: MessageService,
    private breadcrumbService: BreadcrumbService,
    private navegadorService: NavegadorService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit() {
    this.breadcrumbService.setItems(this.breadcrumb);
    this.navegadorService.setItems(this.navegador);
    this.getAll();
  }

  filtrar() {

    if (this.status) {
      const filtro = this.status === 'F' ? true : false;

      this.service.getAllByDone(filtro).subscribe(
        (result) => {
          this.tasks = result;
        }
      );
    } else {

      this.getAll();
    }

  }

  getAll() {
    this.service.getAll().subscribe(
      (result) => {
        this.tasks = result;
      }
    );
  }

  marcarTarefasSelecionadasComoFeita() {
    this.tasksSelectd.forEach(t => {
      t.done = true;
      this.service.update(t.id, t).subscribe(() => null);
    });
  }

  confirmDeleteAll() {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir todas as tarefas?',
      accept: () => {
        this.deleteAll();
      }
    });
  }


  changeStatus(task: Task) {
    task.done = !task.done;
    this.service.update(task.id, task)
      .subscribe(
        (result) => {
          const msg = task.done ? 'concluida' : 'pendente';
          this.growl.add({ severity: 'success', summary: 'Info', detail: `Tarefa ${msg}` });
        },
        (error => {
          this.growl.add({ severity: 'success', summary: 'Info', detail: 'Erro ao concluir a Tarefa' });
          console.log(error);
        }));
  }

  confirmDelete(task: Task) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(task);
      }
    });
  }

  delete(task: Task) {
    this.service.delete(task.id).subscribe(
      () => this.tasks = this.tasks.filter(element => element !== task),
      () => this.growl.add({ severity: 'success', summary: 'Info', detail: 'Erro ao concluir a Tarefa' })
    );

  }

  deleteAll() {
    this.tasksSelectd.forEach(t => {
      this.service.delete(t.id).subscribe(
        () => this.tasks = this.tasks.filter(element => element !== t)
      );
    });
  }

  selectAllOrDeselected() {
    this.tasksSelectd = this.selectAll ? this.tasks : [];
  }

}
