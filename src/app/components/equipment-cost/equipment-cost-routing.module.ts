import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentCostComponent } from './equipment-cost.component';

const routes: Routes = [
  { path: '', component: EquipmentCostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentCostRoutingModule {}
