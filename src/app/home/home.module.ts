import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting
  ],
  declarations: [
   HomeComponent
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
