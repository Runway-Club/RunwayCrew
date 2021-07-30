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
    NbIconModule,
    NbTooltipModule,
    NbProgressBarModule,
    NbTagModule,
    NbIconModule,
    CommunityRoutingModule,
    FormsModule,
    RoundProgressModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommunityModule {}
