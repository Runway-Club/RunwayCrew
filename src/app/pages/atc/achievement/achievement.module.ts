import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementRoutingModule } from './achievement-routing.module';
import { AchievementComponent } from './achievement.component';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AchievementComponent
  ],
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
    SharedModule
  ]
})
export class AchievementModule { }
