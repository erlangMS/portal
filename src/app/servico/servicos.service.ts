import { Injectable }       from '@angular/core';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { ServiceUtil }      from '../util/service.util';
import { PagerComponent }   from '../paginator/pager.component';
import { Observable }       from 'rxjs/Observable';
import { Servico } from './servicos';
import { HttpService } from 'seguranca';


@Injectable()
export class ServicosService extends ServiceUtil {
    private url = '/catalog'
    constructor(private http: HttpService,  public pagerComponent: PagerComponent) { super(); }

    paginar(filter: Servico): Observable<Servico[]>{
        let filterUrl = "{";
        let paginator:boolean = false;
        
        if(filter.name){
            filterUrl += "name:\"" + filter.name + "\",";
            paginator = true;
        }

        if(filter.owner){
            filterUrl += "owner:\""+filter.owner+"\",";
            paginator = true;
        }
        
        if(filter.url){
            filterUrl += "url:\""+filter.url+"\",";
            paginator = true;
        }

        if(filter.type){
            filterUrl += "type:\""+filter.type+"\",";
            paginator = true;
        }

        if(filter.service){
            filterUrl += "service:\""+filter.service+"\",";
            paginator = true;
        }

        if(filter.lang){
            filterUrl += "lang:\""+filter.lang+"\",";
            paginator = true;
        }

        if(paginator){
            filterUrl = filterUrl.slice(0,-1)
        }

        filterUrl += "}"

        let pageUrl; 
        if(paginator){
           pageUrl = this.pagerComponent.formatarUrl(this.url, filterUrl, 1000, 0);
        } else {
            pageUrl = this.url;
        }

        return this.http.get(pageUrl).map(response => {
            this.pagerComponent.allItems = response.json();
            return <Servico[]> response.json();
        }).catch(this.handleError)
        .publishReplay(1)
        .refCount();
    }


}