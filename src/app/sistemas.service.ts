import { Injectable } from '@angular/core';
import { HttpService } from 'seguranca';
import { ServiceUtil } from './util/service.util';
import { PagerComponent } from './paginator/pager.component';

@Injectable()
export class SistemasService extends ServiceUtil {

  private url = '/acesso/sistemas';
  constructor(private http: HttpService, public pagerComponent: PagerComponent) { super(); }

  findByIdList(ids: number []){
    return this.http.get(this.url + '?filter={id__in:' + JSON.stringify(ids) + '}').map(
      res => {
        return <any[]> res.json();
      }
    )
  }
}
