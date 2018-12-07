import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';

import {CheckboxModule} from 'primeng/checkbox';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    TooltipModule
  ],
  providers: [

  ]

})
export class SharedModule { }
