import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SchedulesRequestsComponent } from './schedules-requests.component';
import { SchedulesRequestsRouting } from './schedules-requests.routing';
import { SchedulesRequestsService } from './schedules-requests.service';

@NgModule({
  imports: [
    SharedModule,
    SchedulesRequestsRouting
  ],
  declarations: [
    SchedulesRequestsComponent
  ],
  providers: [SchedulesRequestsService],
  bootstrap: []
})
export class SchedulesRequestsModule { }
