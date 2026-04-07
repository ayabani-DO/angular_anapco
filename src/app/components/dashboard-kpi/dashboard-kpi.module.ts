import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardKpiRoutingModule } from './dashboard-kpi-routing.module';
import { DashboardKpiComponent } from './dashboard-kpi.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashboardKpiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardKpiRoutingModule,
    SharedModule
  ]
})
export class DashboardKpiModule {}
