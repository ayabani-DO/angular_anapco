import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipementListComponent } from './equipement-list/equipement-list.component';
import { EquipementFormComponent } from './equipement-form/equipement-form.component';
import { EquipementDetailComponent } from './equipement-detail/equipement-detail.component';

const routes: Routes = [
  { path: '', component: EquipementListComponent },
  { path: 'create', component: EquipementFormComponent },
  { path: 'edit/:id', component: EquipementFormComponent },
  { path: ':id', component: EquipementDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipementsRoutingModule {}
