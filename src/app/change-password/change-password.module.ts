import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRouting } from './change-password.routing';
import { ChangePasswordService } from './change-password.service';

@NgModule({
  imports: [
    SharedModule,
    ChangePasswordRouting
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [ChangePasswordService],
  bootstrap: []
})
export class ChangePasswordModule { }
