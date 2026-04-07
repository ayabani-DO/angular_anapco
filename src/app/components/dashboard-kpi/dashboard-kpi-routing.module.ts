import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardKpiComponent } from './dashboard-kpi.component';

const routes: Routes = [
  { path: '', component: DashboardKpiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardKpiRoutingModule {}
