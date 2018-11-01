import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeetingsRoomService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  getMeetingsRoomOpen(): Observable<any> {
    return this.http.get(this.baseUrl.getBaseUrl() + 'meeting-room/list/open');
  }

  getMeetingsRoomBusy(): Observable<any> {
    return this.http.get(this.baseUrl.getBaseUrl() + 'meeting-room/list/busy');
  }

  updateMeetingRoom(body = {}, roomId = ''): Observable<any> {
    return this.http.put(this.baseUrl.getBaseUrl() + 'meeting-room/' + `${roomId}` + '/update',  body, { responseType: 'text'});
  }

  deleteMeetingRoom(roomId = ''): Observable<any> {
    return this.http.delete(this.baseUrl.getBaseUrl() + 'meeting-room/' + `${roomId}` + '/delete', { responseType: 'text' });
  }

}

