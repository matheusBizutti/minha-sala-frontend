import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignupService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  signUp(body = {}): Observable<any> {
    return this.http.post(this.baseUrl.getBaseUrlAuthenticate() + 'signup', body);
  }

}

