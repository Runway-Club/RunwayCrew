import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbTooltipModule,
  NbUserModule,
  NbTabsetModule,
  NbAccordionComponent,
  NbAccordionModule,
  NbWindowModule,
  NbDialogModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillsComponent } from './components/skills/skills.component';
import { DetailSkillComponent } from './components/detail-skill/detail-skill.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { RolesComponent } from './components/roles/roles.component';
import { ContributionComponent } from './components/contribution/contribution.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { AppModule } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsComponent } from './components/settings/settings.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackDialogComponent } from './components/feedback-dialog/feedback-dialog.component';

@NgModule({
  declarations: [
    ProfileComponent,
    SkillsComponent,
    DetailSkillComponent,
    HeaderComponent,
    BodyComponent,
    RolesComponent,
    ContributionComponent,
    SettingsComponent,
    FeedbackFormComponent,
    FeedbackDialogComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbRadioModule,
    FormsModule,
    NbInputModule,
    NbFormFieldModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbListModule,
    NbTooltipModule,
    NbLayoutModule,
    NbProgressBarModule,
    NbUserModule,
    NbSidebarModule,
    SharedModule,
    RoundProgressModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbAccordionModule,
    NbWindowModule.forChild(),
    NbDialogModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileModule {}
