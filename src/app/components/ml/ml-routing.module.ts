import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MlComponent } from './ml.component';

const routes: Routes = [
  { path: '', component: MlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MlRoutingModule {}
