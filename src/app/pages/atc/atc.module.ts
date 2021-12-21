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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    NbTagModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule
  ],
})
export class AtcModule { }
