import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoRoutes } from "./components/todo/todo-routing.module";

import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/todos",
    pathMatch: "full"
  },

  ...TodoRoutes,

  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
