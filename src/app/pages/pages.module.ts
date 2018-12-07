

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';


@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule,
  ],
  declarations: [TaskFormComponent, TaskListComponent]
})
export class PagesModule { }
