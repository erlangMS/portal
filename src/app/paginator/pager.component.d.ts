import { Http } from '@angular/http';
import { PagerService } from './pager.service';
export declare class PagerComponent {
    private http;
    private pagerService;
    static allItems: any[];
    pager: any;
    pagedItems: any[];
    url: any;
    private catalogoUrl;
    private limit;
    private offset;
    private filter;
    private updatePaginator;
    constructor(http: Http, pagerService: PagerService);
    ngOnInit(): void;
    formatarUrl(catalogoUrl: string, filter: string, limit: number, offset: number): any;
    setPage(page: number): void;
}
