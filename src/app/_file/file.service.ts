import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {RedirectService} from 'ems-oauth2-client';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NavbarComponent } from 'unb-menu-dinamico';


@Injectable()
export class FileService  {

  constructor(public http: Http, private redirectService: RedirectService, public navBarComponent:NavbarComponent){

  }

  startRedirect():Observable<boolean> {
       return this.http.get('/portal/barramento')
         .map((resultado) => {
            let dados = resultado.json();
            this.redirectService.startRedirectFromBarramento(dados.base_url)
            .subscribe (resultado => {
                this.navBarComponent.carregarMenuDinamico(function(menu){
                   return true;
                });
             });
             return true;
         });


     }

}
