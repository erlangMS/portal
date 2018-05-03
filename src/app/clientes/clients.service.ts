import { Injectable } from '@angular/core';
import { HttpService } from 'seguranca';
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
        return <Client[]> res.json();
      }
    ).publishReplay(1)
    .refCount();
  }

}
