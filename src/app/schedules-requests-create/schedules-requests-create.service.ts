import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchedulesRequestsCreateService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  create(body = {}): Observable<any> {
    return this.http.post(this.baseUrl.getBaseUrl() + 'schedule-request/create', body, { responseType: 'text'});
  }

  getMeetings(): Observable<any> {
    return this.http.get(this.baseUrl.getBaseUrl() + 'meeting-room/list/init/end');
  }

}

