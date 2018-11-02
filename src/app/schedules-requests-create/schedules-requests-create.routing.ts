import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchedulesRequestsCreateComponent } from './schedules-requests-create.component';

const routes: Routes = [
  { path: '', component: SchedulesRequestsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRequestsCreateRouting {}
