import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseUrl } from '../baseurl/baseurl.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChangePasswordService {

  constructor(private http: HttpClient, private baseUrl: BaseUrl) { }

  changePassword(body = {}, username = ''): Observable<any> {
    return this.http.put(this.baseUrl.getBaseUrlAuthenticate() + `${username}` + '/change-password',  body);
  }

}

