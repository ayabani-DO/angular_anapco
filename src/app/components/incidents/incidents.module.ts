import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    IncidentListComponent,
    IncidentFormComponent,
    IncidentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IncidentsRoutingModule,
    SharedModule
  ]
})
export class IncidentsModule {}
