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
} from '@nebular/theme';
import { LevelComponent } from './components/level/level.component';
import { FormsModule } from '@angular/forms';

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
    NbProgressBarModule,
    NbTagModule,
    NbIconModule,
    CommunityRoutingModule,
    FormsModule
  ],
})
export class CommunityModule { }
