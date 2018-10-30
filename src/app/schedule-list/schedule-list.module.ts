import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ScheduleListComponent } from './schedule-list.component';
import { ScheduleListRouting } from './schedule-list.routing';


@NgModule({
  imports: [
    SharedModule,
    ScheduleListRouting
  ],
  declarations: [
    ScheduleListComponent
  ],
  providers: [],
  bootstrap: []
})
export class ScheduleListModule { }
