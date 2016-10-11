import { NgModule }      from '@angular/core';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'my-app',
    templateUrl: 'web/simar.html'
})
export class SimarComponent { }

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ SimarComponent ],
  bootstrap: [ SimarComponent ]
})
export class SimarModule { }

platformBrowserDynamic().bootstrapModule(SimarModule);

