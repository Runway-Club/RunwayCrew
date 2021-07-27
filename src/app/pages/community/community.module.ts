import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityComponent } from './community.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import {
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbTagModule,
} from '@nebular/theme';

@NgModule({
  declarations: [CommunityComponent, ListUserComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbFormFieldModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbTagModule,
    CommunityRoutingModule,
  ],
})
export class CommunityModule {}
