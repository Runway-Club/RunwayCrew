import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtcRoutingModule } from './atc-routing.module';
import { AtcComponent } from './atc.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbLayoutModule,
  NbTooltipModule,
  NbTagModule
} from '@nebular/theme';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AtcComponent],
  imports: [
    CommonModule,
    AtcRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbTooltipModule,
    NbActionsModule,
    SharedModule,
    NbTagModule
  ],
})
export class AtcModule {}
