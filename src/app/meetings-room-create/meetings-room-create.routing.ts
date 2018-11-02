import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeetingsRoomCreateComponent } from './meetings-room-create.component';

const routes: Routes = [
  { path: '', component: MeetingsRoomCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoomCreateRouting {}
