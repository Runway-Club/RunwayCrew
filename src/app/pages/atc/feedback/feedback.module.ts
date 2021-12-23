import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { SharedModule } from 'src/app/shared/shared.module';
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
  NbSelectModule,
  NbToggleModule,
  NbUserModule,
  NbTooltipModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxPaginationModule } from 'ngx-pagination'
import { MatPaginatorModule } from '@angular/material/paginator';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
@NgModule({
  declarations: [
    FeedbackComponent,
    InfoDialogComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule,
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
    NbAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    NgxPaginationModule,
    MatPaginatorModule,
    NbTooltipModule
  ]
})
export class FeedbackModule { }
