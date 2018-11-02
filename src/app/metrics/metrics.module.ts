import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MetricsService } from './metrics.service';
import { MetricsComponent } from './metrics.component';
import { MetricsRouting } from './metrics.routing';

@NgModule({
  imports: [
    SharedModule,
    MetricsRouting
  ],
  declarations: [
    MetricsComponent
  ],
  providers: [MetricsService],
  bootstrap: []
})
export class MetricsModule { }
