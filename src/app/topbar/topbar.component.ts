import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'seguranca';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {

  title:string = "portal de serviços";

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
