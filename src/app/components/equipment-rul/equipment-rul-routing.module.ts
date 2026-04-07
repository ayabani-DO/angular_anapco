import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentRulComponent } from './equipment-rul.component';

const routes: Routes = [
  { path: '', component: EquipmentRulComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRulRoutingModule {}
