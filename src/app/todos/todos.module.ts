import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosMainComponent } from './todos-main/todos-main.component';


@NgModule({
  declarations: [TodosMainComponent],
  imports: [
    CommonModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TodosModule { }
