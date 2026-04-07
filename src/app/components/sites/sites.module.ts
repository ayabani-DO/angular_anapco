import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SitesRoutingModule } from './sites-routing.module';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SiteListComponent,
    SiteFormComponent,
    SiteDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SitesRoutingModule,
    SharedModule
  ]
})
export class SitesModule {}
