import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavigatorController } from '../modules/dashboard/controller/navigator_controller.js'
import { Sobre } from '../modules/dashboard/controller/sobre.js'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // if used
    HttpModule,
    JsonpModule // if used
  ],
  declarations: [ AppComponent, NavigatorController, Sobre ],
  bootstrap: [ AppComponent, NavigatorController ]
})
export class AppModule { }
