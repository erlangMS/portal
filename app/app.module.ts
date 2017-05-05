import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavigatorController, PagerService, EmsRestClient, Sobre, DataTableFilterPipe } from './dashboard/main';
import { CustomModal } from './catalogo/exemplos_url_servico.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService, AuthGuard, ErroComponent, NavigationComponent, RedirectService, DefaultHeaders } from 'seguranca';
import { routing, appRoutingProviders } from "./app.routing";
import { FileService } from './_file/file.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
  routing],
  declarations: [ AppComponent, NavigatorController, Sobre, CatalogoComponent, LoginComponent, NavigationComponent, CustomModal, DataTableFilterPipe ],
  bootstrap: [ AppComponent, NavigatorController ],
  providers: [ appRoutingProviders, PagerService, EmsRestClient, AuthGuard, RedirectService, AuthenticationService, FileService,
    {
      provide: RequestOptions,
      useClass: DefaultHeaders
    }
  ],

  // IMPORTANT:
  // Since 'AdditionCalculateWindow' is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [ CustomModal ]
})
export class AppModule { }
