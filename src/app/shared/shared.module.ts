import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ThfModule } from '@totvs/thf-ui';

import { InterceptorModule } from '../interceptor/interceptor.module';
import { MetricsService } from '../metrics/metrics.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    InterceptorModule,

    ThfModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    ThfModule
  ],
  providers: [MetricsService]
})
export class SharedModule { }
