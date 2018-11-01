import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { SignupComponent } from './signup.component';
import { SignupRouting } from './signup.routing';
import { SignupService } from './signup.service';

@NgModule({
  imports: [
    SharedModule,
    SignupRouting
  ],
  declarations: [
    SignupComponent
  ],
  providers: [SignupService],
  bootstrap: []
})
export class SignupModule { }
