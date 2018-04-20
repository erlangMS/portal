import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { ServiceUtil }      from '../util/service.util';
import { Observable }       from 'rxjs/Observable';
import { SignRoles } from './signRoles';

@Injectable()
export class SignRolesService extends ServiceUtil {
    
    constructor(private http: Http) { super(); }
    
    private baseUrl = 'https://assinarcert.unb.br/c3web-unb/'
    private url = 'api/active-sign-roles'

    //O endpoint da 
    listar(): Observable<SignRoles> {
        return this.http
        .post(this.baseUrl+this.url, '3803819525f7dab56c3d3ad5746dac58')
        .map(
            response => {
                return response.json();
            }
        )
        .publishReplay(1)
        .refCount();
    }
}