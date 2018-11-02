import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrl } from '../baseurl/baseurl.service';

@Injectable()
export class MetricsService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  create(body = {}): Observable<any> {
    return this.http.post(this.baseUrl.getBaseUrl() + 'metrics/create', body, { responseType: 'text'});
  }

  getMetrics(): Observable<any> {
    return this.http.get(this.baseUrl.getBaseUrl() + 'metrics/list/init/end');
  }

}

