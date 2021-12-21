import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

import {
  NbAccordionModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSearchModule,
  NbSelectModule,
  NbTagModule,
  NbToggleModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination'

@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbListModule,
    NbAccordionModule,
    NbIconModule,
    NbDialogModule.forChild(),
    NbSelectModule,
    NbToggleModule,
    NbUserModule,
    SharedModule,
    NbSearchModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    NbTagModule,
    NgxPaginationModule
  ],
})
export class MembersModule {}
