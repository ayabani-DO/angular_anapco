import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';

const routes: Routes = [
  { path: '', component: IncidentListComponent },
  { path: 'create', component: IncidentFormComponent },
  { path: 'edit/:id', component: IncidentFormComponent },
  { path: ':id', component: IncidentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentsRoutingModule {}
