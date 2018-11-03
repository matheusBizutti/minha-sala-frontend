import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SignupService } from './signup.service';
import { SignupComponent } from './signup.component';
import { SignupRouting } from './signup.routing';


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
