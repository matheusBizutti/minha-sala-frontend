import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchedulesRequestsService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  getSchedulesRequests(): Observable<any> {
    return this.http.get(this.baseUrl.getBaseUrl() + 'schedule-request/list/init/end');
  }

  updateSchedulesRequests(body = {}, scheduleId = ''): Observable<any> {
    return this.http.put(this.baseUrl.getBaseUrl() + 'schedule-request/' + `${scheduleId}` + '/update',  body, { responseType: 'text'});
  }

  deleteSchedulesRequests(scheduleId = ''): Observable<any> {
    return this.http.delete(this.baseUrl.getBaseUrl() + 'schedule-request/' + `${scheduleId}` + '/delete', { responseType: 'text' });
  }

}

