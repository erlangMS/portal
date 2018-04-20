import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { XSRFStrategy, RequestOptions, CookieXSRFStrategy, ResponseOptions, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app-routing.module';

import { FileService } from './_file/file.service';
import { HomeModule }  from './home/home.module';

import { LeftSidebarComponent } from './template/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './template/right-sidebar/right-sidebar.component';
import { TopbarComponent } from './template/topbar/topbar.component';

import { AuthenticationService, AuthGuard, RedirectService, LoggerService, CookieService, HttpService, DefaultHeaders, DefaultResponse, NavigationComponent } from 'seguranca';
import { NavbarService, NavbarComponent } from 'unb-menu-dinamico';
import { PagerModule } from './paginator/pager.module';
import { ServicoModule } from './servico/servico.module';

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
    BrowserAnimationsModule,
    BrowserModule,
    HomeModule,
    HttpModule,
    PagerModule,
    ServicoModule
  ],
  providers: [
    FileService,
    AuthenticationService,
    AuthGuard,
    RedirectService,
    NavbarService,
    NavbarComponent,
    LoggerService,
    CookieService,
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
