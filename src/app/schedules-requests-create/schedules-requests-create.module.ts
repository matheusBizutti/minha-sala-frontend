import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SchedulesRequestsCreateComponent } from './schedules-requests-create.component';
import { SchedulesRequestsCreateRouting } from './schedules-requests-create.routing';
import { SchedulesRequestsCreateService } from './schedules-requests-create.service';

@NgModule({
  imports: [
    SharedModule,
    SchedulesRequestsCreateRouting
  ],
  declarations: [
    SchedulesRequestsCreateComponent
  ],
  providers: [SchedulesRequestsCreateService],
  bootstrap: []
})
export class ScheduleRequestsCreateModule { }
