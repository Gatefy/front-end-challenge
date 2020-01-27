import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { TodoIsDoneDirective } from "./directives/todo-isdone.directive";
import { TodoService } from "./services/todo.service";

import { ListComponent } from "./pages/list/list.component";
import { AddComponent } from "./pages/add/add.component";
import { EditComponent } from "./pages/edit/edit.component";

import {
  MatButtonModule,
  MatDividerModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule
} from "@angular/material";

import { IconModule } from "@ant-design/icons-angular";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    IconModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    TodoIsDoneDirective
  ],

  providers: [TodoService]
})
export class TodoModule {}
