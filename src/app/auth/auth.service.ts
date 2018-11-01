import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  private token: string;
  private username: string;

  constructor(private cookieService: CookieService) { }

  clear() {
    this.token = undefined;
    this.cookieService.delete( 'token', '/' );
  }

  getToken() {
    if (!this.token && this.cookieService.check('token')) {
      this.setToken(this.cookieService.get('token'));
    }
    return this.token;
  }

  getUsername() {
    return this.username;
  }

  jwtDecode(token) {
    return jwt_decode(token);
  }

  setToken(token) {
    this.token = token;
    const jwtDecode = this.jwtDecode(token);
    this.username = jwtDecode.name ? jwtDecode.name : jwtDecode.username;
    this.cookieService.set( 'token', token, undefined, '/' );
  }

}
