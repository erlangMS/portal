import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {RedirectService, DefaultHeaders} from 'seguranca';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FileService extends DefaultHeaders {

  constructor( private http: Http, private redirectService: RedirectService){
    super();
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
