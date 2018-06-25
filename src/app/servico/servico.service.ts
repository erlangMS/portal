import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ServiceUtil } from '../util/service.util';
import { PagerComponent } from '../paginator/pager.component';
import { Observable } from 'rxjs/Observable';
import { Servico } from './servico';
import { HttpService } from 'ems-oauth2-client';

@Injectable()
export class ServicoService extends ServiceUtil {

    private url = '/catalog'

    constructor(private http: HttpService,  public pagerComponent: PagerComponent) {
      super();
    }

    paginar(filter: Servico): Observable<Servico[]>{

        let filterUrl = "{";
        let paginator:boolean = false;

        if(filter.name){
            filterUrl += "\"name\":\"" + filter.name + "\",";
            paginator = true;
        }

        if(filter.owner){
            filterUrl += "\"owner\":\""+filter.owner+"\",";
            paginator = true;
        }

        if(filter.url){
            filterUrl += "\"url\":\""+filter.url+"\",";
            paginator = true;
        }

        if(filter.type){
            filterUrl += "\"type\":\""+filter.type+"\",";
            paginator = true;
        }

        if(filter.service){
            filterUrl += "\"service\":\""+filter.service+"\",";
            paginator = true;
        }

        if(filter.lang){
            filterUrl += "\"lang\":\""+filter.lang+"\",";
            paginator = true;
        }

        if(filter.rowid){
            filterUrl += "\"rowid\":"+filter.rowid+",";
            paginator = true;
        }

        if(paginator){
            filterUrl = filterUrl.slice(0,-1)
        }

        filterUrl += "}"

        let pageUrl = this.pagerComponent.formatarUrl(this.url, filterUrl, 1000, 1);

        return this.http.get(pageUrl).map(response => {
            this.pagerComponent.allItems = response;
            return <Servico[]> response;
        }).catch(this.handleError)
        .publishReplay(1)
        .refCount();

    }

    getServicosServidor(url:string):Observable<Servico[]> {
        let arrayUrl:any = url.split('/');
        let servidor: any = arrayUrl[5];

        return this.http.get(url+'?filter=\"{\"owner\":\"'+servidor+'\"}\"')
        .map(response =>{
            return <Servico[]> response;
        }).catch(this.handleError)
        .publishReplay(1)
        .refCount();
    }

    getServico(rowid: number): Observable<Servico> {
      let filter : Servico;
      filter = new Servico;
      filter.rowid = rowid;
      return this.paginar(filter).map((response) => {
          return response[0]
      }).catch(this.handleError);
    }

    executar(url : string) : Observable<any> {
      return this.http.get(url).catch(this.handleError);
    }

}
