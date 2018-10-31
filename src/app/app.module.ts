import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard/auth-guard.service';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { BaseUrl } from './baseurl/baseurl.service';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [AuthGuard, AuthService, BaseUrl, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
