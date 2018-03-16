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
       return this.http.get('/portal/barramento')

         .map((resultado) => {
             this.redirectService.startRedirectFromBarramento();
             return true;
         });
     }

}
