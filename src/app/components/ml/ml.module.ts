import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MlRoutingModule } from './ml-routing.module';
import { MlComponent } from './ml.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MlComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MlRoutingModule,
    SharedModule
  ]
})
export class MlModule {}
