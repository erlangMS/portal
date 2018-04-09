import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
    selector: 'unb-projeto-inicial-home',
    templateUrl: './home.html'
})
export class HomeComponent {

  title:string = "UNB-APP";

  // construtor
  constructor( private router: Router) {

   }


}
