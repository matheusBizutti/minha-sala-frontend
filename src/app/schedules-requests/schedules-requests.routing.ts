import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulesRequestsComponent } from './schedules-requests.component';

const routes: Routes = [
  { path: '', component: SchedulesRequestsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRequestsRouting {}
