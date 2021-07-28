import { NgModule } from '@angular/core';
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
  ],
})
export class CommunityModule {}
