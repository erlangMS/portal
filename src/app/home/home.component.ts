import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
    selector: 'unb-projeto-inicial-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title:string = "portal de serviços";

  // construtor
  constructor( private router: Router) {

   }


}
