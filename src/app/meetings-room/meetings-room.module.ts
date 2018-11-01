import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MeetingsRoomComponent } from './meetings-room.component';
import { MeetingsRoomRouting } from './meetings-room.routing';
import { MeetingsRoomService } from './meetings-room.service';

@NgModule({
  imports: [
    SharedModule,
    MeetingsRoomRouting
  ],
  declarations: [
    MeetingsRoomComponent
  ],
  providers: [MeetingsRoomService],
  bootstrap: []
})
export class MeetingsRoomModule { }
