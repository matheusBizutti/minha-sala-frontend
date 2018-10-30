import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing';

@NgModule({
  imports: [
    SharedModule,
    LoginRouting
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule { }
