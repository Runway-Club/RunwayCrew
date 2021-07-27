import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbProgressBarModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from './components/skills/skills.component';
import { DetailSkillComponent } from './components/detail-skill/detail-skill.component';
import { HeaderComponent } from './components/header/header.component';
import { RolesComponent } from './components/roles/roles.component';

@NgModule({
  declarations: [ProfileComponent, SkillsComponent, DetailSkillComponent, HeaderComponent, RolesComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbListModule,
    NbLayoutModule,
    NbProgressBarModule,
    NbUserModule,
  ],
})
export class ProfileModule {}
