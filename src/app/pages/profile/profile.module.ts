import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule
  ]
})
export class ProfileModule { }
