import { Injectable } from '@angular/core';

// import { AuthService } from './auth.service';

@Injectable()
export class BaseUrl {

  private url = 'http://localhost:3000/api/';

  constructor() { }

  getBaseUrl() {
    return this.url;
  }

  getBaseUrlAuthenticate() {
    return 'http://localhost:3000/authenticate/';
  }

}
