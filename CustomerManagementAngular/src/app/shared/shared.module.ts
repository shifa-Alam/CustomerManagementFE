import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextAreaComponent } from './input-text-area/input-text-area.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputTextAreaComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
