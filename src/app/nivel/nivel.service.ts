import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { ServiceUtil }      from '../util/service.util';
import { Nivel } from './nivel';
import { PagerComponent }   from '../paginator/pager.component';
import { Observable }       from 'rxjs/Observable';


@Injectable()
export class NivelService extends ServiceUtil {
    
    private url = '/administrativo/sitab/nivelAcademico'
    constructor(private http: Http,  private pagerComponent: PagerComponent){ super(); }

    listar(): Observable<Nivel[]>{
        return this.http.get(this.url)
        .map(
            response => {
                return<Nivel[]> response.json();
            }
        )
        .catch(this.handleError)
        .publishReplay(1)
        .refCount();
    }
}