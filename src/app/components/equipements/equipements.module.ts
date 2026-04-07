import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EquipementsRoutingModule } from './equipements-routing.module';
import { EquipementListComponent } from './equipement-list/equipement-list.component';
import { EquipementFormComponent } from './equipement-form/equipement-form.component';
import { EquipementDetailComponent } from './equipement-detail/equipement-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    EquipementListComponent,
    EquipementFormComponent,
    EquipementDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EquipementsRoutingModule,
    SharedModule
  ]
})
export class EquipementsModule {}
