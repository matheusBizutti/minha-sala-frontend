import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeetingsRoomCreateService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  create(body = {}): Observable<any> {
    return this.http.post(this.baseUrl.getBaseUrl() + 'meeting-room/create', body, { responseType: 'text'});
  }

}

