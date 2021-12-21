import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementRoutingModule } from './achievement-routing.module';
import { AchievementComponent } from './achievement.component';
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
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination'

@NgModule({
  declarations: [AchievementComponent],
  imports: [
    CommonModule,
    AchievementRoutingModule,
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
    SharedModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
    NbUserModule,
    NgxPaginationModule
  ],
})
export class AchievementModule {}
