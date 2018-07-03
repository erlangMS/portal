import {  Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export class ServiceUtil {

  // extrai lista da resposta http
  public extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  // manipula erros da resposta http
  public handleError(error: Response | any):Observable<any> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.message || JSON.stringify(body);
      errMsg = err;

    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if(errMsg == "{\"isTrusted\":true}"){
      errMsg= "ERRO: Servidor de Dados Indisponível.";
    }else if(errMsg == "{\"error\":\"eunavailable_service\"}"){
      errMsg= "ERRO: Servidor de Dados Indisponível";
    }
    return Observable.throw(errMsg);
  }



}
