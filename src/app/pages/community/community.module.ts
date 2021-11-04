import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbProgressBarModule,
  NbTagModule,
  NbTooltipComponent,
  NbTooltipModule,
} from '@nebular/theme';
import { LevelComponent } from './components/level/level.component';
import { FormsModule } from '@angular/forms';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CommunityComponent, ListUserComponent, LevelComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbFormFieldModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbProgressBarModule,
    NbTagModule,
    CommunityRoutingModule,
    FormsModule,
    RoundProgressModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunityModule { }
