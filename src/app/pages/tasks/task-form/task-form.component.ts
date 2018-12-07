import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/model/task.model';
import { TaskService } from 'src/app/service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { switchMap } from 'rxjs/operators';
import { MenuItem } from 'primeng/components/common/menuitem';
import { BreadcrumbService } from 'src/app/core/components/breadcrumb/breadcrumb.service';
import { NavegadorService } from 'src/app/core/components/navegador/navegador.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  form: FormGroup;
  submittingForm = false;
  currentAction: string;
  serverErrorMessages: string[] = null;

  task: Task;


  private breadcrumb = [{ label: 'Pages' }, { label: 'Tarefas', routerLink: ['/pages/taks'] }];
  private navegador: MenuItem = { label: 'Tarefas', routerLink: ['/pages/tasks'], icon: 'pi pi-angle-double-left' };

  constructor(
    private service: TaskService,
    private formBuilder: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private navegadorService: NavegadorService,
    private route: ActivatedRoute,
    private router: Router,
    private growl: MessageService,
  ) { }

  ngOnInit() {
    this.breadcrumbService.setItems(this.breadcrumb);
    this.navegadorService.setItems(this.navegador);
    this.buildForm();
    this.setCurrentAction();
    this.loadTask();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.create();
    } else {
      this.update();
    }
  }


  private create() {
    const task: Task = Object.assign(new Task(), this.form.value);
    task.done = false;
    this.service.create(task)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }


  private update() {
    const task: Task = Object.assign(new Task(), this.form.value);

    this.service.update(task.id, task)
      .subscribe(
        result => this.actionsForSuccess(result),
        error => this.actionsForError(error)
      );
  }


  private actionsForSuccess(task: Task) {

    this.growl.add({ severity: 'success', summary: 'Info', detail: `Solicitação processada com sucesso!` });

    this.router.navigateByUrl('taks', { skipLocationChange: true }).then(
      () => this.router.navigate(['pages/tasks', task.id, 'edit'])
    );
  }

  private actionsForError(error) {

    this.growl.add({ severity: 'error', summary: 'Erro', detail: `Ocorreu um erro ao processar a sua solicitação!` });
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }

  }


  private buildForm() {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private setCurrentAction() {

    if (this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private loadTask() {
    if (this.currentAction === 'edit') {

      this.route.paramMap.pipe(
        switchMap(params => this.service.getById(+params.get('id')))
      )
        .subscribe(
          (category) => {
            this.task = category;
            this.form.patchValue(category);
          },
          (error) => { console.log('Ocorreu um erro no servidor, tente mais tarde.', error); }
        );
    }
  }

}
