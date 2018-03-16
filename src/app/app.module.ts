import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestOptions, ResponseOptions } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthenticationService, AuthGuard, RedirectService, DefaultHeaders } from 'seguranca';
import { NavigationComponent, DefaultResponse, LoggerService, CookieService, HttpService } from 'seguranca';
import { FileService } from './_file/file.service';

import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagerModule } from './paginator/pager.module';
import { NavbarComponent, NavbarService } from 'unb-menu-dinamico';
import 'hammerjs';
import { ServicoModule } from './servico/servicos.module';


@NgModule({
    imports: [
        BrowserModule, HttpModule, HomeModule, CommonModule, routing,
        FormsModule, ReactiveFormsModule, BrowserAnimationsModule, PagerModule, ServicoModule, 
    ],
    declarations: [AppComponent, NavbarComponent, NavigationComponent],
    providers: [
        FileService, AuthenticationService, AuthGuard, RedirectService, NavbarService, HttpService,
        LoggerService, CookieService, NavbarComponent,
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
