import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleListRouting } from './schedule-list.routing';
import { ScheduleListService } from './schedule-list.service';


@NgModule({
  imports: [
    SharedModule,
    ScheduleListRouting
  ],
  declarations: [
    ScheduleListComponent
  ],
  providers: [ScheduleListService],
  bootstrap: []
})
export class ScheduleListModule { }
