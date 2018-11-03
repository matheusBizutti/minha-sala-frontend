import { Injectable } from '@angular/core';

// import { AuthService } from './auth.service';

@Injectable()
export class BaseUrl {

  private url = 'http://40.121.33.135:3000/api/';

  constructor() { }

  getBaseUrl() {
    return this.url;
  }

  getBaseUrlAuthenticate() {
    return 'http://40.121.33.135:3000/authenticate/';
  }

}
