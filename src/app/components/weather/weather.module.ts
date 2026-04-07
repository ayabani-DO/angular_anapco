import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WeatherRoutingModule,
    SharedModule
  ]
})
export class WeatherModule {}
