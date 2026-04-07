import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipmentCostRoutingModule } from './equipment-cost-routing.module';
import { EquipmentCostComponent } from './equipment-cost.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EquipmentCostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EquipmentCostRoutingModule,
    SharedModule
  ]
})
export class EquipmentCostModule {}
