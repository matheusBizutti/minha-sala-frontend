import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  siginAuth(body = {}): Observable<any> {
    return this.http.post(this.baseUrl.getBaseUrlAuthenticate() + 'signin', body);
  }

}

