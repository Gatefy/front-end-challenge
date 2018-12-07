import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NavegadorComponent } from './components/navegador/navegador.component';
import { GrowlModule, ConfirmDialogModule, ConfirmationService, MessageService } from 'primeng/primeng';


@NgModule({
  declarations: [
    NotFoundComponent,
    NavBarComponent,
    BreadcrumbComponent,
    NavegadorComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    HttpClientModule,
    GrowlModule,
    ConfirmDialogModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  exports: [
    BrowserAnimationsModule,
    NavBarComponent,
    BreadcrumbComponent,
    NavegadorComponent,
    GrowlModule,
    ConfirmDialogModule

  ],
  providers: [
    Title,
    ConfirmationService,
    MessageService,
  ],

})
export class CoreModule {

  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule ja carregado.');
    }

  }
}
