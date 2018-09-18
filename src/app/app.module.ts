import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ZomatoComponent } from './zomato/zomato.component';
import { InterceptorModule } from './zomatoservice.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ZomatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
