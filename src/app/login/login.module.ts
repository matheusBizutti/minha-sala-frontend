import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    SharedModule,
    LoginRouting
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
  bootstrap: []
})
export class LoginModule { }
