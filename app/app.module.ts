import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NavigatorController } from 'modules/dashboard/controller/navigator_controller.js'

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent, NavigatorController ],
  bootstrap: [ AppComponent, NavigatorController ]
})
export class AppModule { }
