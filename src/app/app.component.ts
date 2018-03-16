import {Component, OnInit} from '@angular/core';
import {FileService} from './_file/file.service';
import './rxjs-operators';
import {NavbarComponent} from "unb-menu-dinamico";
import {AuthenticationService} from 'seguranca';

@Component ({
    selector: 'my-app',
    templateUrl: 'app.html'
})
export class AppComponent implements OnInit {

    intervalId:any = null;

    constructor (private fileService:FileService, private navBarComponent:NavbarComponent) {
    }

    ngOnInit () {
        let url = window.location.href;
        let array = url.split ('/');
        let nomeSistema = array[3].split('#');

        this.fileService.startRedirect ()
            .subscribe (resultado => {
                  let time = 5200;
                  let url = '';
                  this.intervalId = setInterval (() => {
                      if (localStorage.getItem(nomeSistema[0])) {
                         time = time - 10;
                         this.navBarComponent.carregarMenuDinamico(function(menu){
                            return true;
                          });
                          clearInterval (this.intervalId);
                      } else if(time < 0) {
                        clearInterval (this.intervalId);
                      }else {
                          time = time - 100;
                          if(AuthenticationService.currentUser.token && AuthenticationService.currentUser.user){
                            time = 100;
                          }

                          return time;
                      }
                  }, 10);

            });
    }
}
