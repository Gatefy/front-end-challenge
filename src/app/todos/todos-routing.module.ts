import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosMainComponent } from './todos-main/todos-main.component';


const routes: Routes = [
  {path: '', component: TodosMainComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
