import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';

const routes: Routes = [
  { path: '', component: SiteListComponent },
  { path: 'create', component: SiteFormComponent },
  { path: 'edit/:id', component: SiteFormComponent },
  { path: ':id', component: SiteDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule {}
