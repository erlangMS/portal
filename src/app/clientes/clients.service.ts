import { Injectable } from '@angular/core';
import { HttpService } from 'ems-oauth2-client';
import { Client } from './client';
import { PagerComponent } from '../paginator/pager.component';
import { ServiceUtil } from '../util/service.util';



@Injectable()
export class ClientsService extends ServiceUtil {

  private url = '/auth/client';
  constructor(private http: HttpService, public pagerComponent: PagerComponent) { super(); }

  findAllActive(){
    return this.http.get(this.url).map(
      res => {
        return <Client[]> res;
      }
    ).publishReplay(1)
    .refCount();
  }

}
