import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbListModule,
    NbAccordionModule,
    NbIconModule,
    NbDialogModule.forChild(),
    SharedModule
  ]
})
export class RoleModule { }
