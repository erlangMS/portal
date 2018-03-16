import { Injectable }       from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { ServiceUtil }      from '../util/service.util';
import { Observable }       from 'rxjs/Observable';
import { Template }         from './template';

@Injectable()
export class TemplateService extends ServiceUtil {
    
    constructor(private http: Http) { super(); }
    
    private baseUrl = 'https://assinarcert.unb.br/c3web-unb/'
    private url = 'api/active-templates'

    //O endpoint da 
    listar(): Observable<Template> {
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