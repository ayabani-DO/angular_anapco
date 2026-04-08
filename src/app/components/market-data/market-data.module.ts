import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarketDataRoutingModule } from './market-data-routing.module';
import { MarketDataComponent } from './market-data.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MarketDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MarketDataRoutingModule,
    SharedModule
  ]
})
export class MarketDataModule {}
