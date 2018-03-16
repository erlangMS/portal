import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class PagerService {
    private http;
    constructor(http: Http);
    getPager(totalItems: number, currentPage?: number, pageSize?: number): {
        totalItems: number;
        currentPage: number;
        pageSize: number;
        totalPages: number;
        startPage: number;
        endPage: number;
        startIndex: number;
        endIndex: number;
        pages: any[];
    };
    range(start: any, stop: any, step: any): any[];
    getUrl(url: any): Observable<boolean>;
}
