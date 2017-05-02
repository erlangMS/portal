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
        localStorage.setItem('externalFile',(result.protocol+'://'+window.location.hostname+':'+result.port+'/portal/config.json'));
        this.redirectService.initVerificationRedirect();
        return true;
      });
  }

  findTokenUser(client_id: string):boolean {
     this.redirectService.redirectWithCodeUrl(client_id);
     return true;
  }


}
