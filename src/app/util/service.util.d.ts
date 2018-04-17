import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export declare class ServiceUtil {
    extractData(res: Response): any;
    handleError(error: Response | any): Observable<any>;
}
