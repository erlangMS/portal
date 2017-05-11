import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {RedirectService, DefaultHeaders} from 'seguranca';


@Injectable()
export class FileService {

  constructor( private http: Http, private redirectService: RedirectService){

  }

  startRedirect():Observable<boolean> {
    return this.http.get('/portal/config.json')
      .map((resultado) => {
        let result = resultado.json();
        let location  = window.location.href.split(':');
        let port = location[2].split('/')
        localStorage.setItem('externalFile',(window.location.protocol+'//'+window.location.hostname+':'+port[0]+'/portal/config.json'));
        this.redirectService.startInitVerifySessionToken();
        return true;
      });
  }

}
