import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbUserModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }
