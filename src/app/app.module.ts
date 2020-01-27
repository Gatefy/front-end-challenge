import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IconModule } from "@ant-design/icons-angular";
import { ToastrModule } from "ngx-toastr";

import { TodoModule } from "./components/todo/todo.module";
import { HeaderComponent } from "./components/header/header.component";
import { LeftMenuComponent } from "./components/left-menu/left-menu.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";

import {
  MatDialogModule,
  MatBadgeModule,
  MatTooltipModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LeftMenuComponent,
    HeaderComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TodoModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IconModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      progressBar: true
    })
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
