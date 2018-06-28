import { Injectable } from '@angular/core';
import { ServiceUtil } from '../util/service.util';
import { PagerComponent } from '../paginator/pager.component';
import { Observable } from 'rxjs/Observable';
import { Servico } from './servico';
import { HttpService, AuthInterceptor } from 'ems-oauth2-client';

@Injectable()
export class ServicoService extends ServiceUtil {

    private url = '/catalog'

    private response_type:string[] = ['json','text'];

    public isJson:boolean = false;

    constructor(private http: HttpService,  public pagerComponent: PagerComponent ) {
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

    executar(url : string, service: Servico) : Observable<any> {
        let tipoRetorno:string = '';
        AuthInterceptor.keyHeader = 'content-type';
        AuthInterceptor.valueHeader = service.content_type;
        if(service.content_type == 'text/plain'){
            tipoRetorno = 'text';
            this.isJson = false;
        } else {
            tipoRetorno = 'json';
            this.isJson = true;
        }

      let urlTemp = url.split(':');
      let urlTotal = '';
      if(urlTemp.length == 1){
        urlTotal = urlTemp[0];
      } else {
          urlTotal = urlTemp[0]+'648';
      }
      return this.http.get(urlTotal,tipoRetorno)
      .map(response => {
        AuthInterceptor.keyHeader = '';
        AuthInterceptor.valueHeader = '';
          return response;
      })
      .catch(this.handleError);
    }

}
