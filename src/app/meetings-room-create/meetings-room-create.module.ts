import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MeetingsRoomCreateComponent } from './meetings-room-create.component';
import { MeetingsRoomCreateRouting } from './meetings-room-create.routing';
import { MeetingsRoomCreateService } from './meetings-room-create.service';

@NgModule({
  imports: [
    SharedModule,
    MeetingsRoomCreateRouting
  ],
  declarations: [
    MeetingsRoomCreateComponent
  ],
  providers: [MeetingsRoomCreateService],
  bootstrap: []
})
export class MeetingsRoomCreateModule { }
