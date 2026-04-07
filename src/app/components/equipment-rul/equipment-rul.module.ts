import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EquipmentRulRoutingModule } from './equipment-rul-routing.module';
import { EquipmentRulComponent } from './equipment-rul.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EquipmentRulComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EquipmentRulRoutingModule,
    SharedModule
  ]
})
export class EquipmentRulModule {}
