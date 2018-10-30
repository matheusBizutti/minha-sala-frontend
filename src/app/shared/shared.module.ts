import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// import { CookieService } from 'ngx-cookie-service';

import { ThfModule } from '@totvs/thf-ui';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    ThfModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    ThfModule
  ],
  providers: []
})
export class SharedModule { }
