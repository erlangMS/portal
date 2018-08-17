import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'ems-oauth2-client';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})

export class TopbarComponent implements OnInit {

  title:string = "Portal de monitoramento de serviços";

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
  }

}
