import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CatpchaComponent } from './captcha.component';

@NgModule({
  declarations: [
    CatpchaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [CatpchaComponent]
})
export class CaptchaModule { }
