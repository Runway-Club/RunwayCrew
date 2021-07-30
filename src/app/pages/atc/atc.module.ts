import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtcRoutingModule } from './atc-routing.module';
import { AtcComponent } from './atc.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbLayoutModule,
  NbTooltipModule,
} from '@nebular/theme';

@NgModule({
  declarations: [AtcComponent],
  imports: [
    CommonModule,
    AtcRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbTooltipModule,
    NbActionsModule,
  ],
})
export class AtcModule {}
