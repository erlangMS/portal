import { Http }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable }       from '@angular/core';

@Injectable()
export class PagerService {

    constructor(private http:Http){

    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number) {
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = this.range(startPage, endPage + 1,1);


        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    range(start: any, stop: any, step: any) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    getUrl(url:any):Observable<boolean> {
        return this.http.get (url)
        .map(response => {
            if(response.json().length != 0) {
                return true;
            } else {
                return false;
            }
        })
    }
}
