import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssistantRoutingModule } from './assistant-routing.module';
import { AssistantComponent } from './assistant.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AssistantComponent],
  imports: [
    CommonModule,
    FormsModule,
    AssistantRoutingModule,
    SharedModule
  ]
})
export class AssistantModule {}
