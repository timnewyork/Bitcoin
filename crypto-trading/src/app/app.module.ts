import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GdaxClientService} from '../service/gdax-client.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GdaxClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
