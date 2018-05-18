import { Injectable } from '@angular/core';
import { HttpService } from 'ems-oauth2-client';
import { Sistema } from './sistema';
import { PagerComponent } from '../paginator/pager.component';
import { ServiceUtil } from '../util/service.util';

@Injectable()
export class SistemasService extends ServiceUtil {

  private url = '/acesso/sistemas';
  constructor(private http: HttpService, public pagerComponent: PagerComponent) { super(); }

  findByIdList(ids: number []){
    return this.http.get(this.url + '?filter={id__in:' + JSON.stringify(ids) + '}').map(
      res => {
        return <Sistema[]> res;
      }
    )
  }
}
