import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FiltroPipe } from './filtro.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FiltroPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
