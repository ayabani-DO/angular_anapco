import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaintenanceRoutingModule,
    SharedModule
  ]
})
export class MaintenanceModule {}
