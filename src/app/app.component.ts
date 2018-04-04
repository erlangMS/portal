import {Component, ViewChild, AfterViewInit } from '@angular/core';
import {FileService} from './_file/file.service';

import {NavbarComponent} from "unb-menu-dinamico";
import {RedirectService, EventEmitterService} from 'seguranca';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title:string = "UnbApp";

  intervalId:any = null;

  constructor (private fileService: FileService, private navBarComponent: NavbarComponent) {
  }

  ngOnInit() {
  //ngOnInit () {
    this.fileService.startRedirect()
      .subscribe(result => {

      },
      error =>{
         console.log(error);
    }); 

  }


  ngAfterContentInit(){

      if(EventEmitterService.contains('tokenPreenchido')){
          this.navBarComponent.carregarMenuDinamico(function(menu){
                  return true;
          })
      }

      EventEmitterService.get('tokenPreenchido').subscribe((preechido:any) => {
              this.navBarComponent.carregarMenuDinamico(function(menu){
                  return true;
              });
          })

  }
}
