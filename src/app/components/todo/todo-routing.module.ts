import { Routes } from "@angular/router";
import { ListComponent } from "./pages/list/list.component";
import { AddComponent } from "./pages/add/add.component";
import { EditComponent } from "./pages/edit/edit.component";

export const TodoRoutes: Routes = [
  {
    path: "todos",
    component: ListComponent
  },
  {
    path: "todo/new",
    component: AddComponent
  },
  {
    path: "todo/edit/:id",
    component: EditComponent
  }
];
