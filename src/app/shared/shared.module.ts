import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbLayoutModule } from '@nebular/theme';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
