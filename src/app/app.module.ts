import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FileService } from './_file/file.service';
import { AuthenticationService, AuthGuard, RedirectService, LoggerService, CookieService, HttpService, DefaultHeaders, DefaultResponse, NavigationComponent } from 'seguranca';
import { NavbarService, NavbarComponent } from 'unb-menu-dinamico';
import { XSRFStrategy, RequestOptions, CookieXSRFStrategy, ResponseOptions, HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    TopbarComponent,
    NavbarComponent, 
    NavigationComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule
  ],
  providers:    [ FileService, AuthenticationService, AuthGuard, RedirectService, NavbarService, NavbarComponent, LoggerService, CookieService,
    HttpService,
          {
            provide: XSRFStrategy,
            useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRF-Token')
          },
          {
            provide: RequestOptions,
            useClass: DefaultHeaders
          },
          {
              provide: ResponseOptions,
              useClass: DefaultResponse
          },
          {
              provide: LocationStrategy,
              useClass: HashLocationStrategy
          }
   ],
  bootstrap: [AppComponent]
})

export class AppModule { }
