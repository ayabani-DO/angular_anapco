import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RoleListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule,
    SharedModule
  ]
})
export class RolesModule {}
