import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { Sobre } from '../controller/sobre.js';
import { Dashboard } from '../controller/dashboard.js';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, 
    HttpModule,
    JsonpModule 
  ],
  declarations: [ AppComponent, Dashboard, Sobre ],
  bootstrap: [ AppComponent, Dashboard ]
})
export class AppModule { }


