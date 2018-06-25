import { Component } from '@angular/core';
import { FileService } from './_file/file.service';

import { NavbarComponent } from "unb-menu-dinamico";
import {  EventEmitterService, AuthGuard } from 'ems-oauth2-client';
import { ServicoListaComponent } from './servico/servico-lista.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  intervalId:any = null;

  static route: Router;

  constructor (private fileService: FileService, private navBarComponent: NavbarComponent, public router: Router) {
            AppComponent.route = this.router;
  }

  public static getInstanceRouter(): Router{
    return AppComponent.route;
  }

  ngOnInit() {

    this.fileService.startRedirect()
      .subscribe(result => {

      },
      error =>{
         console.log(error);
    });

    if(localStorage.getItem('portal')){

        let json = JSON.parse(localStorage.getItem('portal'));
        let recurso:any = json.resource_owner;
        let listaPermissao:any = recurso.lista_permission;

        for(let i = 0; i < listaPermissao.length; i++){
          let url = listaPermissao[i].url.split('/')
          AppComponent.getInstanceRouter().config.push({path:url[1], component:ServicoListaComponent, canActivate: [AuthGuard],  
                                      data: { nome: listaPermissao[i].url }});
        }

    }

  }


  ngAfterContentInit(){

      if(EventEmitterService.contains('tokenPreenchido')){
          this.navBarComponent.carregarMenuDinamico(function(menu){
                  return true;
          })
      }

      EventEmitterService.get('tokenPreenchido').subscribe((preechido:any) => {
              this.navBarComponent.carregarMenuDinamico(function(menu){
                let json = JSON.parse(localStorage.getItem('portal'));
                let recurso:any = json.resource_owner;
                let listaPermissao:any = recurso.lista_permission;

                for(let i = 0; i < listaPermissao.length; i++){
                  let url = listaPermissao[i].url.split('/')
                  AppComponent.getInstanceRouter().config.push({path:url[1], component:ServicoListaComponent, canActivate: [AuthGuard],  
                                              data: { nome: listaPermissao[i].url }});
                }
                return true;
              });

          })        

  }


}
